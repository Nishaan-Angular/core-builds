/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NodeType, asElementData } from './types';
import { RenderNodeAction, visitProjectedRenderNodes } from './util';
/**
 * @param {?} ngContentIndex
 * @param {?} index
 * @return {?}
 */
export function ngContentDef(ngContentIndex, index) {
    return {
        type: NodeType.NgContent,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        childFlags: undefined,
        childMatchedQueries: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags: 0,
        matchedQueries: {}, ngContentIndex,
        childCount: 0,
        bindings: [],
        disposableCount: 0,
        element: undefined,
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: { index }
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
export function appendNgContent(view, renderHost, def) {
    if (def.ngContentIndex != null) {
        // Do nothing if we are reprojected!
        return;
    }
    const /** @type {?} */ parentEl = def.parent != null ? asElementData(view, def.parent).renderElement : renderHost;
    if (!parentEl) {
        // Nothing to do if there is no parent element.
        return;
    }
    const /** @type {?} */ ngContentIndex = def.ngContent.index;
    visitProjectedRenderNodes(view, ngContentIndex, RenderNodeAction.AppendChild, parentEl, undefined, undefined);
}
//# sourceMappingURL=ng_content.js.map