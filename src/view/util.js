/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isDevMode } from '../application_ref';
import { WrappedValue, devModeEqual } from '../change_detection/change_detection';
import { looseIdentical } from '../facade/lang';
import { expressionChangedAfterItHasBeenCheckedError, isViewDebugError, viewDestroyedError, viewWrappedDebugError } from './errors';
import { NodeFlags, NodeType, Refs, ViewFlags, ViewState, asElementData, asProviderData, asTextData } from './types';
/**
 * @param {?} renderer
 * @param {?} renderNode
 * @param {?} propName
 * @param {?} value
 * @return {?}
 */
export function setBindingDebugInfo(renderer, renderNode, propName, value) {
    try {
        renderer.setBindingDebugInfo(renderNode, `ng-reflect-${camelCaseToDashCase(propName)}`, value ? value.toString() : null);
    }
    catch (e) {
        renderer.setBindingDebugInfo(renderNode, `ng-reflect-${camelCaseToDashCase(propName)}`, '[ERROR] Exception while trying to serialize the value');
    }
}
const /** @type {?} */ CAMEL_CASE_REGEXP = /([A-Z])/g;
/**
 * @param {?} input
 * @return {?}
 */
function camelCaseToDashCase(input) {
    return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
export function checkBindingNoChanges(view, def, bindingIdx, value) {
    const /** @type {?} */ oldValue = view.oldValues[def.bindingIndex + bindingIdx];
    if ((view.state & ViewState.FirstCheck) || !devModeEqual(oldValue, value)) {
        throw expressionChangedAfterItHasBeenCheckedError(Refs.createDebugContext(view, def.index), oldValue, value, (view.state & ViewState.FirstCheck) !== 0);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
export function checkAndUpdateBinding(view, def, bindingIdx, value) {
    const /** @type {?} */ oldValues = view.oldValues;
    if ((view.state & ViewState.FirstCheck) ||
        !looseIdentical(oldValues[def.bindingIndex + bindingIdx], value)) {
        oldValues[def.bindingIndex + bindingIdx] = value;
        if (def.flags & NodeFlags.HasComponent) {
            const /** @type {?} */ compView = asProviderData(view, def.index).componentView;
            if (compView.def.flags & ViewFlags.OnPush) {
                compView.state |= ViewState.ChecksEnabled;
            }
        }
        return true;
    }
    return false;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} eventName
 * @param {?} event
 * @return {?}
 */
export function dispatchEvent(view, nodeIndex, eventName, event) {
    setCurrentNode(view, nodeIndex);
    let /** @type {?} */ currView = view;
    while (currView) {
        if (currView.def.flags & ViewFlags.OnPush) {
            currView.state |= ViewState.ChecksEnabled;
        }
        currView = currView.parent;
    }
    return view.def.handleEvent(view, nodeIndex, eventName, event);
}
/**
 * @param {?} value
 * @return {?}
 */
export function unwrapValue(value) {
    if (value instanceof WrappedValue) {
        value = value.wrapped;
    }
    return value;
}
/**
 * @param {?} view
 * @return {?}
 */
export function declaredViewContainer(view) {
    if (view.parent) {
        const /** @type {?} */ parentView = view.parent;
        return asElementData(parentView, view.parentIndex);
    }
    return undefined;
}
/**
 * for component views, this is the same as parentIndex.
 * for embedded views, this is the index of the parent node
 * that contains the view container.
 * @param {?} view
 * @return {?}
 */
export function parentDiIndex(view) {
    if (view.parent) {
        const /** @type {?} */ parentNodeDef = view.def.nodes[view.parentIndex];
        return parentNodeDef.element && parentNodeDef.element.template ? parentNodeDef.parent :
            parentNodeDef.index;
    }
    return view.parentIndex;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @return {?}
 */
export function findElementDef(view, nodeIndex) {
    const /** @type {?} */ viewDef = view.def;
    let /** @type {?} */ nodeDef = viewDef.nodes[nodeIndex];
    while (nodeDef) {
        if (nodeDef.type === NodeType.Element) {
            return nodeDef;
        }
        nodeDef = nodeDef.parent != null ? viewDef.nodes[nodeDef.parent] : undefined;
    }
    return undefined;
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function renderNode(view, def) {
    switch (def.type) {
        case NodeType.Element:
            return asElementData(view, def.index).renderElement;
        case NodeType.Text:
            return asTextData(view, def.index).renderText;
    }
}
/**
 * @param {?} view
 * @return {?}
 */
export function isComponentView(view) {
    return view.component === view.context && !!view.parent;
}
const /** @type {?} */ VIEW_DEFINITION_CACHE = new WeakMap();
/**
 * @param {?} factory
 * @return {?}
 */
export function resolveViewDefinition(factory) {
    let /** @type {?} */ value = VIEW_DEFINITION_CACHE.get(factory);
    if (!value) {
        value = factory();
        VIEW_DEFINITION_CACHE.set(factory, value);
    }
    return value;
}
/**
 * @param {?} start
 * @param {?} end
 * @return {?}
 */
export function sliceErrorStack(start, end) {
    let /** @type {?} */ err;
    try {
        throw new Error();
    }
    catch (e) {
        err = e;
    }
    const /** @type {?} */ stack = err.stack || '';
    const /** @type {?} */ lines = stack.split('\n');
    if (lines[0].startsWith('Error')) {
        // Chrome always adds the message to the stack as well...
        start++;
        end++;
    }
    return lines.slice(start, end).join('\n');
}
let /** @type {?} */ _currentAction;
let /** @type {?} */ _currentView;
let /** @type {?} */ _currentNodeIndex;
/**
 * @return {?}
 */
export function currentView() {
    return _currentView;
}
/**
 * @return {?}
 */
export function currentNodeIndex() {
    return _currentNodeIndex;
}
/**
 * @return {?}
 */
export function currentAction() {
    return _currentAction;
}
/**
 * Set the node that is currently worked on.
 * It needs to be called whenever we call user code,
 * or code of the framework that might throw as a valid use case.
 * @param {?} view
 * @param {?} nodeIndex
 * @return {?}
 */
export function setCurrentNode(view, nodeIndex) {
    if (view.state & ViewState.Destroyed) {
        throw viewDestroyedError(_currentAction);
    }
    _currentView = view;
    _currentNodeIndex = nodeIndex;
}
/**
 * Adds a try/catch handler around the given function to wrap all
 * errors that occur into new errors that contain the current debug info
 * set via setCurrentNode.
 * @param {?} action
 * @param {?} fn
 * @return {?}
 */
export function entryAction(action, fn) {
    return (function (arg) {
        const /** @type {?} */ oldAction = _currentAction;
        const /** @type {?} */ oldView = _currentView;
        const /** @type {?} */ oldNodeIndex = _currentNodeIndex;
        _currentAction = action;
        // Note: We can't call `isDevMode()` outside of this closure as
        // it might not have been initialized.
        const /** @type {?} */ result = isDevMode() ? callWithTryCatch(fn, arg) : fn(arg);
        _currentAction = oldAction;
        _currentView = oldView;
        _currentNodeIndex = oldNodeIndex;
        return result;
    });
}
/**
 * @param {?} fn
 * @param {?} arg
 * @return {?}
 */
function callWithTryCatch(fn, arg) {
    try {
        return fn(arg);
    }
    catch (e) {
        if (isViewDebugError(e) || !_currentView) {
            throw e;
        }
        const /** @type {?} */ debugContext = Refs.createDebugContext(_currentView, _currentNodeIndex);
        throw viewWrappedDebugError(e, debugContext);
    }
}
/**
 * @param {?} view
 * @return {?}
 */
export function rootRenderNodes(view) {
    const /** @type {?} */ renderNodes = [];
    visitRootRenderNodes(view, RenderNodeAction.Collect, undefined, undefined, renderNodes);
    return renderNodes;
}
export let RenderNodeAction = {};
RenderNodeAction.Collect = 0;
RenderNodeAction.AppendChild = 1;
RenderNodeAction.InsertBefore = 2;
RenderNodeAction.RemoveChild = 3;
RenderNodeAction[RenderNodeAction.Collect] = "Collect";
RenderNodeAction[RenderNodeAction.AppendChild] = "AppendChild";
RenderNodeAction[RenderNodeAction.InsertBefore] = "InsertBefore";
RenderNodeAction[RenderNodeAction.RemoveChild] = "RemoveChild";
/**
 * @param {?} view
 * @param {?} action
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
export function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
    const /** @type {?} */ len = view.def.nodes.length;
    for (let /** @type {?} */ i = 0; i < len; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target);
        // jump to next sibling
        i += nodeDef.childCount;
    }
}
/**
 * @param {?} view
 * @param {?} ngContentIndex
 * @param {?} action
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
export function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
    let /** @type {?} */ compView = view;
    while (compView && !isComponentView(compView)) {
        compView = compView.parent;
    }
    const /** @type {?} */ hostView = compView.parent;
    const /** @type {?} */ hostElDef = hostView.def.nodes[compView.parentIndex];
    const /** @type {?} */ startIndex = hostElDef.index + 1;
    const /** @type {?} */ endIndex = hostElDef.index + hostElDef.childCount;
    for (let /** @type {?} */ i = startIndex; i <= endIndex; i++) {
        const /** @type {?} */ nodeDef = hostView.def.nodes[i];
        if (nodeDef.ngContentIndex === ngContentIndex) {
            visitRenderNode(hostView, nodeDef, action, parentNode, nextSibling, target);
        }
        // jump to next sibling
        i += nodeDef.childCount;
    }
    if (!hostView.parent) {
        // a root view
        const /** @type {?} */ projectedNodes = view.root.projectableNodes[ngContentIndex];
        if (projectedNodes) {
            for (let /** @type {?} */ i = 0; i < projectedNodes.length; i++) {
                execRenderNodeAction(projectedNodes[i], action, parentNode, nextSibling, target);
            }
        }
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} action
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
function visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target) {
    if (nodeDef.type === NodeType.NgContent) {
        visitProjectedRenderNodes(view, nodeDef.ngContent.index, action, parentNode, nextSibling, target);
    }
    else {
        const /** @type {?} */ rn = renderNode(view, nodeDef);
        execRenderNodeAction(rn, action, parentNode, nextSibling, target);
        if (nodeDef.flags & NodeFlags.HasEmbeddedViews) {
            const /** @type {?} */ embeddedViews = asElementData(view, nodeDef.index).embeddedViews;
            if (embeddedViews) {
                for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                    visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
                }
            }
        }
    }
}
/**
 * @param {?} renderNode
 * @param {?} action
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
function execRenderNodeAction(renderNode, action, parentNode, nextSibling, target) {
    switch (action) {
        case RenderNodeAction.AppendChild:
            parentNode.appendChild(renderNode);
            break;
        case RenderNodeAction.InsertBefore:
            parentNode.insertBefore(renderNode, nextSibling);
            break;
        case RenderNodeAction.RemoveChild:
            parentNode.removeChild(renderNode);
            break;
        case RenderNodeAction.Collect:
            target.push(renderNode);
            break;
    }
}
//# sourceMappingURL=util.js.map