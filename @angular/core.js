/**
 * @license Angular v4.0.0-beta.8-fcc1d17
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { share } from 'rxjs/operator/share';
import { $$observable } from 'rxjs/symbol/observable';
import { Subject } from 'rxjs/Subject';

/**
 * Creates a token that can be used in a DI Provider.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("value");
 *
 * var injector = Injector.resolveAndCreate([
 *   {provide: t, useValue: "bindingValue"}
 * ]);
 *
 * expect(injector.get(t)).toEqual("bindingValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple providers using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 * @deprecated since v4.0.0 because it does not support type information, use `InjectionToken<?>`
 * instead.
 */
class OpaqueToken {
    /**
     * @param {?} _desc
     */
    constructor(_desc) {
        this._desc = _desc;
    }
    /**
     * @return {?}
     */
    toString() { return `Token ${this._desc}`; }
}
/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parametrized type.
 *
 * `InjectionToken` is parametrize on `T` which is the type of object which will be returned by the
 * `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * \@stable
 */
class InjectionToken extends OpaqueToken {
    /**
     * @param {?} desc
     */
    constructor(desc) { super(desc); }
    /**
     * @return {?}
     */
    toString() { return `InjectionToken ${this._desc}`; }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let /** @type {?} */ globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = (self);
    }
    else {
        globalScope = (global);
    }
}
else {
    globalScope = (window);
}
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
const /** @type {?} */ global$1 = globalScope;
/**
 * @param {?} type
 * @return {?}
 */
function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
global$1.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
/**
 * @param {?} obj
 * @return {?}
 */
function isPresent(obj) {
    return obj != null;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj == null;
}
/**
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    const /** @type {?} */ res = token.toString();
    const /** @type {?} */ newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @param {?} o
 * @return {?}
 */
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * @param {?} obj
 * @return {?}
 */
function print(obj) {
    // tslint:disable-next-line:no-console
    console.log(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function warn(obj) {
    console.warn(obj);
}
let /** @type {?} */ _symbolIterator = null;
/**
 * @return {?}
 */
function getSymbolIterator() {
    if (!_symbolIterator) {
        if (((globalScope)).Symbol && Symbol.iterator) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            const /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
                const /** @type {?} */ key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    ((Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPrimitive(obj) {
    return !isJsObject(obj);
}

let /** @type {?} */ _nextClassId = 0;
const /** @type {?} */ Reflect = global$1.Reflect;
/**
 * @param {?} annotation
 * @return {?}
 */
function extractAnnotation(annotation) {
    if (typeof annotation === 'function' && annotation.hasOwnProperty('annotation')) {
        // it is a decorator, extract annotation
        annotation = annotation.annotation;
    }
    return annotation;
}
/**
 * @param {?} fnOrArray
 * @param {?} key
 * @return {?}
 */
function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
        fnOrArray === Number || fnOrArray === Array) {
        throw new Error(`Can not use native ${stringify(fnOrArray)} as constructor`);
    }
    if (typeof fnOrArray === 'function') {
        return fnOrArray;
    }
    if (Array.isArray(fnOrArray)) {
        const /** @type {?} */ annotations = fnOrArray;
        const /** @type {?} */ annoLength = annotations.length - 1;
        const /** @type {?} */ fn = fnOrArray[annoLength];
        if (typeof fn !== 'function') {
            throw new Error(`Last position of Class method array must be Function in key ${key} was '${stringify(fn)}'`);
        }
        if (annoLength != fn.length) {
            throw new Error(`Number of annotations (${annoLength}) does not match number of arguments (${fn.length}) in the function: ${stringify(fn)}`);
        }
        const /** @type {?} */ paramsAnnotations = [];
        for (let /** @type {?} */ i = 0, /** @type {?} */ ii = annotations.length - 1; i < ii; i++) {
            const /** @type {?} */ paramAnnotations = [];
            paramsAnnotations.push(paramAnnotations);
            const /** @type {?} */ annotation = annotations[i];
            if (Array.isArray(annotation)) {
                for (let /** @type {?} */ j = 0; j < annotation.length; j++) {
                    paramAnnotations.push(extractAnnotation(annotation[j]));
                }
            }
            else if (typeof annotation === 'function') {
                paramAnnotations.push(extractAnnotation(annotation));
            }
            else {
                paramAnnotations.push(annotation);
            }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
    }
    throw new Error(`Only Function or Array is supported in Class definition for key '${key}' is '${stringify(fnOrArray)}'`);
}
/**
 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
 *
 * ## Basic Example
 *
 * ```
 * var Greeter = ng.Class({
 *   constructor: function(name) {
 *     this.name = name;
 *   },
 *
 *   greet: function() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class Greeter {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   greet() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * }
 * ```
 *
 * or equivalent to ES5:
 *
 * ```
 * var Greeter = function (name) {
 *   this.name = name;
 * }
 *
 * Greeter.prototype.greet = function () {
 *   alert('Hello ' + this.name + '!');
 * }
 * ```
 *
 * ### Example with parameter annotations
 *
 * ```
 * var MyService = ng.Class({
 *   constructor: [String, [new Optional(), Service], function(name, myService) {
 *     ...
 *   }]
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class MyService {
 *   constructor(name: string, \@Optional() myService: Service) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example with inheritance
 *
 * ```
 * var Shape = ng.Class({
 *   constructor: (color) {
 *     this.color = color;
 *   }
 * });
 *
 * var Square = ng.Class({
 *   extends: Shape,
 *   constructor: function(color, size) {
 *     Shape.call(this, color);
 *     this.size = size;
 *   }
 * });
 * ```
 * @suppress {globalThis}
 * \@stable
 * @param {?} clsDef
 * @return {?}
 */
function Class(clsDef) {
    const /** @type {?} */ constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    let /** @type {?} */ proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
        if (typeof clsDef.extends === 'function') {
            ((constructor)).prototype = proto =
                Object.create(((clsDef.extends)).prototype);
        }
        else {
            throw new Error(`Class definition 'extends' property must be a constructor function was: ${stringify(clsDef.extends)}`);
        }
    }
    for (const /** @type {?} */ key in clsDef) {
        if (key !== 'extends' && key !== 'prototype' && clsDef.hasOwnProperty(key)) {
            proto[key] = applyParams(clsDef[key], key);
        }
    }
    if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    const /** @type {?} */ constructorName = constructor['name'];
    if (!constructorName || constructorName === 'constructor') {
        ((constructor))['overriddenName'] = `class${_nextClassId++}`;
    }
    return (constructor);
}
/**
 * @suppress {globalThis}
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @param {?=} chainFn
 * @return {?}
 */
function makeDecorator(name, props, parentClass, chainFn = null) {
    const /** @type {?} */ metaCtor = makeMetadataCtor([props]);
    /**
     * @param {?} objOrType
     * @return {?}
     */
    function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getOwnMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, objOrType);
            return this;
        }
        const /** @type {?} */ annotationInstance = new ((DecoratorFactory))(objOrType);
        const /** @type {?} */ chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        const /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
            const /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls) || [];
            annotations.push(annotationInstance);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        });
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.toString = () => `@${name}`;
    ((DecoratorFactory)).annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
/**
 * @param {?} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor(...args) {
        props.forEach((prop, i) => {
            const /** @type {?} */ argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                this[prop[0]] = argVal === undefined ? prop[1] : argVal;
            }
            else {
                for (const /** @type {?} */ propName in prop) {
                    this[propName] =
                        argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
                }
            }
        });
    };
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makeParamDecorator(name, props, parentClass) {
    const /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const /** @type {?} */ annotationInstance = new ((ParamDecoratorFactory))(...args);
        ((ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            const /** @type {?} */ parameters = Reflect.getOwnMetadata('parameters', cls) || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            parameters[index].push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.toString = () => `@${name}`;
    ((ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makePropDecorator(name, props, parentClass) {
    const /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const /** @type {?} */ decoratorInstance = new ((PropDecoratorFactory))(...args);
        return function PropDecorator(target, name) {
            const /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = () => `@${name}`;
    ((PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

/**
 * This token can be used to create a virtual provider that will populate the
 * `entryComponents` fields of components and ng modules based on its `useValue`.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) will be added to the `entryComponents` property.
 *
 * ### Example
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on the router configuration which refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @experimental
 */
const /** @type {?} */ ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken('AnalyzeForEntryComponents');
/**
 * Attribute decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Attribute = makeParamDecorator('Attribute', [['attributeName', undefined]]);
/**
 * Base class for query metadata.
 *
 * See {\@link ContentChildren}, {\@link ContentChild}, {\@link ViewChildren}, {\@link ViewChild} for
 * more information.
 *
 * \@stable
 * @abstract
 */
class Query {
}
/**
 * ContentChildren decorator and metadata.
 *
 *  @stable
 *  @Annotation
 */
const /** @type {?} */ ContentChildren = (makePropDecorator('ContentChildren', [
    ['selector', undefined], {
        first: false,
        isViewQuery: false,
        descendants: false,
        read: undefined,
    }
], Query));
/**
 * ContentChild decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ ContentChild = makePropDecorator('ContentChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: false,
        descendants: true,
        read: undefined,
    }
], Query);
/**
 * ViewChildren decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ ViewChildren = makePropDecorator('ViewChildren', [
    ['selector', undefined], {
        first: false,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);
/**
 * ViewChild decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ ViewChild = makePropDecorator('ViewChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);

let ChangeDetectionStrategy = {};
ChangeDetectionStrategy.OnPush = 0;
ChangeDetectionStrategy.Default = 1;
ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush";
ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
let ChangeDetectorStatus = {};
ChangeDetectorStatus.CheckOnce = 0;
ChangeDetectorStatus.Checked = 1;
ChangeDetectorStatus.CheckAlways = 2;
ChangeDetectorStatus.Detached = 3;
ChangeDetectorStatus.Errored = 4;
ChangeDetectorStatus.Destroyed = 5;
ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = "CheckOnce";
ChangeDetectorStatus[ChangeDetectorStatus.Checked] = "Checked";
ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = "CheckAlways";
ChangeDetectorStatus[ChangeDetectorStatus.Detached] = "Detached";
ChangeDetectorStatus[ChangeDetectorStatus.Errored] = "Errored";
ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = "Destroyed";
/**
 * @param {?} changeDetectionStrategy
 * @return {?}
 */
function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return isBlank(changeDetectionStrategy) ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}

/**
 * Directive decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Directive = (makeDecorator('Directive', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    providers: undefined,
    exportAs: undefined,
    queries: undefined
}));
/**
 * Component decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Component = (makeDecorator('Component', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    exportAs: undefined,
    moduleId: undefined,
    providers: undefined,
    viewProviders: undefined,
    changeDetection: ChangeDetectionStrategy.Default,
    queries: undefined,
    templateUrl: undefined,
    template: undefined,
    styleUrls: undefined,
    styles: undefined,
    animations: undefined,
    encapsulation: undefined,
    interpolation: undefined,
    entryComponents: undefined
}, Directive));
/**
 * Pipe decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Pipe = (makeDecorator('Pipe', {
    name: undefined,
    pure: true,
}));
/**
 * Input decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Input = makePropDecorator('Input', [['bindingPropertyName', undefined]]);
/**
 * Output decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Output = makePropDecorator('Output', [['bindingPropertyName', undefined]]);
/**
 * HostBinding decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ HostBinding = makePropDecorator('HostBinding', [['hostPropertyName', undefined]]);
/**
 * HostListener decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let LifecycleHooks = {};
LifecycleHooks.OnInit = 0;
LifecycleHooks.OnDestroy = 1;
LifecycleHooks.DoCheck = 2;
LifecycleHooks.OnChanges = 3;
LifecycleHooks.AfterContentInit = 4;
LifecycleHooks.AfterContentChecked = 5;
LifecycleHooks.AfterViewInit = 6;
LifecycleHooks.AfterViewChecked = 7;
LifecycleHooks[LifecycleHooks.OnInit] = "OnInit";
LifecycleHooks[LifecycleHooks.OnDestroy] = "OnDestroy";
LifecycleHooks[LifecycleHooks.DoCheck] = "DoCheck";
LifecycleHooks[LifecycleHooks.OnChanges] = "OnChanges";
LifecycleHooks[LifecycleHooks.AfterContentInit] = "AfterContentInit";
LifecycleHooks[LifecycleHooks.AfterContentChecked] = "AfterContentChecked";
LifecycleHooks[LifecycleHooks.AfterViewInit] = "AfterViewInit";
LifecycleHooks[LifecycleHooks.AfterViewChecked] = "AfterViewChecked";
const /** @type {?} */ LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked
];
/**
 * \@whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * \@description
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 * The `changes` parameter contains the changed properties.
 *
 * See {\@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class OnChanges {
    /**
     * @abstract
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { }
}
/**
 * \@whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * \@description
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class OnInit {
    /**
     * @abstract
     * @return {?}
     */
    ngOnInit() { }
}
/**
 * \@whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * \@description
 * `ngDoCheck` gets called to check the changes in the directives in addition to the default
 * algorithm. The default change detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs.
 *
 * Note that a directive typically should not use both `DoCheck` and {\@link OnChanges} to respond to
 * changes on the same input, as `ngOnChanges` will continue to be called when the default change
 * detector detects changes.
 *
 * See {\@link KeyValueDiffers} and {\@link IterableDiffers} for implementing custom dirty checking
 * for collections.
 *
 * See {\@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class DoCheck {
    /**
     * @abstract
     * @return {?}
     */
    ngDoCheck() { }
}
/**
 * \@whatItDoes Lifecycle hook that is called when a directive, pipe or service is destroyed.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * \@description
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class OnDestroy {
    /**
     * @abstract
     * @return {?}
     */
    ngOnDestroy() { }
}
/**
 *
 * \@whatItDoes Lifecycle hook that is called after a directive's content has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class AfterContentInit {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterContentInit() { }
}
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a directive's content.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class AfterContentChecked {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterContentChecked() { }
}
/**
 * \@whatItDoes Lifecycle hook that is called after a component's view has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class AfterViewInit {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterViewInit() { }
}
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a component's view.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @abstract
 */
class AfterViewChecked {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterViewChecked() { }
}

/**
 * Defines a schema that will allow:
 * - any non-Angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 * @stable
 */
const /** @type {?} */ CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that will allow any property on any element.
 *
 * @experimental
 */
const /** @type {?} */ NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * NgModule decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ NgModule = (makeDecorator('NgModule', {
    providers: undefined,
    declarations: undefined,
    imports: undefined,
    exports: undefined,
    entryComponents: undefined,
    bootstrap: undefined,
    schemas: undefined,
    id: undefined,
}));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let ViewEncapsulation = {};
ViewEncapsulation.Emulated = 0;
ViewEncapsulation.Native = 1;
ViewEncapsulation.None = 2;
ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated";
ViewEncapsulation[ViewEncapsulation.Native] = "Native";
ViewEncapsulation[ViewEncapsulation.None] = "None";
/**
 * Metadata properties available for configuring Views.
 *
 * For details on the `\@Component` annotation, see {\@link Component}.
 *
 * ### Example
 *
 * ```
 * \@Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 *
 * @deprecated Use Component instead.
 *
 * {\@link Component}
 */
class ViewMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ templateUrl, template, encapsulation, styles, styleUrls, animations, interpolation } = {}) {
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.encapsulation = encapsulation;
        this.animations = animations;
        this.interpolation = interpolation;
    }
}

/**
 * \@whatItDoes Represents the version of Angular
 *
 * \@stable
 */
class Version {
    /**
     * @param {?} full
     */
    constructor(full) {
        this.full = full;
    }
    /**
     * @return {?}
     */
    get major() { return this.full.split('.')[0]; }
    /**
     * @return {?}
     */
    get minor() { return this.full.split('.')[1]; }
    /**
     * @return {?}
     */
    get patch() { return this.full.split('.').slice(2).join('.'); }
}
/**
 * @stable
 */
const /** @type {?} */ VERSION = new Version('4.0.0-beta.8-fcc1d17');

/**
 * Inject decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Inject = makeParamDecorator('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Optional = makeParamDecorator('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Injectable = (makeDecorator('Injectable', []));
/**
 * Self decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Self = makeParamDecorator('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ SkipSelf = makeParamDecorator('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * @stable
 * @Annotation
 */
const /** @type {?} */ Host = makeParamDecorator('Host', []);

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * \@experimental
 * @param {?} forwardRefFn
 * @return {?}
 */
function forwardRef(forwardRefFn) {
    ((forwardRefFn)).__forward_ref__ = forwardRef;
    ((forwardRefFn)).toString = function () { return stringify(this()); };
    return (((forwardRefFn)));
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * See: {\@link forwardRef}
 * \@experimental
 * @param {?} type
 * @return {?}
 */
function resolveForwardRef(type) {
    if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__') &&
        type.__forward_ref__ === forwardRef) {
        return ((type))();
    }
    else {
        return type;
    }
}

const /** @type {?} */ _THROW_IF_NOT_FOUND = new Object();
const /** @type {?} */ THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
class _NullInjector {
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error(`No provider for ${stringify(token)}!`);
        }
        return notFoundValue;
    }
}
/**
 * \@whatItDoes Injector interface
 * \@howToUse
 * ```
 * const injector: Injector = ...;
 * injector.get(...);
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * \@stable
 * @abstract
 */
class Injector {
    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws {\@link NoProviderError} if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectToken<T>
     * @suppress {duplicate}
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new _NullInjector();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ ERROR_TYPE = 'ngType';
const /** @type {?} */ ERROR_COMPONENT_TYPE = 'ngComponentType';
const /** @type {?} */ ERROR_DEBUG_CONTEXT = 'ngDebugContext';
const /** @type {?} */ ERROR_ORIGINAL_ERROR = 'ngOriginalError';
/**
 * @param {?} error
 * @return {?}
 */
function getType(error) {
    return ((error))[ERROR_TYPE];
}
/**
 * @param {?} error
 * @return {?}
 */
function getDebugContext(error) {
    return ((error))[ERROR_DEBUG_CONTEXT];
}
/**
 * @param {?} error
 * @return {?}
 */
function getOriginalError(error) {
    return ((error))[ERROR_ORIGINAL_ERROR];
}

/**
 * \@whatItDoes Provides a hook for centralized exception handling.
 *
 * \@description
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * \@NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * \@stable
 */
class ErrorHandler {
    /**
     * @param {?=} rethrowError
     */
    constructor(rethrowError = true) {
        /**
         * @internal
         */
        this._console = console;
        this.rethrowError = rethrowError;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        this._console.error(`EXCEPTION: ${this._extractMessage(error)}`);
        if (error instanceof Error) {
            const /** @type {?} */ originalError = this._findOriginalError(error);
            const /** @type {?} */ originalStack = this._findOriginalStack(error);
            const /** @type {?} */ context = this._findContext(error);
            if (originalError) {
                this._console.error(`ORIGINAL EXCEPTION: ${this._extractMessage(originalError)}`);
            }
            if (originalStack) {
                this._console.error('ORIGINAL STACKTRACE:');
                this._console.error(originalStack);
            }
            if (context) {
                this._console.error('ERROR CONTEXT:');
                this._console.error(context);
            }
        }
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        if (this.rethrowError)
            throw error;
    }
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    _extractMessage(error) {
        return error instanceof Error ? error.message : error.toString();
    }
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    _findContext(error) {
        if (error) {
            return getDebugContext(error) ? getDebugContext(error) :
                this._findContext(getOriginalError(error));
        }
        return null;
    }
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    _findOriginalError(error) {
        let /** @type {?} */ e = getOriginalError(error);
        while (e && getOriginalError(e)) {
            e = getOriginalError(e);
        }
        return e;
    }
    /**
     * \@internal
     * @param {?} error
     * @return {?}
     */
    _findOriginalStack(error) {
        let /** @type {?} */ e = error;
        let /** @type {?} */ stack = e.stack;
        while (e instanceof Error && getOriginalError(e)) {
            e = getOriginalError(e);
            if (e instanceof Error && e.stack) {
                stack = e.stack;
            }
        }
        return stack;
    }
}
/**
 * @param {?} message
 * @param {?} originalError
 * @return {?}
 */
function wrappedError(message, originalError) {
    const /** @type {?} */ msg = `${message} caused by: ${originalError instanceof Error ? originalError.message : originalError}`;
    const /** @type {?} */ error = Error(msg);
    ((error))[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}

/**
 * @param {?} keys
 * @return {?}
 */
function findFirstClosedCycle(keys) {
    const /** @type {?} */ res = [];
    for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
/**
 * @param {?} keys
 * @return {?}
 */
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        const /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
        const /** @type {?} */ tokenStrs = reversed.map(k => stringify(k.token));
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * @param {?} injector
 * @param {?} key
 * @param {?} constructResolvingMessage
 * @param {?=} originalError
 * @return {?}
 */
function injectionError(injector, key, constructResolvingMessage, originalError) {
    const /** @type {?} */ error = ((originalError ? wrappedError('', originalError) : Error()));
    error.addKey = addKey;
    error.keys = [key];
    error.injectors = [injector];
    error.constructResolvingMessage = constructResolvingMessage;
    error.message = error.constructResolvingMessage();
    ((error))[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}
/**
 * @this {?}
 * @param {?} injector
 * @param {?} key
 * @return {?}
 */
function addKey(injector, key) {
    this.injectors.push(injector);
    this.keys.push(key);
    this.message = this.constructResolvingMessage();
}
/**
 * Thrown when trying to retrieve a dependency by key from {\@link Injector}, but the
 * {\@link Injector} does not have a {\@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 * @param {?} injector
 * @param {?} key
 * @return {?}
 */
function noProviderError(injector, key) {
    return injectionError(injector, key, function () {
        const /** @type {?} */ first = stringify(this.keys[0].token);
        return `No provider for ${first}!${constructResolvingPath(this.keys)}`;
    });
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 * @param {?} injector
 * @param {?} key
 * @return {?}
 */
function cyclicDependencyError(injector, key) {
    return injectionError(injector, key, function () {
        return `Cannot instantiate cyclic dependency!${constructResolvingPath(this.keys)}`;
    });
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);
 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 * @param {?} injector
 * @param {?} originalException
 * @param {?} originalStack
 * @param {?} key
 * @return {?}
 */
function instantiationError(injector, originalException, originalStack, key) {
    return injectionError(injector, key, function () {
        const /** @type {?} */ first = stringify(this.keys[0].token);
        return `${getOriginalError(this).message}: Error during instantiation of ${first}!${constructResolvingPath(this.keys)}.`;
    }, originalException);
}
/**
 * Thrown when an object other then {\@link Provider} (or `Type`) is passed to {\@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 * @param {?} provider
 * @return {?}
 */
function invalidProviderError(provider) {
    return Error(`Invalid provider - only instances of Provider and Type are allowed, got: ${provider}`);
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {\@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {\@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * \@stable
 * @param {?} typeOrFunc
 * @param {?} params
 * @return {?}
 */
function noAnnotationError(typeOrFunc, params) {
    const /** @type {?} */ signature = [];
    for (let /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
        const /** @type {?} */ parameter = params[i];
        if (!parameter || parameter.length == 0) {
            signature.push('?');
        }
        else {
            signature.push(parameter.map(stringify).join(' '));
        }
    }
    return Error('Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
        signature.join(', ') + '). ' +
        'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
        stringify(typeOrFunc) + '\' is decorated with Injectable.');
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * \@stable
 * @param {?} index
 * @return {?}
 */
function outOfBoundsError(index) {
    return Error(`Index ${index} is out-of-bounds.`);
}
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 * @param {?} provider1
 * @param {?} provider2
 * @return {?}
 */
function mixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
    return Error(`Cannot mix multi providers and regular providers, got: ${provider1} ${provider2}`);
}

/**
 * A unique object used for retrieving items from the {\@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {\@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {\@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 * \@experimental
 */
class ReflectiveKey {
    /**
     * Private
     * @param {?} token
     * @param {?} id
     */
    constructor(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
    }
    /**
     * Returns a stringified token.
     * @return {?}
     */
    get displayName() { return stringify(this.token); }
    /**
     * Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    static get(token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    }
    /**
     * @return {?} the number of keys registered in the system.
     */
    static get numberOfKeys() { return _globalKeyRegistry.numberOfKeys; }
}
/**
 * \@internal
 */
class KeyRegistry {
    constructor() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        const /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    }
    /**
     * @return {?}
     */
    get numberOfKeys() { return this._allKeys.size; }
}
const /** @type {?} */ _globalKeyRegistry = new KeyRegistry();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ const /** @type {?} */ Type = Function;
/**
 * @param {?} v
 * @return {?}
 */
function isType(v) {
    return typeof v === 'function';
}

/**
 * Attention: This regex has to hold even if the code is minified!
 */
const /** @type {?} */ DELEGATE_CTOR = /^function\s+\S+\(\)\s*{\s*("use strict";)?\s*(return\s+)?(\S+\s+!==\s+null\s+&&\s+)?\S+\.apply\(this,\s*arguments\)/;
class ReflectionCapabilities {
    /**
     * @param {?=} reflect
     */
    constructor(reflect) { this._reflect = reflect || global$1.Reflect; }
    /**
     * @return {?}
     */
    isReflectionEnabled() { return true; }
    /**
     * @param {?} t
     * @return {?}
     */
    factory(t) { return (...args) => new t(...args); }
    /**
     * \@internal
     * @param {?} paramTypes
     * @param {?} paramAnnotations
     * @return {?}
     */
    _zipTypesAndAnnotations(paramTypes, paramAnnotations) {
        let /** @type {?} */ result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (let /** @type {?} */ i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (paramAnnotations && isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }
    /**
     * @param {?} type
     * @param {?} parentCtor
     * @return {?}
     */
    _ownParameters(type, parentCtor) {
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (DELEGATE_CTOR.exec(type.toString())) {
            return null;
        }
        // Prefer the direct API.
        if (((type)).parameters && ((type)).parameters !== parentCtor.parameters) {
            return ((type)).parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        const /** @type {?} */ tsickleCtorParams = ((type)).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            const /** @type {?} */ ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            const /** @type {?} */ paramTypes = ctorParameters.map((ctorParam) => ctorParam && ctorParam.type);
            const /** @type {?} */ paramAnnotations = ctorParameters.map((ctorParam) => ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        if (isPresent(this._reflect) && isPresent(this._reflect.getOwnMetadata)) {
            const /** @type {?} */ paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
            const /** @type {?} */ paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array(((type.length))).fill(undefined);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    parameters(type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        const /** @type {?} */ parentCtor = getParentCtor(type);
        let /** @type {?} */ parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    _ownAnnotations(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).annotations && ((typeOrFunc)).annotations !== parentCtor.annotations) {
            let /** @type {?} */ annotations = ((typeOrFunc)).annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).decorators && ((typeOrFunc)).decorators !== parentCtor.decorators) {
            return convertTsickleDecoratorIntoMetadata(((typeOrFunc)).decorators);
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('annotations', typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return [];
        }
        const /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        const /** @type {?} */ ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const /** @type {?} */ parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    _ownPropMetadata(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).propMetadata &&
            ((typeOrFunc)).propMetadata !== parentCtor.propMetadata) {
            let /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).propDecorators &&
            ((typeOrFunc)).propDecorators !== parentCtor.propDecorators) {
            const /** @type {?} */ propDecorators = ((typeOrFunc)).propDecorators;
            const /** @type {?} */ propMetadata = ({});
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        const /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        const /** @type {?} */ propMetadata = {};
        if (parentCtor !== Object) {
            const /** @type {?} */ parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach((propName) => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const /** @type {?} */ ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach((propName) => {
                const /** @type {?} */ decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return type instanceof Type && lcProperty in type.prototype;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return (new Function('o', 'return o.' + name + ';')); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) {
        return (new Function('o', 'v', 'return o.' + name + ' = v;'));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) {
        const /** @type {?} */ functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
        return (new Function('o', 'args', functionBody));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return `./${stringify(type)}`;
    }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return runtime;
    }
    /**
     * @param {?} enumIdentifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(enumIdentifier, name) { return enumIdentifier[name]; }
}
/**
 * @param {?} decoratorInvocations
 * @return {?}
 */
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
        const /** @type {?} */ decoratorType = decoratorInvocation.type;
        const /** @type {?} */ annotationCls = decoratorType.annotationCls;
        const /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new annotationCls(...annotationArgs);
    });
}
/**
 * @param {?} ctor
 * @return {?}
 */
function getParentCtor(ctor) {
    const /** @type {?} */ parentProto = Object.getPrototypeOf(ctor.prototype);
    const /** @type {?} */ parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}

/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 * @abstract
 */
class ReflectorReader {
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    importUri(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) { }
    /**
     * @abstract
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) { }
}

/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
class Reflector extends ReflectorReader {
    /**
     * @param {?} reflectionCapabilities
     */
    constructor(reflectionCapabilities) {
        super();
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    updateCapabilities(caps) { this.reflectionCapabilities = caps; }
    /**
     * @param {?} type
     * @return {?}
     */
    factory(type) { return this.reflectionCapabilities.factory(type); }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return this.reflectionCapabilities.getter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) { return this.reflectionCapabilities.setter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) { return this.reflectionCapabilities.method(name); }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    }
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    }
}

/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
const /** @type {?} */ reflector = new Reflector(new ReflectionCapabilities());

/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
class ReflectiveDependency {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} visibility
     */
    constructor(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static fromKey(key) {
        return new ReflectiveDependency(key, false, null);
    }
}
const /** @type {?} */ _EMPTY_LIST = [];
class ResolvedReflectiveProvider_ {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    constructor(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    /**
     * @return {?}
     */
    get resolvedFactory() { return this.resolvedFactories[0]; }
}
/**
 * An internal resolved representation of a factory function created by resolving {\@link
 * Provider}.
 * \@experimental
 */
class ResolvedReflectiveFactory {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    constructor(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
}
/**
 * Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    let /** @type {?} */ factoryFn;
    let /** @type {?} */ resolvedDeps;
    if (provider.useClass) {
        const /** @type {?} */ useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = (aliasInstance) => aliasInstance;
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = () => provider.useValue;
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {\@link Provider} into {\@link ResolvedProvider}.
 *
 * {\@link Injector} internally only uses {\@link ResolvedProvider}, {\@link Provider} contains
 * convenience provider syntax.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
}
/**
 * Resolve a list of Providers.
 * @param {?} providers
 * @return {?}
 */
function resolveReflectiveProviders(providers) {
    const /** @type {?} */ normalized = _normalizeProviders(providers, []);
    const /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    const /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 * @param {?} providers
 * @param {?} normalizedProvidersMap
 * @return {?}
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (let /** @type {?} */ i = 0; i < providers.length; i++) {
        const /** @type {?} */ provider = providers[i];
        const /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (let /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            let /** @type {?} */ resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
/**
 * @param {?} providers
 * @param {?} res
 * @return {?}
 */
function _normalizeProviders(providers, res) {
    providers.forEach(b => {
        if (b instanceof Type) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && ((b)).provide !== undefined) {
            res.push(/** @type {?} */ (b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw invalidProviderError(b);
        }
    });
    return res;
}
/**
 * @param {?} typeOrFunc
 * @param {?} dependencies
 * @return {?}
 */
function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        const /** @type {?} */ params = dependencies.map(t => [t]);
        return dependencies.map(t => _extractToken(typeOrFunc, t, params));
    }
}
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    const /** @type {?} */ params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(p => p == null)) {
        throw noAnnotationError(typeOrFunc, params);
    }
    return params.map(p => _extractToken(typeOrFunc, p, params));
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata, params) {
    let /** @type {?} */ token = null;
    let /** @type {?} */ optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata['token'], optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    let /** @type {?} */ visibility = null;
    for (let /** @type {?} */ i = 0; i < metadata.length; ++i) {
        const /** @type {?} */ paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata['token'];
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
            visibility = paramMetadata;
        }
        else if (paramMetadata instanceof InjectionToken) {
            token = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw noAnnotationError(typeOrFunc, params);
    }
}
/**
 * @param {?} token
 * @param {?} optional
 * @param {?} visibility
 * @return {?}
 */
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
}

// Threshold for the dynamic version
const /** @type {?} */ UNDEFINED = new Object();
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * \@Injectable()
 * class Engine {
 * }
 *
 * \@Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * \@stable
 * @abstract
 */
class ReflectiveInjector {
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {\@link ResolvedReflectiveProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {\@link ReflectiveInjector#fromResolvedProviders} for more info.
     * @param {?} providers
     * @return {?}
     */
    static resolve(providers) {
        return resolveReflectiveProviders(providers);
    }
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#fromResolvedProviders}.
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static resolveAndCreate(providers, parent = null) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    }
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     * \@experimental
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static fromResolvedProviders(providers, parent = null) {
        return new ReflectiveInjector_(providers, parent);
    }
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = ReflectiveInjector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     * @abstract
     * @return {?}
     */
    parent() { }
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#createChildFromResolved}.
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) { }
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) { }
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) { }
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) { }
    /**
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
}
class ReflectiveInjector_ {
    /**
     * Private
     * @param {?} _providers
     * @param {?=} _parent
     */
    constructor(_providers, _parent = null) {
        /** @internal */
        this._constructionCounter = 0;
        this._providers = _providers;
        this._parent = _parent;
        const len = _providers.length;
        this.keyIds = new Array(len);
        this.objs = new Array(len);
        for (let i = 0; i < len; i++) {
            this.keyIds[i] = _providers[i].key.id;
            this.objs[i] = UNDEFINED;
        }
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
    }
    /**
     * @return {?}
     */
    get parent() { return this._parent; }
    /**
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        const /** @type {?} */ inj = new ReflectiveInjector_(providers);
        inj._parent = this;
        return inj;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) {
        return this._instantiateProvider(provider);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index < 0 || index >= this._providers.length) {
            throw outOfBoundsError(index);
        }
        return this._providers[index];
    }
    /**
     * \@internal
     * @param {?} provider
     * @return {?}
     */
    _new(provider) {
        if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
            throw cyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    }
    /**
     * @return {?}
     */
    _getMaxNumberOfObjects() { return this.objs.length; }
    /**
     * @param {?} provider
     * @return {?}
     */
    _instantiateProvider(provider) {
        if (provider.multiProvider) {
            const /** @type {?} */ res = new Array(provider.resolvedFactories.length);
            for (let /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    }
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    _instantiate(provider, ResolvedReflectiveFactory) {
        const /** @type {?} */ factory = ResolvedReflectiveFactory.factory;
        let /** @type {?} */ deps;
        try {
            deps =
                ResolvedReflectiveFactory.dependencies.map(dep => this._getByReflectiveDependency(dep));
        }
        catch (e) {
            if (e.addKey) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        let /** @type {?} */ obj;
        try {
            obj = factory(...deps);
        }
        catch (e) {
            throw instantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    }
    /**
     * @param {?} dep
     * @return {?}
     */
    _getByReflectiveDependency(dep) {
        return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    }
    /**
     * @param {?} key
     * @param {?} visibility
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKey(key, visibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (visibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, visibility);
        }
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    _getObjByKeyId(keyId) {
        for (let /** @type {?} */ i = 0; i < this.keyIds.length; i++) {
            if (this.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this._new(this._providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _throwOrNull(key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw noProviderError(this, key);
        }
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKeySelf(key, notFoundValue) {
        const /** @type {?} */ obj = this._getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} visibility
     * @return {?}
     */
    _getByKeyDefault(key, notFoundValue, visibility) {
        let /** @type {?} */ inj;
        if (visibility instanceof SkipSelf) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            const /** @type {?} */ inj_ = (inj);
            const /** @type {?} */ obj = inj_._getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    }
    /**
     * @return {?}
     */
    get displayName() {
        const /** @type {?} */ providers = _mapProviders(this, (b) => ' "' + b.key.displayName + '" ')
            .join(', ');
        return `ReflectiveInjector(providers: [${providers}])`;
    }
    /**
     * @return {?}
     */
    toString() { return this.displayName; }
}
const /** @type {?} */ INJECTOR_KEY = ReflectiveKey.get(Injector);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    const /** @type {?} */ res = new Array(injector._providers.length);
    for (let /** @type {?} */ i = 0; i < injector._providers.length; ++i) {
        res[i] = fn(injector.getProviderAtIndex(i));
    }
    return res;
}

/**
 * Wraps Javascript Objects
 */
class StringMapWrapper {
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        const /** @type {?} */ m = {};
        for (const /** @type {?} */ k of Object.keys(m1)) {
            m[k] = m1[k];
        }
        for (const /** @type {?} */ k of Object.keys(m2)) {
            m[k] = m2[k];
        }
        return m;
    }
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static equals(m1, m2) {
        const /** @type {?} */ k1 = Object.keys(m1);
        const /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < k1.length; i++) {
            const /** @type {?} */ key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}
class ListWrapper {
    /**
     * @param {?} arr
     * @param {?} condition
     * @return {?}
     */
    static findLast(arr, condition) {
        for (let /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    }
    /**
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    static removeAll(list, items) {
        for (let /** @type {?} */ i = 0; i < items.length; ++i) {
            const /** @type {?} */ index = list.indexOf(items[i]);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
    }
    /**
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static remove(list, el) {
        const /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        if (a.length != b.length)
            return false;
        for (let /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    static flatten(list) {
        return list.reduce((flat, item) => {
            const /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
            return ((flat)).concat(flatItem);
        }, []);
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
function isListLikeIterable(obj) {
    if (!isJsObject(obj))
        return false;
    return Array.isArray(obj) ||
        (!(obj instanceof Map) &&
            getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
/**
 * @param {?} a
 * @param {?} b
 * @param {?} comparator
 * @return {?}
 */
function areIterablesEqual(a, b, comparator) {
    const /** @type {?} */ iterator1 = a[getSymbolIterator()]();
    const /** @type {?} */ iterator2 = b[getSymbolIterator()]();
    while (true) {
        const /** @type {?} */ item1 = iterator1.next();
        const /** @type {?} */ item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function iterateListLike(obj, fn) {
    if (Array.isArray(obj)) {
        for (let /** @type {?} */ i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        const /** @type {?} */ iterator = obj[getSymbolIterator()]();
        let /** @type {?} */ item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}

/**
 * Determine if the argument is shaped like a Promise
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is an Observable
 * @param {?} obj
 * @return {?}
 */
function isObservable(obj) {
    return !!(obj && obj[$$observable]);
}

/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
const /** @type {?} */ APP_INITIALIZER = new InjectionToken('Application Initializer');
/**
 * A class that reflects the state of running {\@link APP_INITIALIZER}s.
 *
 * \@experimental
 */
class ApplicationInitStatus {
    /**
     * @param {?} appInits
     */
    constructor(appInits) {
        this._done = false;
        const asyncInitPromises = [];
        if (appInits) {
            for (let i = 0; i < appInits.length; i++) {
                const initResult = appInits[i]();
                if (isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(() => { this._done = true; });
        if (asyncInitPromises.length === 0) {
            this._done = true;
        }
    }
    /**
     * @return {?}
     */
    get done() { return this._done; }
    /**
     * @return {?}
     */
    get donePromise() { return this._donePromise; }
}
ApplicationInitStatus.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ApplicationInitStatus.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [APP_INITIALIZER,] }, { type: Optional },] },
];

/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @experimental
 */
const /** @type {?} */ APP_ID = new InjectionToken('AppId');
/**
 * @return {?}
 */
function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @experimental
 */
const /** @type {?} */ APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: /** @type {?} */ ([]),
};
/**
 * @return {?}
 */
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @experimental
 */
const /** @type {?} */ PLATFORM_INITIALIZER = new InjectionToken('Platform Initializer');
/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @experimental
 */
const /** @type {?} */ APP_BOOTSTRAP_LISTENER = new InjectionToken('appBootstrapListener');
/**
 * A token which indicates the root directory of the application
 * @experimental
 */
const /** @type {?} */ PACKAGE_ROOT_URL = new InjectionToken('Application Packages Root URL');

class Console {
    /**
     * @param {?} message
     * @return {?}
     */
    log(message) { print(message); }
    /**
     * @param {?} message
     * @return {?}
     */
    warn(message) { warn(message); }
}
Console.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Console.ctorParameters = () => [];

/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * \@experimental
 */
class ModuleWithComponentFactories {
    /**
     * @param {?} ngModuleFactory
     * @param {?} componentFactories
     */
    constructor(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
}
/**
 * @return {?}
 */
function _throwError() {
    throw new Error(`Runtime compiler is not loaded`);
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {\@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `\@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * \@stable
 */
class Compiler {
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents` have to be inlined.
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleSync(moduleType) { throw _throwError(); }
    /**
     * Compiles the given NgModule and all of its components
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAsync(moduleType) { throw _throwError(); }
    /**
     * Same as {\@link compileModuleSync} but also creates ComponentFactories for all components.
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsSync(moduleType) {
        throw _throwError();
    }
    /**
     * Same as {\@link compileModuleAsync} but also creates ComponentFactories for all components.
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        throw _throwError();
    }
    /**
     * Exposes the CSS-style selectors that have been used in `ngContent` directives within
     * the template of the given component.
     * This is used by the `upgrade` library to compile the appropriate transclude content
     * in the AngularJS wrapper component.
     * @param {?} component
     * @return {?}
     */
    getNgContentSelectors(component) { throw _throwError(); }
    /**
     * Clears all caches.
     * @return {?}
     */
    clearCache() { }
    /**
     * Clears the cache for the given component/ngModule.
     * @param {?} type
     * @return {?}
     */
    clearCacheFor(type) { }
}
Compiler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Compiler.ctorParameters = () => [];
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @experimental
 */
const /** @type {?} */ COMPILER_OPTIONS = new InjectionToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * \@experimental
 * @abstract
 */
class CompilerFactory {
    /**
     * @abstract
     * @param {?=} options
     * @return {?}
     */
    createCompiler(options) { }
}

class ElementRef {
    /**
     * @param {?} nativeElement
     */
    constructor(nativeElement) { this.nativeElement = nativeElement; }
}

/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * \@Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   \@Output() open: EventEmitter<any> = new EventEmitter();
 *   \@Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * The events payload can be accessed by the parameter `$event` on the components output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 * \@stable
 */
class EventEmitter extends Subject {
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     * @param {?=} isAsync
     */
    constructor(isAsync = false) {
        super();
        this.__isAsync = isAsync;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    emit(value) { super.next(value); }
    /**
     * @param {?=} generatorOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(generatorOrNext, error, complete) {
        let /** @type {?} */ schedulerFn;
        let /** @type {?} */ errorFn = (err) => null;
        let /** @type {?} */ completeFn = () => null;
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? (value) => {
                setTimeout(() => generatorOrNext.next(value));
            } : (value) => { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? (err) => { setTimeout(() => generatorOrNext.error(err)); } :
                    (err) => { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? () => { setTimeout(() => generatorOrNext.complete()); } :
                    () => { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? (value) => { setTimeout(() => generatorOrNext(value)); } :
                (value) => { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? (err) => { setTimeout(() => error(err)); } : (err) => { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? () => { setTimeout(() => complete()); } : () => { complete(); };
            }
        }
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
}

/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 * \@Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * \@experimental
 */
class NgZone {
    /**
     * @param {?} __0
     */
    constructor({ enableLongStackTrace = false }) {
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        this._isStable = true;
        this._nesting = 0;
        this._onUnstable = new EventEmitter(false);
        this._onMicrotaskEmpty = new EventEmitter(false);
        this._onStable = new EventEmitter(false);
        this._onErrorEvents = new EventEmitter(false);
        if (typeof Zone == 'undefined') {
            throw new Error('Angular requires Zone.js prolyfill.');
        }
        Zone.assertZonePatched();
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
            this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
            this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.forkInnerZoneWithAngularBehavior();
    }
    /**
     * @return {?}
     */
    static isInAngularZone() { return Zone.current.get('isAngularZone') === true; }
    /**
     * @return {?}
     */
    static assertInAngularZone() {
        if (!NgZone.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    }
    /**
     * @return {?}
     */
    static assertNotInAngularZone() {
        if (NgZone.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    }
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @param {?} fn
     * @return {?}
     */
    run(fn) { return this.inner.run(fn); }
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     * @param {?} fn
     * @return {?}
     */
    runGuarded(fn) { return this.inner.runGuarded(fn); }
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {\@link run} to reenter the Angular zone and do work that updates the application model.
     * @param {?} fn
     * @return {?}
     */
    runOutsideAngular(fn) { return this.outer.run(fn); }
    /**
     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
     * @return {?}
     */
    get onUnstable() { return this._onUnstable; }
    /**
     * Notifies when there is no more microtasks enqueue in the current VM Turn.
     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
     * For this reason this event can fire multiple times per VM Turn.
     * @return {?}
     */
    get onMicrotaskEmpty() { return this._onMicrotaskEmpty; }
    /**
     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
     * implies we are about to relinquish VM turn.
     * This event gets called just once.
     * @return {?}
     */
    get onStable() { return this._onStable; }
    /**
     * Notify that an error has been delivered.
     * @return {?}
     */
    get onError() { return this._onErrorEvents; }
    /**
     * Whether there are no outstanding microtasks or macrotasks.
     * @return {?}
     */
    get isStable() { return this._isStable; }
    /**
     * @return {?}
     */
    get hasPendingMicrotasks() { return this._hasPendingMicrotasks; }
    /**
     * @return {?}
     */
    get hasPendingMacrotasks() { return this._hasPendingMacrotasks; }
    /**
     * @return {?}
     */
    checkStable() {
        if (this._nesting == 0 && !this._hasPendingMicrotasks && !this._isStable) {
            try {
                this._nesting++;
                this._onMicrotaskEmpty.emit(null);
            }
            finally {
                this._nesting--;
                if (!this._hasPendingMicrotasks) {
                    try {
                        this.runOutsideAngular(() => this._onStable.emit(null));
                    }
                    finally {
                        this._isStable = true;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    forkInnerZoneWithAngularBehavior() {
        this.inner = this.inner.fork({
            name: 'angular',
            properties: /** @type {?} */ ({ 'isAngularZone': true }),
            onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
                try {
                    this.onEnter();
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                }
                finally {
                    this.onLeave();
                }
            },
            onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
                try {
                    this.onEnter();
                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                }
                finally {
                    this.onLeave();
                }
            },
            onHasTask: (delegate, current, target, hasTaskState) => {
                delegate.hasTask(target, hasTaskState);
                if (current === target) {
                    // We are only interested in hasTask events which originate from our zone
                    // (A child hasTask event is not interesting to us)
                    if (hasTaskState.change == 'microTask') {
                        this.setHasMicrotask(hasTaskState.microTask);
                    }
                    else if (hasTaskState.change == 'macroTask') {
                        this.setHasMacrotask(hasTaskState.macroTask);
                    }
                }
            },
            onHandleError: (delegate, current, target, error) => {
                delegate.handleError(target, error);
                this.triggerError(error);
                return false;
            }
        });
    }
    /**
     * @return {?}
     */
    onEnter() {
        this._nesting++;
        if (this._isStable) {
            this._isStable = false;
            this._onUnstable.emit(null);
        }
    }
    /**
     * @return {?}
     */
    onLeave() {
        this._nesting--;
        this.checkStable();
    }
    /**
     * @param {?} hasMicrotasks
     * @return {?}
     */
    setHasMicrotask(hasMicrotasks) {
        this._hasPendingMicrotasks = hasMicrotasks;
        this.checkStable();
    }
    /**
     * @param {?} hasMacrotasks
     * @return {?}
     */
    setHasMacrotask(hasMacrotasks) { this._hasPendingMacrotasks = hasMacrotasks; }
    /**
     * @param {?} error
     * @return {?}
     */
    triggerError(error) { this._onErrorEvents.emit(error); }
}

class AnimationQueue {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
        this._zone = _zone;
        this.entries = [];
    }
    /**
     * @param {?} player
     * @return {?}
     */
    enqueue(player) { this.entries.push(player); }
    /**
     * @return {?}
     */
    flush() {
        // given that each animation player may set aside
        // microtasks and rely on DOM-based events, this
        // will cause Angular to run change detection after
        // each request. This sidesteps the issue. If a user
        // hooks into an animation via (@anim.start) or (@anim.done)
        // then those methods will automatically trigger change
        // detection by wrapping themselves inside of a zone
        if (this.entries.length) {
            this._zone.runOutsideAngular(() => {
                // this code is wrapped into a single promise such that the
                // onStart and onDone player callbacks are triggered outside
                // of the digest cycle of animations
                Promise.resolve(null).then(() => this._triggerAnimations());
            });
        }
    }
    /**
     * @return {?}
     */
    _triggerAnimations() {
        NgZone.assertNotInAngularZone();
        while (this.entries.length) {
            const /** @type {?} */ player = this.entries.shift();
            // in the event that an animation throws an error then we do
            // not want to re-run animations on any previous animations
            // if they have already been kicked off beforehand
            if (!player.hasStarted()) {
                player.play();
            }
        }
    }
}
AnimationQueue.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AnimationQueue.ctorParameters = () => [
    { type: NgZone, },
];

class DefaultIterableDifferFactory {
    constructor() { }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return isListLikeIterable(obj); }
    /**
     * @deprecated v4.0.0 - ChangeDetectorRef is not used and is no longer a parameter
     * @param {?=} cdRefOrTrackBy
     * @param {?=} trackByFn
     * @return {?}
     */
    create(cdRefOrTrackBy, trackByFn) {
        return new DefaultIterableDiffer(trackByFn || (cdRefOrTrackBy));
    }
}
const /** @type {?} */ trackByIdentity = (index, item) => item;
/**
 * @deprecated v4.0.0 - Should not be part of public API.
 */
class DefaultIterableDiffer {
    /**
     * @param {?=} _trackByFn
     */
    constructor(_trackByFn) {
        this._trackByFn = _trackByFn;
        this._length = null;
        this._collection = null;
        this._linkedRecords = null;
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = this._trackByFn || trackByIdentity;
    }
    /**
     * @return {?}
     */
    get collection() { return this._collection; }
    /**
     * @return {?}
     */
    get length() { return this._length; }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachItem(fn) {
        let /** @type {?} */ record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachOperation(fn) {
        let /** @type {?} */ nextIt = this._itHead;
        let /** @type {?} */ nextRemove = this._removalsHead;
        let /** @type {?} */ addRemoveOffset = 0;
        let /** @type {?} */ moveOffsets = null;
        while (nextIt || nextRemove) {
            // Figure out which is the next record to process
            // Order: remove, add, move
            const /** @type {?} */ record = !nextRemove ||
                nextIt &&
                    nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                nextIt :
                nextRemove;
            const /** @type {?} */ adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
            const /** @type {?} */ currentIndex = record.currentIndex;
            // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
            if (record === nextRemove) {
                addRemoveOffset--;
                nextRemove = nextRemove._nextRemoved;
            }
            else {
                nextIt = nextIt._next;
                if (record.previousIndex == null) {
                    addRemoveOffset++;
                }
                else {
                    // INVARIANT:  currentIndex < previousIndex
                    if (!moveOffsets)
                        moveOffsets = [];
                    const /** @type {?} */ localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                    const /** @type {?} */ localCurrentIndex = currentIndex - addRemoveOffset;
                    if (localMovePreviousIndex != localCurrentIndex) {
                        for (let /** @type {?} */ i = 0; i < localMovePreviousIndex; i++) {
                            const /** @type {?} */ offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                            const /** @type {?} */ index = offset + i;
                            if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                moveOffsets[i] = offset + 1;
                            }
                        }
                        const /** @type {?} */ previousIndex = record.previousIndex;
                        moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                    }
                }
            }
            if (adjPreviousIndex !== currentIndex) {
                fn(record, adjPreviousIndex, currentIndex);
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachPreviousItem(fn) {
        let /** @type {?} */ record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachAddedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachMovedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachRemovedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachIdentityChange(fn) {
        let /** @type {?} */ record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    diff(collection) {
        if (isBlank(collection))
            collection = [];
        if (!isListLikeIterable(collection)) {
            throw new Error(`Error trying to diff '${collection}'`);
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    onDestroy() { }
    /**
     * @param {?} collection
     * @return {?}
     */
    check(collection) {
        this._reset();
        let /** @type {?} */ record = this._itHead;
        let /** @type {?} */ mayBeDirty = false;
        let /** @type {?} */ index;
        let /** @type {?} */ item;
        let /** @type {?} */ itemTrackBy;
        if (Array.isArray(collection)) {
            this._length = collection.length;
            for (let /** @type {?} */ index = 0; index < this._length; index++) {
                item = collection[index];
                itemTrackBy = this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            iterateListLike(collection, (item) => {
                itemTrackBy = this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            this._length = index;
        }
        this._truncate(record);
        this._collection = collection;
        return this.isDirty;
    }
    /**
     * @return {?}
     */
    get isDirty() {
        return this._additionsHead !== null || this._movesHead !== null ||
            this._removalsHead !== null || this._identityChangesHead !== null;
    }
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * \@internal
     * @return {?}
     */
    _reset() {
        if (this.isDirty) {
            let /** @type {?} */ record;
            let /** @type {?} */ nextRecord;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
        }
    }
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    _mismatch(record, item, itemTrackBy, index) {
        // The previous record after which we will append the current one.
        let /** @type {?} */ previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    }
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    _verifyReinsertion(record, item, itemTrackBy, index) {
        let /** @type {?} */ reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, record._prev, index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    }
    /**
     * Get rid of any excess {\@link IterableChangeRecord_}s from the previous collection
     *
     * - `record` The first excess {\@link IterableChangeRecord_}.
     *
     * \@internal
     * @param {?} record
     * @return {?}
     */
    _truncate(record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            const /** @type {?} */ nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _reinsertAfter(record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        const /** @type {?} */ prev = record._prevRemoved;
        const /** @type {?} */ next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _moveAfter(record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _addAfter(record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // todo(vicb)
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // todo(vicb)
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _insertAfter(record, prevRecord, index) {
        // todo(vicb)
        // assert(record != prevRecord);
        // assert(record._next === null);
        // assert(record._prev === null);
        const /** @type {?} */ next = prevRecord === null ? this._itHead : prevRecord._next;
        // todo(vicb)
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    _remove(record) {
        return this._addToRemovals(this._unlink(record));
    }
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    _unlink(record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        const /** @type {?} */ prev = record._prev;
        const /** @type {?} */ next = record._next;
        // todo(vicb)
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} toIndex
     * @return {?}
     */
    _addToMoves(record, toIndex) {
        // todo(vicb)
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // todo(vicb)
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // todo(vicb)
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToRemovals(record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // todo(vicb)
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // todo(vicb)
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    }
    /**
     * \@internal
     * @param {?} record
     * @param {?} item
     * @return {?}
     */
    _addIdentityChange(record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    }
    /**
     * @return {?}
     */
    toString() {
        const /** @type {?} */ list = [];
        this.forEachItem((record) => list.push(record));
        const /** @type {?} */ previous = [];
        this.forEachPreviousItem((record) => previous.push(record));
        const /** @type {?} */ additions = [];
        this.forEachAddedItem((record) => additions.push(record));
        const /** @type {?} */ moves = [];
        this.forEachMovedItem((record) => moves.push(record));
        const /** @type {?} */ removals = [];
        this.forEachRemovedItem((record) => removals.push(record));
        const /** @type {?} */ identityChanges = [];
        this.forEachIdentityChange((record) => identityChanges.push(record));
        return 'collection: ' + list.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'moves: ' + moves.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n' +
            'identityChanges: ' + identityChanges.join(', ') + '\n';
    }
}
/**
 * \@stable
 */
class IterableChangeRecord_ {
    /**
     * @param {?} item
     * @param {?} trackById
     */
    constructor(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prevDup = null;
        /** @internal */
        this._nextDup = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextMoved = null;
        /** @internal */
        this._nextIdentityChange = null;
    }
    /**
     * @return {?}
     */
    toString() {
        return this.previousIndex === this.currentIndex ? stringify(this.item) :
            stringify(this.item) + '[' +
                stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']';
    }
}
class _DuplicateItemRecordList {
    constructor() {
        /** @internal */
        this._head = null;
        /** @internal */
        this._tail = null;
    }
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     * @param {?} record
     * @return {?}
     */
    add(record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            // todo(vicb)
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    }
    /**
     * @param {?} trackById
     * @param {?} afterIndex
     * @return {?}
     */
    get(trackById, afterIndex) {
        let /** @type {?} */ record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((afterIndex === null || afterIndex < record.currentIndex) &&
                looseIdentical(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    }
    /**
     * Remove one {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     * @param {?} record
     * @return {?}
     */
    remove(record) {
        // todo(vicb)
        // assert(() {
        //  // verify that the record being removed is in the list.
        //  for (IterableChangeRecord_ cursor = _head; cursor != null; cursor = cursor._nextDup) {
        //    if (identical(cursor, record)) return true;
        //  }
        //  return false;
        //});
        const /** @type {?} */ prev = record._prevDup;
        const /** @type {?} */ next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    }
}
class _DuplicateMap {
    constructor() {
        this.map = new Map();
    }
    /**
     * @param {?} record
     * @return {?}
     */
    put(record) {
        const /** @type {?} */ key = record.trackById;
        let /** @type {?} */ duplicates = this.map.get(key);
        if (!duplicates) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    }
    /**
     * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
     * have already iterated over, we use the afterIndex to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the last `a` not the first or second.
     * @param {?} trackById
     * @param {?=} afterIndex
     * @return {?}
     */
    get(trackById, afterIndex = null) {
        const /** @type {?} */ key = trackById;
        const /** @type {?} */ recordList = this.map.get(key);
        return recordList ? recordList.get(trackById, afterIndex) : null;
    }
    /**
     * Removes a {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     * @param {?} record
     * @return {?}
     */
    remove(record) {
        const /** @type {?} */ key = record.trackById;
        const /** @type {?} */ recordList = this.map.get(key);
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    }
    /**
     * @return {?}
     */
    get isEmpty() { return this.map.size === 0; }
    /**
     * @return {?}
     */
    clear() { this.map.clear(); }
    /**
     * @return {?}
     */
    toString() { return '_DuplicateMap(' + stringify(this.map) + ')'; }
}
/**
 * @param {?} item
 * @param {?} addRemoveOffset
 * @param {?} moveOffsets
 * @return {?}
 */
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
    const /** @type {?} */ previousIndex = item.previousIndex;
    if (previousIndex === null)
        return previousIndex;
    let /** @type {?} */ moveOffset = 0;
    if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
    }
    return previousIndex + addRemoveOffset + moveOffset;
}

class DefaultKeyValueDifferFactory {
    constructor() { }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return obj instanceof Map || isJsObject(obj); }
    /**
     * @deprecated v4.0.0 - ChangeDetectorRef is not used and is no longer a parameter
     * @param {?=} cd
     * @return {?}
     */
    create(cd) {
        return new DefaultKeyValueDiffer();
    }
}
class DefaultKeyValueDiffer {
    constructor() {
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    /**
     * @return {?}
     */
    get isDirty() {
        return this._additionsHead !== null || this._changesHead !== null ||
            this._removalsHead !== null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachItem(fn) {
        let /** @type {?} */ record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachPreviousItem(fn) {
        let /** @type {?} */ record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachChangedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachAddedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachRemovedItem(fn) {
        let /** @type {?} */ record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    /**
     * @param {?} map
     * @return {?}
     */
    diff(map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || isJsObject(map))) {
            throw new Error(`Error trying to diff '${map}'`);
        }
        return this.check(map) ? this : null;
    }
    /**
     * @return {?}
     */
    onDestroy() { }
    /**
     * @param {?} map
     * @return {?}
     */
    check(map) {
        this._reset();
        const /** @type {?} */ records = this._records;
        let /** @type {?} */ oldSeqRecord = this._mapHead;
        let /** @type {?} */ lastOldSeqRecord = null;
        let /** @type {?} */ lastNewSeqRecord = null;
        let /** @type {?} */ seqChanged = false;
        this._forEach(map, (value, key) => {
            let /** @type {?} */ newSeqRecord;
            if (oldSeqRecord && key === oldSeqRecord.key) {
                newSeqRecord = oldSeqRecord;
                this._maybeAddToChanges(newSeqRecord, value);
            }
            else {
                seqChanged = true;
                if (oldSeqRecord !== null) {
                    this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                    this._addToRemovals(oldSeqRecord);
                }
                if (records.has(key)) {
                    newSeqRecord = records.get(key);
                    this._maybeAddToChanges(newSeqRecord, value);
                }
                else {
                    newSeqRecord = new KeyValueChangeRecord_(key);
                    records.set(key, newSeqRecord);
                    newSeqRecord.currentValue = value;
                    this._addToAdditions(newSeqRecord);
                }
            }
            if (seqChanged) {
                if (this._isInRemovals(newSeqRecord)) {
                    this._removeFromRemovals(newSeqRecord);
                }
                if (lastNewSeqRecord == null) {
                    this._mapHead = newSeqRecord;
                }
                else {
                    lastNewSeqRecord._next = newSeqRecord;
                }
            }
            lastOldSeqRecord = oldSeqRecord;
            lastNewSeqRecord = newSeqRecord;
            oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
    }
    /**
     * \@internal
     * @return {?}
     */
    _reset() {
        if (this.isDirty) {
            let /** @type {?} */ record;
            // Record the state of the mapping
            for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = this._removalsTail = null;
        }
    }
    /**
     * @param {?} lastRecord
     * @param {?} record
     * @return {?}
     */
    _truncate(lastRecord, record) {
        while (record !== null) {
            if (lastRecord === null) {
                this._mapHead = null;
            }
            else {
                lastRecord._next = null;
            }
            const /** @type {?} */ nextRecord = record._next;
            this._addToRemovals(record);
            lastRecord = record;
            record = nextRecord;
        }
        for (let /** @type {?} */ rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
            rec.previousValue = rec.currentValue;
            rec.currentValue = null;
            this._records.delete(rec.key);
        }
    }
    /**
     * @param {?} record
     * @param {?} newValue
     * @return {?}
     */
    _maybeAddToChanges(record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _isInRemovals(record) {
        return record === this._removalsHead || record._nextRemoved !== null ||
            record._prevRemoved !== null;
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToRemovals(record) {
        if (this._removalsHead === null) {
            this._removalsHead = this._removalsTail = record;
        }
        else {
            this._removalsTail._nextRemoved = record;
            record._prevRemoved = this._removalsTail;
            this._removalsTail = record;
        }
    }
    /**
     * @param {?} prev
     * @param {?} record
     * @return {?}
     */
    _removeFromSeq(prev, record) {
        const /** @type {?} */ next = record._next;
        if (prev === null) {
            this._mapHead = next;
        }
        else {
            prev._next = next;
        }
        record._next = null;
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _removeFromRemovals(record) {
        const /** @type {?} */ prev = record._prevRemoved;
        const /** @type {?} */ next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToAdditions(record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToChanges(record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    }
    /**
     * @return {?}
     */
    toString() {
        const /** @type {?} */ items = [];
        const /** @type {?} */ previous = [];
        const /** @type {?} */ changes = [];
        const /** @type {?} */ additions = [];
        const /** @type {?} */ removals = [];
        let /** @type {?} */ record;
        for (record = this._mapHead; record !== null; record = record._next) {
            items.push(stringify(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            previous.push(stringify(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            changes.push(stringify(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            additions.push(stringify(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            removals.push(stringify(record));
        }
        return 'map: ' + items.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'changes: ' + changes.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n';
    }
    /**
     * \@internal
     * @param {?} obj
     * @param {?} fn
     * @return {?}
     */
    _forEach(obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            Object.keys(obj).forEach(k => fn(obj[k], k));
        }
    }
}
/**
 * \@stable
 */
class KeyValueChangeRecord_ {
    /**
     * @param {?} key
     */
    constructor(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
    /**
     * @return {?}
     */
    toString() {
        return looseIdentical(this.previousValue, this.currentValue) ?
            stringify(this.key) :
            (stringify(this.key) + '[' + stringify(this.previousValue) + '->' +
                stringify(this.currentValue) + ']');
    }
}

/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 * \@stable
 */
class IterableDiffers {
    /**
     * @param {?} factories
     */
    constructor(factories) { this.factories = factories; }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    static create(factories, parent) {
        if (isPresent(parent)) {
            const /** @type {?} */ copied = parent.factories.slice();
            factories = factories.concat(copied);
            return new IterableDiffers(factories);
        }
        else {
            return new IterableDiffers(factories);
        }
    }
    /**
     * Takes an array of {\@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {\@link IterableDiffers} instance with the provided factories and return a new
     * {\@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    static extend(factories) {
        return {
            provide: IterableDiffers,
            useFactory: (parent) => {
                if (!parent) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
    }
    /**
     * @param {?} iterable
     * @return {?}
     */
    find(iterable) {
        const /** @type {?} */ factory = this.factories.find(f => f.supports(iterable));
        if (isPresent(factory)) {
            return factory;
        }
        else {
            throw new Error(`Cannot find a differ supporting object '${iterable}' of type '${getTypeNameForDebugging(iterable)}'`);
        }
    }
}

/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 * \@stable
 */
class KeyValueDiffers {
    /**
     * @param {?} factories
     */
    constructor(factories) { this.factories = factories; }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    static create(factories, parent) {
        if (parent) {
            const /** @type {?} */ copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new KeyValueDiffers(factories);
    }
    /**
     * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
     * {\@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    static extend(factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: (parent) => {
                if (!parent) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
    }
    /**
     * @param {?} kv
     * @return {?}
     */
    find(kv) {
        const /** @type {?} */ factory = this.factories.find(f => f.supports(kv));
        if (factory) {
            return factory;
        }
        throw new Error(`Cannot find a differ supporting object '${kv}'`);
    }
}

/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function devModeEqual(a, b) {
    if (isListLikeIterable(a) && isListLikeIterable(b)) {
        return areIterablesEqual(a, b, devModeEqual);
    }
    else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) && !isPrimitive(b)) {
        return true;
    }
    else {
        return looseIdentical(a, b);
    }
}
/**
 * Indicates that the result of a {\@link Pipe} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 * \@stable
 */
class WrappedValue {
    /**
     * @param {?} wrapped
     */
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static wrap(value) { return new WrappedValue(value); }
}
/**
 * Helper class for unwrapping WrappedValue s
 */
class ValueUnwrapper {
    constructor() {
        this.hasWrappedValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    unwrap(value) {
        if (value instanceof WrappedValue) {
            this.hasWrappedValue = true;
            return value.wrapped;
        }
        return value;
    }
    /**
     * @return {?}
     */
    reset() { this.hasWrappedValue = false; }
}
/**
 * Represents a basic change from a previous to a new value.
 * \@stable
 */
class SimpleChange {
    /**
     * @param {?} previousValue
     * @param {?} currentValue
     * @param {?} firstChange
     */
    constructor(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
    /**
     * Check whether the new value is the first value assigned.
     * @return {?}
     */
    isFirstChange() { return this.firstChange; }
}

/**
 * \@stable
 * @abstract
 */
class ChangeDetectorRef {
    /**
     * Marks all {\@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
     *
     * ```typescript
     * \@Component({
     *   selector: 'cmp',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `Number of ticks: {{numberOfTicks}}`
     * })
     * class Cmp {
     *   numberOfTicks = 0;
     *
     *   constructor(ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks ++
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `
     *     <cmp><cmp>
     *   `,
     * })
     * class App {
     * }
     * ```
     * @abstract
     * @return {?}
     */
    markForCheck() { }
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     *
     * This can also be used in combination with {\@link ChangeDetectorRef#detectChanges} to implement
     * local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * \@Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     * @abstract
     * @return {?}
     */
    detach() { }
    /**
     * Checks the change detector and its children.
     *
     * This can also be used in combination with {\@link ChangeDetectorRef#detach} to implement local
     * change detection
     * checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check
     * every five seconds.
     *
     * See {\@link ChangeDetectorRef#detach} for more information.
     * @abstract
     * @return {?}
     */
    detectChanges() { }
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't introduce
     * other changes.
     * @abstract
     * @return {?}
     */
    checkNoChanges() { }
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also marks OnPush ancestors as to be checked. This reattached change detector will be
     * checked during the next change detection run.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * \@Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
     *
     *   set live(value) {
     *     if (value)
     *       this.ref.reattach();
     *     else
     *       this.ref.detach();
     *   }
     * }
     *
     * \@Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class App {
     *   live = true;
     * }
     * ```
     * @abstract
     * @return {?}
     */
    reattach() { }
}

/**
 * Structural diffing for `Object`s and `Map`s.
 */
const /** @type {?} */ keyValDiff = [new DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
const /** @type {?} */ iterableDiff = [new DefaultIterableDifferFactory()];
const /** @type {?} */ defaultIterableDiffers = new IterableDiffers(iterableDiff);
const /** @type {?} */ defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class RenderComponentType {
    /**
     * @param {?} id
     * @param {?} templateUrl
     * @param {?} slotCount
     * @param {?} encapsulation
     * @param {?} styles
     * @param {?} animations
     */
    constructor(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
}
/**
 * @abstract
 */
class RenderDebugInfo {
    /**
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * @abstract
     * @return {?}
     */
    component() { }
    /**
     * @abstract
     * @return {?}
     */
    providerTokens() { }
    /**
     * @abstract
     * @return {?}
     */
    references() { }
    /**
     * @abstract
     * @return {?}
     */
    context() { }
    /**
     * @abstract
     * @return {?}
     */
    source() { }
}
/**
 * \@experimental
 * @abstract
 */
class RendererV1 {
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) { }
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    createElement(parentElement, name, debugInfo) { }
    /**
     * @abstract
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) { }
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) { }
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) { }
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) { }
    /**
     * @abstract
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) { }
    /**
     * @abstract
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) { }
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) { }
    /**
     * @abstract
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) { }
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) { }
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) { }
    /**
     * @abstract
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { }
}
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {\@link #setElementProperty} or {\@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 * \@experimental
 * @abstract
 */
class RootRenderer {
    /**
     * @abstract
     * @param {?} componentType
     * @return {?}
     */
    renderComponent(componentType) { }
}
/**
 * \@experimental
 * @abstract
 */
class RendererFactoryV2 {
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    createRenderer(hostElement, type) { }
}
/**
 * \@experimental
 * @abstract
 */
class RendererV2 {
    /**
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) { }
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    createComment(value) { }
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    createText(value) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) { }
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) { }
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     * @abstract
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { }
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { }
    /**
     * @abstract
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { }
    /**
     * @abstract
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) { }
}

let SecurityContext = {};
SecurityContext.NONE = 0;
SecurityContext.HTML = 1;
SecurityContext.STYLE = 2;
SecurityContext.SCRIPT = 3;
SecurityContext.URL = 4;
SecurityContext.RESOURCE_URL = 5;
SecurityContext[SecurityContext.NONE] = "NONE";
SecurityContext[SecurityContext.HTML] = "HTML";
SecurityContext[SecurityContext.STYLE] = "STYLE";
SecurityContext[SecurityContext.SCRIPT] = "SCRIPT";
SecurityContext[SecurityContext.URL] = "URL";
SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * \@stable
 * @abstract
 */
class Sanitizer {
    /**
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    sanitize(context, value) { }
}

/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * \@Component({
 *   selector: 'parent',
 *   template: '<child [prop]="parentProp"></child>',
 * })
 * class Parent {
 *   parentProp = 'init';
 * }
 *
 * \@Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
 *     this.parent.parentProp = 'updated';
 *   }
 * }
 * ```
 * @param {?} oldValue
 * @param {?} currValue
 * @param {?} isFirstCheck
 * @return {?}
 */
function expressionChangedAfterItHasBeenCheckedError(oldValue, currValue, isFirstCheck) {
    let /** @type {?} */ msg = `Expression has changed after it was checked. Previous value: '${oldValue}'. Current value: '${currValue}'.`;
    if (isFirstCheck) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook ?`;
    }
    const /** @type {?} */ error = Error(msg);
    ((error))[ERROR_TYPE] = expressionChangedAfterItHasBeenCheckedError;
    return error;
}
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 * @param {?} originalError
 * @param {?} context
 * @return {?}
 */
function viewWrappedError(originalError, context) {
    const /** @type {?} */ error = wrappedError(`Error in ${context.source}`, originalError);
    ((error))[ERROR_DEBUG_CONTEXT] = context;
    ((error))[ERROR_TYPE] = viewWrappedError;
    return error;
}
/**
 * Thrown when a destroyed view is used.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 * @param {?} details
 * @return {?}
 */
function viewDestroyedError(details) {
    return Error(`Attempt to use a destroyed view: ${details}`);
}

class ViewUtils {
    /**
     * @param {?} _renderer
     * @param {?} sanitizer
     * @param {?} animationQueue
     */
    constructor(_renderer, sanitizer, animationQueue) {
        this._renderer = _renderer;
        this.animationQueue = animationQueue;
        this.sanitizer = sanitizer;
    }
    /**
     * \@internal
     * @param {?} renderComponentType
     * @return {?}
     */
    renderComponent(renderComponentType) {
        return this._renderer.renderComponent(renderComponentType);
    }
}
ViewUtils.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ViewUtils.ctorParameters = () => [
    { type: RootRenderer, },
    { type: Sanitizer, },
    { type: AnimationQueue, },
];
let /** @type {?} */ nextRenderComponentTypeId = 0;
/**
 * @param {?} templateUrl
 * @param {?} slotCount
 * @param {?} encapsulation
 * @param {?} styles
 * @param {?} animations
 * @return {?}
 */
function createRenderComponentType(templateUrl, slotCount, encapsulation, styles, animations) {
    return new RenderComponentType(`${nextRenderComponentTypeId++}`, templateUrl, slotCount, encapsulation, styles, animations);
}
/**
 * @param {?} e
 * @param {?} array
 * @return {?}
 */
function addToArray(e, array) {
    array.push(e);
}
/**
 * @param {?} valueCount
 * @param {?} constAndInterp
 * @return {?}
 */
function interpolate(valueCount, constAndInterp) {
    let /** @type {?} */ result = '';
    for (let /** @type {?} */ i = 0; i < valueCount * 2; i = i + 2) {
        result = result + constAndInterp[i] + _toStringWithNull(constAndInterp[i + 1]);
    }
    return result + constAndInterp[valueCount * 2];
}
/**
 * @param {?} valueCount
 * @param {?} c0
 * @param {?} a1
 * @param {?} c1
 * @param {?=} a2
 * @param {?=} c2
 * @param {?=} a3
 * @param {?=} c3
 * @param {?=} a4
 * @param {?=} c4
 * @param {?=} a5
 * @param {?=} c5
 * @param {?=} a6
 * @param {?=} c6
 * @param {?=} a7
 * @param {?=} c7
 * @param {?=} a8
 * @param {?=} c8
 * @param {?=} a9
 * @param {?=} c9
 * @return {?}
 */
function inlineInterpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
    switch (valueCount) {
        case 1:
            return c0 + _toStringWithNull(a1) + c1;
        case 2:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
        case 3:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3;
        case 4:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4;
        case 5:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
        case 6:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
        case 7:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7;
        case 8:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
        case 9:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
        default:
            throw new Error(`Does not support more than 9 expressions`);
    }
}
/**
 * @param {?} v
 * @return {?}
 */
function _toStringWithNull(v) {
    return v != null ? v.toString() : '';
}
/**
 * @param {?} view
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @return {?}
 */
function checkBinding(view, oldValue, newValue, forceUpdate) {
    const /** @type {?} */ isFirstCheck = view.numberOfChecks === 0;
    if (view.throwOnChange) {
        if (isFirstCheck || !devModeEqual(oldValue, newValue)) {
            throw expressionChangedAfterItHasBeenCheckedError(oldValue, newValue, isFirstCheck);
        }
        return false;
    }
    else {
        return isFirstCheck || forceUpdate || !looseIdentical(oldValue, newValue);
    }
}
/**
 * @param {?} view
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @return {?}
 */
function checkBindingChange(view, oldValue, newValue, forceUpdate) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        return new SimpleChange(oldValue, newValue, view.numberOfChecks === 0);
    }
}
/**
 * @param {?} view
 * @param {?} renderElement
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @return {?}
 */
function checkRenderText(view, renderElement, oldValue, newValue, forceUpdate) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        view.renderer.setText(renderElement, newValue);
    }
}
/**
 * @param {?} view
 * @param {?} renderElement
 * @param {?} propName
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @param {?} securityContext
 * @return {?}
 */
function checkRenderProperty(view, renderElement, propName, oldValue, newValue, forceUpdate, securityContext) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        let /** @type {?} */ renderValue = securityContext ? view.viewUtils.sanitizer.sanitize(securityContext, newValue) : newValue;
        view.renderer.setElementProperty(renderElement, propName, renderValue);
    }
}
/**
 * @param {?} view
 * @param {?} renderElement
 * @param {?} attrName
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @param {?} securityContext
 * @return {?}
 */
function checkRenderAttribute(view, renderElement, attrName, oldValue, newValue, forceUpdate, securityContext) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        let /** @type {?} */ renderValue = securityContext ? view.viewUtils.sanitizer.sanitize(securityContext, newValue) : newValue;
        renderValue = renderValue != null ? renderValue.toString() : null;
        view.renderer.setElementAttribute(renderElement, attrName, renderValue);
    }
}
/**
 * @param {?} view
 * @param {?} renderElement
 * @param {?} className
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @return {?}
 */
function checkRenderClass(view, renderElement, className, oldValue, newValue, forceUpdate) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        view.renderer.setElementClass(renderElement, className, newValue);
    }
}
/**
 * @param {?} view
 * @param {?} renderElement
 * @param {?} styleName
 * @param {?} unit
 * @param {?} oldValue
 * @param {?} newValue
 * @param {?} forceUpdate
 * @param {?} securityContext
 * @return {?}
 */
function checkRenderStyle(view, renderElement, styleName, unit, oldValue, newValue, forceUpdate, securityContext) {
    if (checkBinding(view, oldValue, newValue, forceUpdate)) {
        let /** @type {?} */ renderValue = securityContext ? view.viewUtils.sanitizer.sanitize(securityContext, newValue) : newValue;
        if (renderValue != null) {
            renderValue = renderValue.toString();
            if (unit != null) {
                renderValue = renderValue + unit;
            }
        }
        else {
            renderValue = null;
        }
        view.renderer.setElementStyle(renderElement, styleName, renderValue);
    }
}
/**
 * @param {?} input
 * @param {?} value
 * @return {?}
 */
function castByValue(input, value) {
    return (input);
}
const /** @type {?} */ EMPTY_ARRAY = [];
const /** @type {?} */ EMPTY_MAP = {};
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy1(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0;
    return (p0) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0)) {
            v0 = p0;
            result = fn(p0);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy2(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0;
    let /** @type {?} */ v1;
    return (p0, p1) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
            v0 = p0;
            v1 = p1;
            result = fn(p0, p1);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy3(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0;
    let /** @type {?} */ v1;
    let /** @type {?} */ v2;
    return (p0, p1, p2) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            result = fn(p0, p1, p2);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy4(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3;
    v0 = v1 = v2 = v3;
    return (p0, p1, p2, p3) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            result = fn(p0, p1, p2, p3);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy5(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4;
    v0 = v1 = v2 = v3 = v4;
    return (p0, p1, p2, p3, p4) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            result = fn(p0, p1, p2, p3, p4);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy6(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5;
    v0 = v1 = v2 = v3 = v4 = v5;
    return (p0, p1, p2, p3, p4, p5) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) ||
            !looseIdentical(v5, p5)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            result = fn(p0, p1, p2, p3, p4, p5);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy7(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6;
    v0 = v1 = v2 = v3 = v4 = v5 = v6;
    return (p0, p1, p2, p3, p4, p5, p6) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) ||
            !looseIdentical(v5, p5) || !looseIdentical(v6, p6)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            result = fn(p0, p1, p2, p3, p4, p5, p6);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy8(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7;
    return (p0, p1, p2, p3, p4, p5, p6, p7) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) ||
            !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy9(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8;
    return (p0, p1, p2, p3, p4, p5, p6, p7, p8) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) ||
            !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7) ||
            !looseIdentical(v8, p8)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
        }
        return result;
    };
}
/**
 * @param {?} fn
 * @return {?}
 */
function pureProxy10(fn) {
    let /** @type {?} */ numberOfChecks = 0;
    let /** @type {?} */ result;
    let /** @type {?} */ v0, /** @type {?} */ v1, /** @type {?} */ v2, /** @type {?} */ v3, /** @type {?} */ v4, /** @type {?} */ v5, /** @type {?} */ v6, /** @type {?} */ v7, /** @type {?} */ v8, /** @type {?} */ v9;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9;
    return (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
        if (!numberOfChecks++ || !looseIdentical(v0, p0) || !looseIdentical(v1, p1) ||
            !looseIdentical(v2, p2) || !looseIdentical(v3, p3) || !looseIdentical(v4, p4) ||
            !looseIdentical(v5, p5) || !looseIdentical(v6, p6) || !looseIdentical(v7, p7) ||
            !looseIdentical(v8, p8) || !looseIdentical(v9, p9)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            v9 = p9;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        }
        return result;
    };
}
/**
 * @param {?} renderer
 * @param {?} el
 * @param {?} changes
 * @return {?}
 */
function setBindingDebugInfoForChanges(renderer, el, changes) {
    Object.keys(changes).forEach((propName) => {
        setBindingDebugInfo(renderer, el, propName, changes[propName].currentValue);
    });
}
/**
 * @param {?} renderer
 * @param {?} el
 * @param {?} propName
 * @param {?} value
 * @return {?}
 */
function setBindingDebugInfo(renderer, el, propName, value) {
    try {
        renderer.setBindingDebugInfo(el, `ng-reflect-${camelCaseToDashCase(propName)}`, value ? value.toString() : null);
    }
    catch (e) {
        renderer.setBindingDebugInfo(el, `ng-reflect-${camelCaseToDashCase(propName)}`, '[ERROR] Exception while trying to serialize the value');
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
 * @param {?} renderer
 * @param {?} parentElement
 * @param {?} name
 * @param {?} attrs
 * @param {?=} debugInfo
 * @return {?}
 */
function createRenderElement(renderer, parentElement, name, attrs, debugInfo) {
    const /** @type {?} */ el = renderer.createElement(parentElement, name, debugInfo);
    for (let /** @type {?} */ i = 0; i < attrs.length; i += 2) {
        renderer.setElementAttribute(el, attrs.get(i), attrs.get(i + 1));
    }
    return el;
}
/**
 * @param {?} renderer
 * @param {?} elementName
 * @param {?} attrs
 * @param {?} rootSelectorOrNode
 * @param {?=} debugInfo
 * @return {?}
 */
function selectOrCreateRenderHostElement(renderer, elementName, attrs, rootSelectorOrNode, debugInfo) {
    let /** @type {?} */ hostElement;
    if (isPresent(rootSelectorOrNode)) {
        hostElement = renderer.selectRootElement(rootSelectorOrNode, debugInfo);
        for (let /** @type {?} */ i = 0; i < attrs.length; i += 2) {
            renderer.setElementAttribute(hostElement, attrs.get(i), attrs.get(i + 1));
        }
        renderer.setElementAttribute(hostElement, 'ng-version', VERSION.full);
    }
    else {
        hostElement = createRenderElement(renderer, null, elementName, attrs, debugInfo);
    }
    return hostElement;
}
/**
 * @param {?} view
 * @param {?} element
 * @param {?} eventNamesAndTargets
 * @param {?} listener
 * @return {?}
 */
function subscribeToRenderElement(view, element, eventNamesAndTargets, listener) {
    const /** @type {?} */ disposables = createEmptyInlineArray(eventNamesAndTargets.length / 2);
    for (let /** @type {?} */ i = 0; i < eventNamesAndTargets.length; i += 2) {
        const /** @type {?} */ eventName = eventNamesAndTargets.get(i);
        const /** @type {?} */ eventTarget = eventNamesAndTargets.get(i + 1);
        let /** @type {?} */ disposable;
        if (eventTarget) {
            disposable = view.renderer.listenGlobal(eventTarget, eventName, listener.bind(view, `${eventTarget}:${eventName}`));
        }
        else {
            disposable = view.renderer.listen(element, eventName, listener.bind(view, eventName));
        }
        disposables.set(i / 2, disposable);
    }
    return disposeInlineArray.bind(null, disposables);
}
/**
 * @param {?} disposables
 * @return {?}
 */
function disposeInlineArray(disposables) {
    for (let /** @type {?} */ i = 0; i < disposables.length; i++) {
        disposables.get(i)();
    }
}
/**
 * @return {?}
 */
function noop() { }
/**
 * @param {?} length
 * @return {?}
 */
function createEmptyInlineArray(length) {
    let /** @type {?} */ ctor;
    if (length <= 2) {
        ctor = InlineArray2;
    }
    else if (length <= 4) {
        ctor = InlineArray4;
    }
    else if (length <= 8) {
        ctor = InlineArray8;
    }
    else if (length <= 16) {
        ctor = InlineArray16;
    }
    else {
        ctor = InlineArrayDynamic;
    }
    return new ctor(length);
}
class InlineArray0 {
    constructor() {
        this.length = 0;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return undefined; }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) { }
}
class InlineArray2 {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     */
    constructor(length, _v0, _v1) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            default:
                return undefined;
        }
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
        }
    }
}
class InlineArray4 {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     */
    constructor(length, _v0, _v1, _v2, _v3) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            default:
                return undefined;
        }
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
        }
    }
}
class InlineArray8 {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     * @param {?=} _v4
     * @param {?=} _v5
     * @param {?=} _v6
     * @param {?=} _v7
     */
    constructor(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
        this._v4 = _v4;
        this._v5 = _v5;
        this._v6 = _v6;
        this._v7 = _v7;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            case 4:
                return this._v4;
            case 5:
                return this._v5;
            case 6:
                return this._v6;
            case 7:
                return this._v7;
            default:
                return undefined;
        }
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
            case 4:
                this._v4 = value;
                break;
            case 5:
                this._v5 = value;
                break;
            case 6:
                this._v6 = value;
                break;
            case 7:
                this._v7 = value;
                break;
        }
    }
}
class InlineArray16 {
    /**
     * @param {?} length
     * @param {?=} _v0
     * @param {?=} _v1
     * @param {?=} _v2
     * @param {?=} _v3
     * @param {?=} _v4
     * @param {?=} _v5
     * @param {?=} _v6
     * @param {?=} _v7
     * @param {?=} _v8
     * @param {?=} _v9
     * @param {?=} _v10
     * @param {?=} _v11
     * @param {?=} _v12
     * @param {?=} _v13
     * @param {?=} _v14
     * @param {?=} _v15
     */
    constructor(length, _v0, _v1, _v2, _v3, _v4, _v5, _v6, _v7, _v8, _v9, _v10, _v11, _v12, _v13, _v14, _v15) {
        this.length = length;
        this._v0 = _v0;
        this._v1 = _v1;
        this._v2 = _v2;
        this._v3 = _v3;
        this._v4 = _v4;
        this._v5 = _v5;
        this._v6 = _v6;
        this._v7 = _v7;
        this._v8 = _v8;
        this._v9 = _v9;
        this._v10 = _v10;
        this._v11 = _v11;
        this._v12 = _v12;
        this._v13 = _v13;
        this._v14 = _v14;
        this._v15 = _v15;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        switch (index) {
            case 0:
                return this._v0;
            case 1:
                return this._v1;
            case 2:
                return this._v2;
            case 3:
                return this._v3;
            case 4:
                return this._v4;
            case 5:
                return this._v5;
            case 6:
                return this._v6;
            case 7:
                return this._v7;
            case 8:
                return this._v8;
            case 9:
                return this._v9;
            case 10:
                return this._v10;
            case 11:
                return this._v11;
            case 12:
                return this._v12;
            case 13:
                return this._v13;
            case 14:
                return this._v14;
            case 15:
                return this._v15;
            default:
                return undefined;
        }
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) {
        switch (index) {
            case 0:
                this._v0 = value;
                break;
            case 1:
                this._v1 = value;
                break;
            case 2:
                this._v2 = value;
                break;
            case 3:
                this._v3 = value;
                break;
            case 4:
                this._v4 = value;
                break;
            case 5:
                this._v5 = value;
                break;
            case 6:
                this._v6 = value;
                break;
            case 7:
                this._v7 = value;
                break;
            case 8:
                this._v8 = value;
                break;
            case 9:
                this._v9 = value;
                break;
            case 10:
                this._v10 = value;
                break;
            case 11:
                this._v11 = value;
                break;
            case 12:
                this._v12 = value;
                break;
            case 13:
                this._v13 = value;
                break;
            case 14:
                this._v14 = value;
                break;
            case 15:
                this._v15 = value;
                break;
        }
    }
}
class InlineArrayDynamic {
    /**
     * @param {?} length
     * @param {...?} values
     */
    constructor(length, ...values) {
        this.length = length;
        this._values = values;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return this._values[index]; }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    set(index, value) { this._values[index] = value; }
}
const /** @type {?} */ EMPTY_INLINE_ARRAY = new InlineArray0();
/**
 * This is a private API only used by the compiler to read the view class.
 * @param {?} componentFactory
 * @return {?}
 */
function getComponentFactoryViewClass(componentFactory) {
    return componentFactory._viewClass;
}

/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 * \@stable
 * @abstract
 */
class ComponentRef {
    /**
     * Location of the Host Element of this Component Instance.
     * @abstract
     * @return {?}
     */
    location() { }
    /**
     * The injector on which the component instance exists.
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * The instance of the Component.
     * @abstract
     * @return {?}
     */
    instance() { }
    /**
     * The {\@link ViewRef} of the Host View of this Component instance.
     * @abstract
     * @return {?}
     */
    hostView() { }
    /**
     * The {\@link ChangeDetectorRef} of the Component instance.
     * @abstract
     * @return {?}
     */
    changeDetectorRef() { }
    /**
     * The component type.
     * @abstract
     * @return {?}
     */
    componentType() { }
    /**
     * Destroys the component instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * Allows to register a callback that will be called when the component is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
}
/**
 * workaround https://github.com/angular/tsickle/issues/350
 * @suppress {checkTypes}
 */
class ComponentRef_ extends ComponentRef {
    /**
     * @param {?} _index
     * @param {?} _parentView
     * @param {?} _nativeElement
     * @param {?} _component
     */
    constructor(_index, _parentView, _nativeElement, _component) {
        super();
        this._index = _index;
        this._parentView = _parentView;
        this._nativeElement = _nativeElement;
        this._component = _component;
    }
    /**
     * @return {?}
     */
    get location() { return new ElementRef(this._nativeElement); }
    /**
     * @return {?}
     */
    get injector() { return this._parentView.injector(this._index); }
    /**
     * @return {?}
     */
    get instance() { return this._component; }
    ;
    /**
     * @return {?}
     */
    get hostView() { return this._parentView.ref; }
    ;
    /**
     * @return {?}
     */
    get changeDetectorRef() { return this._parentView.ref; }
    ;
    /**
     * @return {?}
     */
    get componentType() { return (this._component.constructor); }
    /**
     * @return {?}
     */
    destroy() { this._parentView.detachAndDestroy(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this.hostView.onDestroy(callback); }
}
/**
 * \@stable
 */
class ComponentFactory {
    /**
     * @param {?} selector
     * @param {?} _viewClass
     * @param {?} componentType
     */
    constructor(selector, _viewClass, componentType) {
        this.selector = selector;
        this.componentType = componentType;
        this._viewClass = _viewClass;
    }
    /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    create(injector, projectableNodes = null, rootSelectorOrNode = null) {
        const /** @type {?} */ vu = injector.get(ViewUtils);
        if (!projectableNodes) {
            projectableNodes = [];
        }
        const /** @type {?} */ hostView = new this._viewClass(vu, null, null, null);
        return hostView.createHostView(rootSelectorOrNode, injector, projectableNodes);
    }
}

/**
 * @param {?} component
 * @return {?}
 */
function noComponentFactoryError(component) {
    const /** @type {?} */ error = Error(`No component factory found for ${stringify(component)}. Did you add it to @NgModule.entryComponents?`);
    ((error))[ERROR_COMPONENT] = component;
    return error;
}
const /** @type {?} */ ERROR_COMPONENT = 'ngComponent';
class _NullComponentFactoryResolver {
    /**
     * @param {?} component
     * @return {?}
     */
    resolveComponentFactory(component) {
        throw noComponentFactoryError(component);
    }
}
/**
 * \@stable
 * @abstract
 */
class ComponentFactoryResolver {
    /**
     * @abstract
     * @param {?} component
     * @return {?}
     */
    resolveComponentFactory(component) { }
}
ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
class CodegenComponentFactoryResolver {
    /**
     * @param {?} factories
     * @param {?} _parent
     */
    constructor(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (let i = 0; i < factories.length; i++) {
            const factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @param {?} component
     * @return {?}
     */
    resolveComponentFactory(component) {
        let /** @type {?} */ result = this._factories.get(component);
        if (!result) {
            result = this._parent.resolveComponentFactory(component);
        }
        return result;
    }
}

let /** @type {?} */ trace;
let /** @type {?} */ events;
/**
 * @return {?}
 */
function detectWTF() {
    const /** @type {?} */ wtf = ((global$1) /** TODO #9100 */)['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
/**
 * @param {?} signature
 * @param {?=} flags
 * @return {?}
 */
function createScope(signature, flags = null) {
    return events.createScope(signature, flags);
}
/**
 * @param {?} scope
 * @param {?=} returnValue
 * @return {?}
 */
function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
/**
 * @param {?} rangeType
 * @param {?} action
 * @return {?}
 */
function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
/**
 * @param {?} range
 * @return {?}
 */
function endTimeRange(range) {
    trace.endTimeRange(range);
}

/**
 * True if WTF is enabled.
 */
const /** @type {?} */ wtfEnabled = detectWTF();
/**
 * @param {?=} arg0
 * @param {?=} arg1
 * @return {?}
 */
function noopScope(arg0, arg1) {
    return null;
}
/**
 * Create trace scope.
 *
 * Scopes must be strictly nested and are analogous to stack frames, but
 * do not have to follow the stack frames. Instead it is recommended that they follow logical
 * nesting. You may want to use
 * [Event
 * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
 * as they are defined in WTF.
 *
 * Used to mark scope entry. The return value is used to leave the scope.
 *
 *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
 *
 *     someMethod() {
 *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
 *        // DO SOME WORK HERE
 *        return wtfLeave(s, 123); // Return value 123
 *     }
 *
 * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
 * negatively impact the performance of your application. For this reason we recommend that
 * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
 * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
 * exception, will produce incorrect trace, but presence of exception signifies logic error which
 * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
 * an exception is expected during normal execution while profiling.
 *
 * @experimental
 */
const /** @type {?} */ wtfCreateScope = wtfEnabled ? createScope : (signature, flags) => noopScope;
/**
 * Used to mark end of Scope.
 *
 * - `scope` to end.
 * - `returnValue` (optional) to be passed to the WTF.
 *
 * Returns the `returnValue for easy chaining.
 * @experimental
 */
const /** @type {?} */ wtfLeave = wtfEnabled ? leave : (s, r) => r;
/**
 * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
 * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
 * enabled.
 *
 *     someMethod() {
 *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
 *        var future = new Future.delay(5).then((_) {
 *          wtfEndTimeRange(s);
 *        });
 *     }
 * @experimental
 */
const /** @type {?} */ wtfStartTimeRange = wtfEnabled ? startTimeRange : (rangeType, action) => null;
/**
 * Ends a async time range operation.
 * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
 * enabled.
 * @experimental
 */
const /** @type {?} */ wtfEndTimeRange = wtfEnabled ? endTimeRange : (r) => null;

/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * \@experimental
 */
class Testability {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        /** @internal */
        this._pendingCount = 0;
        /** @internal */
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        this._watchAngularEvents();
    }
    /**
     * \@internal
     * @return {?}
     */
    _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
            next: () => {
                this._didWork = true;
                this._isZoneStable = false;
            }
        });
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
                next: () => {
                    NgZone.assertNotInAngularZone();
                    scheduleMicroTask(() => {
                        this._isZoneStable = true;
                        this._runCallbacksIfReady();
                    });
                }
            });
        });
    }
    /**
     * @return {?}
     */
    increasePendingRequestCount() {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    }
    /**
     * @return {?}
     */
    decreasePendingRequestCount() {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new Error('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    }
    /**
     * @return {?}
     */
    isStable() {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    }
    /**
     * \@internal
     * @return {?}
     */
    _runCallbacksIfReady() {
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            scheduleMicroTask(() => {
                while (this._callbacks.length !== 0) {
                    (this._callbacks.pop())(this._didWork);
                }
                this._didWork = false;
            });
        }
        else {
            // Not Ready
            this._didWork = true;
        }
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    whenStable(callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    }
    /**
     * @return {?}
     */
    getPendingRequestCount() { return this._pendingCount; }
    /**
     * @deprecated use findProviders
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findBindings(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findProviders(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
}
Testability.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Testability.ctorParameters = () => [
    { type: NgZone, },
];
/**
 * A global registry of {\@link Testability} instances for specific elements.
 * \@experimental
 */
class TestabilityRegistry {
    constructor() {
        /** @internal */
        this._applications = new Map();
        _testabilityGetter.addToWindow(this);
    }
    /**
     * @param {?} token
     * @param {?} testability
     * @return {?}
     */
    registerApplication(token, testability) {
        this._applications.set(token, testability);
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    getTestability(elem) { return this._applications.get(elem); }
    /**
     * @return {?}
     */
    getAllTestabilities() { return Array.from(this._applications.values()); }
    /**
     * @return {?}
     */
    getAllRootElements() { return Array.from(this._applications.keys()); }
    /**
     * @param {?} elem
     * @param {?=} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(elem, findInAncestors = true) {
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    }
}
TestabilityRegistry.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TestabilityRegistry.ctorParameters = () => [];
class _NoopGetTestability {
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) { }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        return null;
    }
}
/**
 * Set the {\@link GetTestability} implementation used by the Angular testing framework.
 * \@experimental
 * @param {?} getter
 * @return {?}
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
let /** @type {?} */ _testabilityGetter = new _NoopGetTestability();

let /** @type {?} */ _devMode = true;
let /** @type {?} */ _runModeLocked = false;
let /** @type {?} */ _platform;
const /** @type {?} */ ALLOW_MULTIPLE_PLATFORMS = new InjectionToken('AllowMultipleToken');
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * \@stable
 * @return {?}
 */
function enableProdMode() {
    if (_runModeLocked) {
        throw new Error('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * \@experimental
 */
class NgProbeToken {
    /**
     * @param {?} name
     * @param {?} token
     */
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} injector
 * @return {?}
 */
function createPlatform(injector) {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const /** @type {?} */ inits = injector.get(PLATFORM_INITIALIZER, null);
    if (inits)
        inits.forEach(init => init());
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} parentPlatformFactory
 * @param {?} name
 * @param {?=} providers
 * @return {?}
 */
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
    const /** @type {?} */ marker = new InjectionToken(`Platform: ${name}`);
    return (extraProviders = []) => {
        let /** @type {?} */ platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Checks that there currently is a platform which contains the given token as a provider.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @param {?} requiredToken
 * @return {?}
 */
function assertPlatform(requiredToken) {
    const /** @type {?} */ platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Destroy the existing platform.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function destroyPlatform() {
    if (_platform && !_platform.destroyed) {
        _platform.destroy();
    }
}
/**
 * Returns the current platform.
 *
 * \@experimental APIs related to application bootstrap are currently under review.
 * @return {?}
 */
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {\@link bootstrap}() is called, or
 * explicitly by calling {\@link createPlatform}().
 *
 * \@stable
 * @abstract
 */
class PlatformRef {
    /**
     * Creates an instance of an `\@NgModule` for the given platform
     * for offline compilation.
     *
     * ## Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * \@NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {platformBrowser} from '\@angular/platform-browser';
     *
     * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     *
     * \@experimental APIs related to application bootstrap are currently under review.
     * @abstract
     * @param {?} moduleFactory
     * @return {?}
     */
    bootstrapModuleFactory(moduleFactory) { }
    /**
     * Creates an instance of an `\@NgModule` for a given platform using the given runtime compiler.
     *
     * ## Simple Example
     *
     * ```typescript
     * \@NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     * \@stable
     * @abstract
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @return {?}
     */
    bootstrapModule(moduleType, compilerOptions) { }
    /**
     * Register a listener to be called when the platform is disposed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
    /**
     * Retrieve the platform {\@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    destroyed() { }
}
/**
 * @param {?} errorHandler
 * @param {?} callback
 * @return {?}
 */
function _callAndReportToErrorHandler(errorHandler, callback) {
    try {
        const /** @type {?} */ result = callback();
        if (isPromise(result)) {
            return result.catch((e) => {
                errorHandler.handleError(e);
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        return result;
    }
    catch (e) {
        errorHandler.handleError(e);
        // rethrow as the exception handler might not do it
        throw e;
    }
}
/**
 * workaround https://github.com/angular/tsickle/issues/350
 * @suppress {checkTypes}
 */
class PlatformRef_ extends PlatformRef {
    /**
     * @param {?} _injector
     */
    constructor(_injector) {
        super();
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._destroyListeners.push(callback); }
    /**
     * @return {?}
     */
    get injector() { return this._injector; }
    /**
     * @return {?}
     */
    get destroyed() { return this._destroyed; }
    /**
     * @return {?}
     */
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
    /**
     * @param {?} moduleFactory
     * @return {?}
     */
    bootstrapModuleFactory(moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
    }
    /**
     * @param {?} moduleFactory
     * @param {?} ngZone
     * @return {?}
     */
    _bootstrapModuleFactoryWithZone(moduleFactory, ngZone) {
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        if (!ngZone)
            ngZone = new NgZone({ enableLongStackTrace: isDevMode() });
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(() => {
            const /** @type {?} */ ngZoneInjector = ReflectiveInjector.resolveAndCreate([{ provide: NgZone, useValue: ngZone }], this.injector);
            const /** @type {?} */ moduleRef = (moduleFactory.create(ngZoneInjector));
            const /** @type {?} */ exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
            if (!exceptionHandler) {
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(() => ListWrapper.remove(this._modules, moduleRef));
            ngZone.onError.subscribe({ next: (error) => { exceptionHandler.handleError(error); } });
            return _callAndReportToErrorHandler(exceptionHandler, () => {
                const /** @type {?} */ initStatus = moduleRef.injector.get(ApplicationInitStatus);
                return initStatus.donePromise.then(() => {
                    this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    }
    /**
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @return {?}
     */
    bootstrapModule(moduleType, compilerOptions = []) {
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
    }
    /**
     * @param {?} moduleType
     * @param {?=} compilerOptions
     * @param {?=} ngZone
     * @return {?}
     */
    _bootstrapModuleWithZone(moduleType, compilerOptions = [], ngZone = null) {
        const /** @type {?} */ compilerFactory = this.injector.get(CompilerFactory);
        const /** @type {?} */ compiler = compilerFactory.createCompiler(Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);
        return compiler.compileModuleAsync(moduleType)
            .then((moduleFactory) => this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone));
    }
    /**
     * @param {?} moduleRef
     * @return {?}
     */
    _moduleDoBootstrap(moduleRef) {
        const /** @type {?} */ appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
            moduleRef.bootstrapFactories.forEach((compFactory) => appRef.bootstrap(compFactory));
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new Error(`The module ${stringify(moduleRef.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                `Please define one of these.`);
        }
        this._modules.push(moduleRef);
    }
}
PlatformRef_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformRef_.ctorParameters = () => [
    { type: Injector, },
];
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {\@link bootstrap}.
 *
 * \@stable
 * @abstract
 */
class ApplicationRef {
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * ### Example
     * {\@example core/ts/platform/platform.ts region='longform'}
     * @abstract
     * @param {?} componentFactory
     * @return {?}
     */
    bootstrap(componentFactory) { }
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     * @abstract
     * @return {?}
     */
    tick() { }
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     * @abstract
     * @return {?}
     */
    componentTypes() { }
    /**
     * Get a list of components registered to this application.
     * @abstract
     * @return {?}
     */
    components() { }
    /**
     * Attaches a view so that it will be dirty checked.
     * The view will be automatically detached when it is destroyed.
     * This will throw if the view is already attached to a ViewContainer.
     * @abstract
     * @param {?} view
     * @return {?}
     */
    attachView(view) { }
    /**
     * Detaches a view from dirty checking again.
     * @abstract
     * @param {?} view
     * @return {?}
     */
    detachView(view) { }
    /**
     * Returns the number of attached views.
     * @abstract
     * @return {?}
     */
    viewCount() { }
    /**
     * Returns an Observable that indicates when the application is stable or unstable.
     * @abstract
     * @return {?}
     */
    isStable() { }
}
/**
 * workaround https://github.com/angular/tsickle/issues/350
 * @suppress {checkTypes}
 */
class ApplicationRef_ extends ApplicationRef {
    /**
     * @param {?} _zone
     * @param {?} _console
     * @param {?} _injector
     * @param {?} _exceptionHandler
     * @param {?} _componentFactoryResolver
     * @param {?} _initStatus
     * @param {?} _testabilityRegistry
     * @param {?} _testability
     */
    constructor(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        super();
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        this._bootstrapListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._views = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._stable = true;
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({ next: () => { this._zone.run(() => { this.tick(); }); } });
        const isCurrentlyStable = new Observable((observer) => {
            this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks &&
                !this._zone.hasPendingMicrotasks;
            this._zone.runOutsideAngular(() => {
                observer.next(this._stable);
                observer.complete();
            });
        });
        const isStable = new Observable((observer) => {
            const stableSub = this._zone.onStable.subscribe(() => {
                NgZone.assertNotInAngularZone();
                // Check whether there are no pending macro/micro tasks in the next tick
                // to allow for NgZone to update the state.
                scheduleMicroTask(() => {
                    if (!this._stable && !this._zone.hasPendingMacrotasks &&
                        !this._zone.hasPendingMicrotasks) {
                        this._stable = true;
                        observer.next(true);
                    }
                });
            });
            const unstableSub = this._zone.onUnstable.subscribe(() => {
                NgZone.assertInAngularZone();
                if (this._stable) {
                    this._stable = false;
                    this._zone.runOutsideAngular(() => { observer.next(false); });
                }
            });
            return () => {
                stableSub.unsubscribe();
                unstableSub.unsubscribe();
            };
        });
        this._isStable = merge(isCurrentlyStable, share.call(isStable));
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    attachView(viewRef) {
        const /** @type {?} */ view = ((viewRef));
        this._views.push(view);
        view.attachToAppRef(this);
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    detachView(viewRef) {
        const /** @type {?} */ view = ((viewRef));
        ListWrapper.remove(this._views, view);
        view.detachFromContainer();
    }
    /**
     * @param {?} componentOrFactory
     * @return {?}
     */
    bootstrap(componentOrFactory) {
        if (!this._initStatus.done) {
            throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        let /** @type {?} */ componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        const /** @type {?} */ compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(() => { this._unloadComponent(compRef); });
        const /** @type {?} */ testability = compRef.injector.get(Testability, null);
        if (testability) {
            compRef.injector.get(TestabilityRegistry)
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log(`Angular is running in the development mode. Call enableProdMode() to enable the production mode.`);
        }
        return compRef;
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    _loadComponent(componentRef) {
        this.attachView(componentRef.hostView);
        this.tick();
        this._rootComponents.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        const /** @type {?} */ listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
        listeners.forEach((listener) => listener(componentRef));
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    _unloadComponent(componentRef) {
        this.detachView(componentRef.hostView);
        ListWrapper.remove(this._rootComponents, componentRef);
    }
    /**
     * @return {?}
     */
    tick() {
        if (this._runningTick) {
            throw new Error('ApplicationRef.tick is called recursively');
        }
        const /** @type {?} */ scope = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._views.forEach((view) => view.detectChanges());
            if (this._enforceNoNewChanges) {
                this._views.forEach((view) => view.checkNoChanges());
            }
        }
        finally {
            this._runningTick = false;
            wtfLeave(scope);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // TODO(alxhub): Dispose of the NgZone.
        this._views.slice().forEach((view) => view.destroy());
    }
    /**
     * @return {?}
     */
    get viewCount() { return this._views.length; }
    /**
     * @return {?}
     */
    get componentTypes() { return this._rootComponentTypes; }
    /**
     * @return {?}
     */
    get components() { return this._rootComponents; }
    /**
     * @return {?}
     */
    get isStable() { return this._isStable; }
}
/** @internal */
ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
ApplicationRef_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ApplicationRef_.ctorParameters = () => [
    { type: NgZone, },
    { type: Console, },
    { type: Injector, },
    { type: ErrorHandler, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationInitStatus, },
    { type: TestabilityRegistry, decorators: [{ type: Optional },] },
    { type: Testability, decorators: [{ type: Optional },] },
];

/**
 * Represents an instance of an NgModule created via a {\@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * \@stable
 * @abstract
 */
class NgModuleRef {
    /**
     * The injector that contains all of the providers of the NgModule.
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * The ComponentFactoryResolver to get hold of the ComponentFactories
     * declared in the `entryComponents` property of the module.
     * @abstract
     * @return {?}
     */
    componentFactoryResolver() { }
    /**
     * The NgModule instance.
     * @abstract
     * @return {?}
     */
    instance() { }
    /**
     * Destroys the module instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * Allows to register a callback that will be called when the module is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
}
/**
 * \@experimental
 */
class NgModuleFactory {
    /**
     * @param {?} _injectorClass
     * @param {?} _moduleType
     */
    constructor(_injectorClass, _moduleType) {
        this._injectorClass = _injectorClass;
        this._moduleType = _moduleType;
    }
    /**
     * @return {?}
     */
    get moduleType() { return this._moduleType; }
    /**
     * @param {?} parentInjector
     * @return {?}
     */
    create(parentInjector) {
        if (!parentInjector) {
            parentInjector = Injector.NULL;
        }
        const /** @type {?} */ instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
    }
}
const /** @type {?} */ _UNDEFINED = new Object();
/**
 * @abstract
 */
class NgModuleInjector extends CodegenComponentFactoryResolver {
    /**
     * @param {?} parent
     * @param {?} factories
     * @param {?} bootstrapFactories
     */
    constructor(parent, factories, bootstrapFactories) {
        super(factories, parent.get(ComponentFactoryResolver, ComponentFactoryResolver.NULL));
        this.parent = parent;
        this.bootstrapFactories = bootstrapFactories;
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * @return {?}
     */
    create() { this.instance = this.createInternal(); }
    /**
     * @abstract
     * @return {?}
     */
    createInternal() { }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        if (token === Injector || token === ComponentFactoryResolver) {
            return this;
        }
        const /** @type {?} */ result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
    }
    /**
     * @abstract
     * @param {?} token
     * @param {?} notFoundValue
     * @return {?}
     */
    getInternal(token, notFoundValue) { }
    /**
     * @return {?}
     */
    get injector() { return this; }
    /**
     * @return {?}
     */
    get componentFactoryResolver() { return this; }
    /**
     * @return {?}
     */
    destroy() {
        if (this._destroyed) {
            throw new Error(`The ng module ${stringify(this.instance.constructor)} has already been destroyed.`);
        }
        this._destroyed = true;
        this.destroyInternal();
        this._destroyListeners.forEach((listener) => listener());
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._destroyListeners.push(callback); }
    /**
     * @abstract
     * @return {?}
     */
    destroyInternal() { }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used to load ng module factories.
 * \@stable
 * @abstract
 */
class NgModuleFactoryLoader {
    /**
     * @abstract
     * @param {?} path
     * @return {?}
     */
    load(path) { }
}
let /** @type {?} */ moduleFactories = new Map();
/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * \@experimental
 * @param {?} id
 * @param {?} factory
 * @return {?}
 */
function registerModuleFactory(id, factory) {
    const /** @type {?} */ existing = moduleFactories.get(id);
    if (existing) {
        throw new Error(`Duplicate module registered for ${id} - ${existing.moduleType.name} vs ${factory.moduleType.name}`);
    }
    moduleFactories.set(id, factory);
}
/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * \@experimental
 * @param {?} id
 * @return {?}
 */
function getModuleFactory(id) {
    const /** @type {?} */ factory = moduleFactories.get(id);
    if (!factory)
        throw new Error(`No module with ID ${id} loaded`);
    return factory;
}

/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {\@link Query} and {\@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```typescript
 * \@Component({...})
 * class Container {
 *   \@ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 * \@stable
 */
class QueryList {
    constructor() {
        this._dirty = true;
        this._results = [];
        this._emitter = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get changes() { return this._emitter; }
    /**
     * @return {?}
     */
    get length() { return this._results.length; }
    /**
     * @return {?}
     */
    get first() { return this._results[0]; }
    /**
     * @return {?}
     */
    get last() { return this._results[this.length - 1]; }
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @param {?} fn
     * @return {?}
     */
    map(fn) { return this._results.map(fn); }
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    filter(fn) {
        return this._results.filter(fn);
    }
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    find(fn) { return this._results.find(fn); }
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    reduce(fn, init) {
        return this._results.reduce(fn, init);
    }
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) { this._results.forEach(fn); }
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    some(fn) {
        return this._results.some(fn);
    }
    /**
     * @return {?}
     */
    toArray() { return this._results.slice(); }
    /**
     * @return {?}
     */
    [getSymbolIterator()]() { return ((this._results))[getSymbolIterator()](); }
    /**
     * @return {?}
     */
    toString() { return this._results.toString(); }
    /**
     * @param {?} res
     * @return {?}
     */
    reset(res) {
        this._results = ListWrapper.flatten(res);
        this._dirty = false;
    }
    /**
     * @return {?}
     */
    notifyOnChanges() { this._emitter.emit(this); }
    /**
     * internal
     * @return {?}
     */
    setDirty() { this._dirty = true; }
    /**
     * internal
     * @return {?}
     */
    get dirty() { return this._dirty; }
}

const /** @type {?} */ _SEPARATOR = '#';
const /** @type {?} */ FACTORY_CLASS_SUFFIX = 'NgFactory';
/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * \@experimental
 * @abstract
 */
class SystemJsNgModuleLoaderConfig {
}
const /** @type {?} */ DEFAULT_CONFIG = {
    factoryPathPrefix: '',
    factoryPathSuffix: '.ngfactory',
};
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * \@experimental
 */
class SystemJsNgModuleLoader {
    /**
     * @param {?} _compiler
     * @param {?=} config
     */
    constructor(_compiler, config) {
        this._compiler = _compiler;
        this._config = config || DEFAULT_CONFIG;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    load(path) {
        const /** @type {?} */ offlineMode = this._compiler instanceof Compiler;
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    loadAndCompile(path) {
        let [module, exportName] = path.split(_SEPARATOR);
        if (exportName === undefined) {
            exportName = 'default';
        }
        return System.import(module)
            .then((module) => module[exportName])
            .then((type) => checkNotEmpty(type, module, exportName))
            .then((type) => this._compiler.compileModuleAsync(type));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    loadFactory(path) {
        let [module, exportName] = path.split(_SEPARATOR);
        let /** @type {?} */ factoryClassSuffix = FACTORY_CLASS_SUFFIX;
        if (exportName === undefined) {
            exportName = 'default';
            factoryClassSuffix = '';
        }
        return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
            .then((module) => module[exportName + factoryClassSuffix])
            .then((factory) => checkNotEmpty(factory, module, exportName));
    }
}
SystemJsNgModuleLoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SystemJsNgModuleLoader.ctorParameters = () => [
    { type: Compiler, },
    { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional },] },
];
/**
 * @param {?} value
 * @param {?} modulePath
 * @param {?} exportName
 * @return {?}
 */
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
    }
    return value;
}

/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
 * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
 * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
 * `TemplateRef` from a Component or a Directive via {\@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use
 * {\@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
 * View Container.
 * \@stable
 * @abstract
 */
class TemplateRef {
    /**
     * @abstract
     * @return {?}
     */
    elementRef() { }
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    createEmbeddedView(context) { }
}
/**
 * workaround https://github.com/angular/tsickle/issues/350
 * @suppress {checkTypes}
 */
class TemplateRef_ extends TemplateRef {
    /**
     * @param {?} _parentView
     * @param {?} _nodeIndex
     * @param {?} _nativeElement
     */
    constructor(_parentView, _nodeIndex, _nativeElement) {
        super();
        this._parentView = _parentView;
        this._nodeIndex = _nodeIndex;
        this._nativeElement = _nativeElement;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createEmbeddedView(context) {
        const /** @type {?} */ view = this._parentView.createEmbeddedViewInternal(this._nodeIndex);
        view.create(context || ({}));
        return view.ref;
    }
    /**
     * @return {?}
     */
    get elementRef() { return new ElementRef(this._nativeElement); }
}

/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {\@link Component} via {\@link #createComponent}, and Embedded Views, created by instantiating an
 * {\@link TemplateRef Embedded Template} via {\@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {\@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {\@link ViewChild} query.
 * \@stable
 * @abstract
 */
class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing View.
     * <!-- TODO: rename to anchorElement -->
     * @abstract
     * @return {?}
     */
    element() { }
    /**
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * @abstract
     * @return {?}
     */
    parentInjector() { }
    /**
     * Destroys all Views in this container.
     * @abstract
     * @return {?}
     */
    clear() { }
    /**
     * Returns the {\@link ViewRef} for the View located in this container at the specified index.
     * @abstract
     * @param {?} index
     * @return {?}
     */
    get(index) { }
    /**
     * Returns the number of Views currently attached to this container.
     * @abstract
     * @return {?}
     */
    length() { }
    /**
     * Instantiates an Embedded View based on the {\@link TemplateRef `templateRef`} and inserts it
     * into this container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the {\@link ViewRef} for the newly created View.
     * @abstract
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) { }
    /**
     * Instantiates a single {\@link Component} and inserts its Host View into this container at the
     * specified `index`.
     *
     * The component is instantiated using its {\@link ComponentFactory} which can be
     * obtained via {\@link ComponentFactoryResolver#resolveComponentFactory}.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * You can optionally specify the {\@link Injector} that will be used as parent for the Component.
     *
     * Returns the {\@link ComponentRef} of the Host View created for the newly instantiated Component.
     * @abstract
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createComponent(componentFactory, index, injector, projectableNodes) { }
    /**
     * Inserts a View identified by a {\@link ViewRef} into the container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the inserted {\@link ViewRef}.
     * @abstract
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index) { }
    /**
     * Moves a View identified by a {\@link ViewRef} into the container at the specified `index`.
     *
     * Returns the inserted {\@link ViewRef}.
     * @abstract
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    move(viewRef, currentIndex) { }
    /**
     * Returns the index of the View, specified via {\@link ViewRef}, within the current container or
     * `-1` if this container doesn't contain the View.
     * @abstract
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) { }
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    remove(index) { }
    /**
     * Use along with {\@link #insert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last {\@link ViewRef} is detached.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    detach(index) { }
}
class ViewContainerRef_ {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        /** @internal */
        this._createComponentInContainerScope = wtfCreateScope('ViewContainerRef#createComponent()');
        /** @internal */
        this._insertScope = wtfCreateScope('ViewContainerRef#insert()');
        /** @internal */
        this._removeScope = wtfCreateScope('ViewContainerRef#remove()');
        /** @internal */
        this._detachScope = wtfCreateScope('ViewContainerRef#detach()');
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return this._element.nestedViews[index].ref; }
    /**
     * @return {?}
     */
    get length() {
        const /** @type {?} */ views = this._element.nestedViews;
        return views ? views.length : 0;
    }
    /**
     * @return {?}
     */
    get element() { return this._element.elementRef; }
    /**
     * @return {?}
     */
    get injector() { return this._element.injector; }
    /**
     * @return {?}
     */
    get parentInjector() { return this._element.parentInjector; }
    /**
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context = null, index = -1) {
        const /** @type {?} */ viewRef = templateRef.createEmbeddedView(context);
        this.insert(viewRef, index);
        return viewRef;
    }
    /**
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createComponent(componentFactory, index = -1, injector = null, projectableNodes = null) {
        const /** @type {?} */ s = this._createComponentInContainerScope();
        const /** @type {?} */ contextInjector = injector || this._element.parentInjector;
        const /** @type {?} */ componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return wtfLeave(s, componentRef);
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index = -1) {
        const /** @type {?} */ s = this._insertScope();
        if (index == -1)
            index = this.length;
        const /** @type {?} */ viewRef_ = (viewRef);
        this._element.attachView(viewRef_.internalView, index);
        return wtfLeave(s, viewRef_);
    }
    /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    move(viewRef, currentIndex) {
        const /** @type {?} */ s = this._insertScope();
        if (currentIndex == -1)
            return;
        const /** @type {?} */ viewRef_ = (viewRef);
        this._element.moveView(viewRef_.internalView, currentIndex);
        return wtfLeave(s, viewRef_);
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) {
        return this.length ? this._element.nestedViews.indexOf(((viewRef)).internalView) :
            -1;
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index = -1) {
        const /** @type {?} */ s = this._removeScope();
        if (index == -1)
            index = this.length - 1;
        const /** @type {?} */ view = this._element.detachView(index);
        view.destroy();
        // view is intentionally not returned to the client.
        wtfLeave(s);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index = -1) {
        const /** @type {?} */ s = this._detachScope();
        if (index == -1)
            index = this.length - 1;
        const /** @type {?} */ view = this._element.detachView(index);
        return wtfLeave(s, view.ref);
    }
    /**
     * @return {?}
     */
    clear() {
        for (let /** @type {?} */ i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    }
}

/**
 * \@stable
 * @abstract
 */
class ViewRef extends ChangeDetectorRef {
    /**
     * Destroys the view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    destroyed() { }
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
}
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {\@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {\@link TemplateRef}s:
 *
 * Outer {\@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ngFor let-item [ngForOf]="items"></template>
 * </ul>
 * ```
 *
 * Inner {\@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {\@link TemplateRef}s.
 *
 * The outer/inner {\@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 */
class EmbeddedViewRef extends ViewRef {
    /**
     * @abstract
     * @return {?}
     */
    context() { }
    /**
     * @abstract
     * @return {?}
     */
    rootNodes() { }
}
class ViewRef_ {
    /**
     * @param {?} _view
     * @param {?} animationQueue
     */
    constructor(_view, animationQueue) {
        this._view = _view;
        this.animationQueue = animationQueue;
        this._view = _view;
        this._originalMode = this._view.cdMode;
    }
    /**
     * @return {?}
     */
    get internalView() { return this._view; }
    /**
     * @return {?}
     */
    get rootNodes() { return this._view.flatRootNodes; }
    /**
     * @return {?}
     */
    get context() { return this._view.context; }
    /**
     * @return {?}
     */
    get destroyed() { return this._view.destroyed; }
    /**
     * @return {?}
     */
    markForCheck() { this._view.markPathToRootAsCheckOnce(); }
    /**
     * @return {?}
     */
    detach() { this._view.cdMode = ChangeDetectorStatus.Detached; }
    /**
     * @return {?}
     */
    detectChanges() {
        this._view.detectChanges(false);
        this.animationQueue.flush();
    }
    /**
     * @return {?}
     */
    checkNoChanges() { this._view.detectChanges(true); }
    /**
     * @return {?}
     */
    reattach() {
        this._view.cdMode = this._originalMode;
        this.markForCheck();
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(callback);
    }
    /**
     * @return {?}
     */
    destroy() { this._view.detachAndDestroy(); }
    /**
     * @return {?}
     */
    detachFromContainer() { this._view.detach(); }
    /**
     * @param {?} appRef
     * @return {?}
     */
    attachToAppRef(appRef) { this._view.attachToAppRef(appRef); }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class EventListener {
    /**
     * @param {?} name
     * @param {?} callback
     */
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    ;
}
/**
 * \@experimental All debugging apis are currently experimental.
 */
class DebugNode {
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    constructor(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (parent && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
    }
    /**
     * @return {?}
     */
    get injector() { return this._debugInfo ? this._debugInfo.injector : null; }
    /**
     * @return {?}
     */
    get componentInstance() { return this._debugInfo ? this._debugInfo.component : null; }
    /**
     * @return {?}
     */
    get context() { return this._debugInfo ? this._debugInfo.context : null; }
    /**
     * @return {?}
     */
    get references() {
        return this._debugInfo ? this._debugInfo.references : null;
    }
    /**
     * @return {?}
     */
    get providerTokens() { return this._debugInfo ? this._debugInfo.providerTokens : null; }
    /**
     * @return {?}
     */
    get source() { return this._debugInfo ? this._debugInfo.source : null; }
}
/**
 * \@experimental All debugging apis are currently experimental.
 */
class DebugElement extends DebugNode {
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    constructor(nativeNode, parent, _debugInfo) {
        super(nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.classes = {};
        this.styles = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChild(child) {
        if (child) {
            this.childNodes.push(child);
            child.parent = this;
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    removeChild(child) {
        const /** @type {?} */ childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    }
    /**
     * @param {?} child
     * @param {?} newChildren
     * @return {?}
     */
    insertChildrenAfter(child, newChildren) {
        const /** @type {?} */ siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            this.childNodes.splice(siblingIndex + 1, 0, ...newChildren);
            newChildren.forEach(c => {
                if (c.parent) {
                    c.parent.removeChild(c);
                }
                c.parent = this;
            });
        }
    }
    /**
     * @param {?} refChild
     * @param {?} newChild
     * @return {?}
     */
    insertBefore(refChild, newChild) {
        const /** @type {?} */ refIndex = this.childNodes.indexOf(refChild);
        if (refIndex === -1) {
            this.addChild(newChild);
        }
        else {
            if (newChild.parent) {
                newChild.parent.removeChild(newChild);
            }
            newChild.parent = this;
            this.childNodes.splice(refIndex, 0, newChild);
        }
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    query(predicate) {
        const /** @type {?} */ results = this.queryAll(predicate);
        return results[0] || null;
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    queryAll(predicate) {
        const /** @type {?} */ matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    queryAllNodes(predicate) {
        const /** @type {?} */ matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    }
    /**
     * @return {?}
     */
    get children() {
        return (this.childNodes.filter((node) => node instanceof DebugElement));
    }
    /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    triggerEventHandler(eventName, eventObj) {
        this.listeners.forEach((listener) => {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    }
}
/**
 * \@experimental
 * @param {?} debugEls
 * @return {?}
 */
function asNativeElements(debugEls) {
    return debugEls.map((el) => el.nativeElement);
}
/**
 * @param {?} element
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(node => {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
/**
 * @param {?} parentNode
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(node => {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
const /** @type {?} */ _nativeNodeToDebugNode = new Map();
/**
 * \@experimental
 * @param {?} nativeNode
 * @return {?}
 */
function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}
/**
 * @param {?} node
 * @return {?}
 */
function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
/**
 * @param {?} node
 * @return {?}
 */
function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}

/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
class AnimationPlayer {
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { }
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { }
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { }
    /**
     * @abstract
     * @return {?}
     */
    init() { }
    /**
     * @abstract
     * @return {?}
     */
    hasStarted() { }
    /**
     * @abstract
     * @return {?}
     */
    play() { }
    /**
     * @abstract
     * @return {?}
     */
    pause() { }
    /**
     * @abstract
     * @return {?}
     */
    restart() { }
    /**
     * @abstract
     * @return {?}
     */
    finish() { }
    /**
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    reset() { }
    /**
     * @abstract
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { }
    /**
     * @abstract
     * @return {?}
     */
    getPosition() { }
    /**
     * @return {?}
     */
    get parentPlayer() { throw new Error('NOT IMPLEMENTED: Base Class'); }
    /**
     * @param {?} player
     * @return {?}
     */
    set parentPlayer(player) { throw new Error('NOT IMPLEMENTED: Base Class'); }
}
class NoOpAnimationPlayer {
    constructor() {
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this._destroyed = false;
        this._finished = false;
        this.parentPlayer = null;
        scheduleMicroTask(() => this._onFinish());
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    init() { }
    /**
     * @return {?}
     */
    play() {
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
        }
        this._started = true;
    }
    /**
     * @return {?}
     */
    pause() { }
    /**
     * @return {?}
     */
    restart() { }
    /**
     * @return {?}
     */
    finish() { this._onFinish(); }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._destroyed = true;
            this.finish();
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @return {?}
     */
    reset() { }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
}

/**
 * \@experimental Transition support is experimental.
 * @abstract
 */
class TransitionEngine {
    /**
     * @abstract
     * @param {?} container
     * @param {?} element
     * @return {?}
     */
    insertNode(container, element) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    removeNode(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} instructions
     * @return {?}
     */
    process(element, instructions) { }
    /**
     * @abstract
     * @return {?}
     */
    triggerAnimations() { }
}
/**
 * \@experimental Transition support is experimental.
 */
class NoOpTransitionEngine extends TransitionEngine {
    constructor() { super(); }
    /**
     * @param {?} container
     * @param {?} element
     * @return {?}
     */
    insertNode(container, element) { container.appendChild(element); }
    /**
     * @param {?} element
     * @return {?}
     */
    removeNode(element) { remove(element); }
    /**
     * @param {?} element
     * @param {?} instructions
     * @return {?}
     */
    process(element, instructions) {
        return new NoOpAnimationPlayer();
    }
    /**
     * @return {?}
     */
    triggerAnimations() { }
}
/**
 * @param {?} element
 * @return {?}
 */
function remove(element) {
    element.parentNode.removeChild(element);
}

/**
 * @return {?}
 */
function _reflector() {
    return reflector;
}
const /** @type {?} */ _CORE_PLATFORM_PROVIDERS = [
    PlatformRef_,
    { provide: PlatformRef, useExisting: PlatformRef_ },
    { provide: Reflector, useFactory: _reflector, deps: [] },
    { provide: ReflectorReader, useExisting: Reflector },
    { provide: TransitionEngine, useClass: NoOpTransitionEngine },
    TestabilityRegistry,
    Console,
];
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
const /** @type {?} */ platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);

/**
 * @experimental i18n support is experimental.
 */
const /** @type {?} */ LOCALE_ID = new InjectionToken('LocaleId');
/**
 * @experimental i18n support is experimental.
 */
const /** @type {?} */ TRANSLATIONS = new InjectionToken('Translations');
/**
 * @experimental i18n support is experimental.
 */
const /** @type {?} */ TRANSLATIONS_FORMAT = new InjectionToken('TranslationsFormat');
let MissingTranslationStrategy = {};
MissingTranslationStrategy.Error = 0;
MissingTranslationStrategy.Warning = 1;
MissingTranslationStrategy.Ignore = 2;
MissingTranslationStrategy[MissingTranslationStrategy.Error] = "Error";
MissingTranslationStrategy[MissingTranslationStrategy.Warning] = "Warning";
MissingTranslationStrategy[MissingTranslationStrategy.Ignore] = "Ignore";

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let ArgumentType = {};
ArgumentType.Inline = 0;
ArgumentType.Dynamic = 1;
ArgumentType[ArgumentType.Inline] = "Inline";
ArgumentType[ArgumentType.Dynamic] = "Dynamic";
let ViewFlags = {};
ViewFlags.None = 0;
ViewFlags.OnPush = 2;
ViewFlags[ViewFlags.None] = "None";
ViewFlags[ViewFlags.OnPush] = "OnPush";
let NodeType = {};
NodeType.Element = 0;
NodeType.Text = 1;
NodeType.Directive = 2;
NodeType.Provider = 3;
NodeType.Pipe = 4;
NodeType.PureExpression = 5;
NodeType.Query = 6;
NodeType.NgContent = 7;
NodeType[NodeType.Element] = "Element";
NodeType[NodeType.Text] = "Text";
NodeType[NodeType.Directive] = "Directive";
NodeType[NodeType.Provider] = "Provider";
NodeType[NodeType.Pipe] = "Pipe";
NodeType[NodeType.PureExpression] = "PureExpression";
NodeType[NodeType.Query] = "Query";
NodeType[NodeType.NgContent] = "NgContent";
let NodeFlags = {};
NodeFlags.None = 0;
NodeFlags.OnInit = 1;
NodeFlags.OnDestroy = 2;
NodeFlags.DoCheck = 4;
NodeFlags.OnChanges = 8;
NodeFlags.AfterContentInit = 16;
NodeFlags.AfterContentChecked = 32;
NodeFlags.AfterViewInit = 64;
NodeFlags.AfterViewChecked = 128;
NodeFlags.HasEmbeddedViews = 256;
NodeFlags.HasComponent = 512;
NodeFlags.HasContentQuery = 1024;
NodeFlags.HasStaticQuery = 2048;
NodeFlags.HasDynamicQuery = 4096;
NodeFlags.HasViewQuery = 8192;
NodeFlags.LazyProvider = 16384;
NodeFlags.PrivateProvider = 32768;
NodeFlags[NodeFlags.None] = "None";
NodeFlags[NodeFlags.OnInit] = "OnInit";
NodeFlags[NodeFlags.OnDestroy] = "OnDestroy";
NodeFlags[NodeFlags.DoCheck] = "DoCheck";
NodeFlags[NodeFlags.OnChanges] = "OnChanges";
NodeFlags[NodeFlags.AfterContentInit] = "AfterContentInit";
NodeFlags[NodeFlags.AfterContentChecked] = "AfterContentChecked";
NodeFlags[NodeFlags.AfterViewInit] = "AfterViewInit";
NodeFlags[NodeFlags.AfterViewChecked] = "AfterViewChecked";
NodeFlags[NodeFlags.HasEmbeddedViews] = "HasEmbeddedViews";
NodeFlags[NodeFlags.HasComponent] = "HasComponent";
NodeFlags[NodeFlags.HasContentQuery] = "HasContentQuery";
NodeFlags[NodeFlags.HasStaticQuery] = "HasStaticQuery";
NodeFlags[NodeFlags.HasDynamicQuery] = "HasDynamicQuery";
NodeFlags[NodeFlags.HasViewQuery] = "HasViewQuery";
NodeFlags[NodeFlags.LazyProvider] = "LazyProvider";
NodeFlags[NodeFlags.PrivateProvider] = "PrivateProvider";
let BindingType = {};
BindingType.ElementAttribute = 0;
BindingType.ElementClass = 1;
BindingType.ElementStyle = 2;
BindingType.ElementProperty = 3;
BindingType.DirectiveProperty = 4;
BindingType.TextInterpolation = 5;
BindingType.PureExpressionProperty = 6;
BindingType[BindingType.ElementAttribute] = "ElementAttribute";
BindingType[BindingType.ElementClass] = "ElementClass";
BindingType[BindingType.ElementStyle] = "ElementStyle";
BindingType[BindingType.ElementProperty] = "ElementProperty";
BindingType[BindingType.DirectiveProperty] = "DirectiveProperty";
BindingType[BindingType.TextInterpolation] = "TextInterpolation";
BindingType[BindingType.PureExpressionProperty] = "PureExpressionProperty";
let QueryValueType = {};
QueryValueType.ElementRef = 0;
QueryValueType.RenderElement = 1;
QueryValueType.TemplateRef = 2;
QueryValueType.ViewContainerRef = 3;
QueryValueType.Provider = 4;
QueryValueType[QueryValueType.ElementRef] = "ElementRef";
QueryValueType[QueryValueType.RenderElement] = "RenderElement";
QueryValueType[QueryValueType.TemplateRef] = "TemplateRef";
QueryValueType[QueryValueType.ViewContainerRef] = "ViewContainerRef";
QueryValueType[QueryValueType.Provider] = "Provider";
let ProviderType = {};
ProviderType.Value = 0;
ProviderType.Class = 1;
ProviderType.Factory = 2;
ProviderType.UseExisting = 3;
ProviderType[ProviderType.Value] = "Value";
ProviderType[ProviderType.Class] = "Class";
ProviderType[ProviderType.Factory] = "Factory";
ProviderType[ProviderType.UseExisting] = "UseExisting";
let DepFlags = {};
DepFlags.None = 0;
DepFlags.SkipSelf = 1;
DepFlags.Optional = 2;
DepFlags.Value = 8;
DepFlags[DepFlags.None] = "None";
DepFlags[DepFlags.SkipSelf] = "SkipSelf";
DepFlags[DepFlags.Optional] = "Optional";
DepFlags[DepFlags.Value] = "Value";
let PureExpressionType = {};
PureExpressionType.Array = 0;
PureExpressionType.Object = 1;
PureExpressionType.Pipe = 2;
PureExpressionType[PureExpressionType.Array] = "Array";
PureExpressionType[PureExpressionType.Object] = "Object";
PureExpressionType[PureExpressionType.Pipe] = "Pipe";
let QueryBindingType = {};
QueryBindingType.First = 0;
QueryBindingType.All = 1;
QueryBindingType[QueryBindingType.First] = "First";
QueryBindingType[QueryBindingType.All] = "All";
let ViewState = {};
ViewState.FirstCheck = 1;
ViewState.ChecksEnabled = 2;
ViewState.Errored = 4;
ViewState.Destroyed = 8;
ViewState[ViewState.FirstCheck] = "FirstCheck";
ViewState[ViewState.ChecksEnabled] = "ChecksEnabled";
ViewState[ViewState.Errored] = "Errored";
ViewState[ViewState.Destroyed] = "Destroyed";
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asTextData(view, index) {
    return (view.nodes[index]);
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asElementData(view, index) {
    return (view.nodes[index]);
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asProviderData(view, index) {
    return (view.nodes[index]);
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asPureExpressionData(view, index) {
    return (view.nodes[index]);
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asQueryList(view, index) {
    return (view.nodes[index]);
}
/**
 * This object is used to prevent cycles in the source files and to have a place where
 * debug mode can hook it. It is lazily filled when `isDevMode` is known.
 */
const /** @type {?} */ Services = {
    setCurrentNode: undefined,
    createRootView: undefined,
    createEmbeddedView: undefined,
    checkAndUpdateView: undefined,
    checkNoChangesView: undefined,
    destroyView: undefined,
    attachEmbeddedView: undefined,
    detachEmbeddedView: undefined,
    moveEmbeddedView: undefined,
    resolveDep: undefined,
    createDebugContext: undefined,
    handleEvent: undefined,
    updateDirectives: undefined,
    updateRenderer: undefined,
};

/**
 * @param {?} context
 * @param {?} oldValue
 * @param {?} currValue
 * @param {?} isFirstCheck
 * @return {?}
 */
function expressionChangedAfterItHasBeenCheckedError$1(context, oldValue, currValue, isFirstCheck) {
    let /** @type {?} */ msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${oldValue}'. Current value: '${currValue}'.`;
    if (isFirstCheck) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook ?`;
    }
    return viewDebugError(msg, context);
}
/**
 * @param {?} originalError
 * @param {?} context
 * @return {?}
 */
function viewWrappedDebugError(originalError, context) {
    const /** @type {?} */ err = viewDebugError(originalError.message, context);
    ((err))[ERROR_ORIGINAL_ERROR] = originalError;
    return err;
}
/**
 * @param {?} msg
 * @param {?} context
 * @return {?}
 */
function viewDebugError(msg, context) {
    const /** @type {?} */ err = new Error(msg);
    ((err))[ERROR_DEBUG_CONTEXT] = context;
    err.stack = context.source;
    return err;
}
/**
 * @param {?} err
 * @return {?}
 */
function isViewDebugError(err) {
    return !!getDebugContext(err);
}
/**
 * @param {?} action
 * @return {?}
 */
function viewDestroyedError$1(action) {
    return new Error(`ViewDestroyedError: Attempt to use a destroyed view: ${action}`);
}

const /** @type {?} */ _tokenKeyCache = new Map();
/**
 * @param {?} token
 * @return {?}
 */
function tokenKey(token) {
    let /** @type {?} */ key = _tokenKeyCache.get(token);
    if (!key) {
        key = stringify(token) + '_' + _tokenKeyCache.size;
        _tokenKeyCache.set(token, key);
    }
    return key;
}
let /** @type {?} */ unwrapCounter = 0;
/**
 * @param {?} value
 * @return {?}
 */
function unwrapValue(value) {
    if (value instanceof WrappedValue) {
        value = value.wrapped;
        unwrapCounter++;
    }
    return value;
}
let /** @type {?} */ _renderCompCount = 0;
/**
 * @param {?} values
 * @return {?}
 */
function createRendererTypeV2(values) {
    const /** @type {?} */ isFilled = values && (values.encapsulation !== ViewEncapsulation.None ||
        values.styles.length || Object.keys(values.data).length);
    if (isFilled) {
        const /** @type {?} */ id = `c${_renderCompCount++}`;
        return { id: id, styles: values.styles, encapsulation: values.encapsulation, data: values.data };
    }
    else {
        return null;
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkBinding$1(view, def, bindingIdx, value) {
    const /** @type {?} */ oldValue = view.oldValues[def.bindingIndex + bindingIdx];
    return unwrapCounter > 0 || !!(view.state & ViewState.FirstCheck) ||
        !devModeEqual(oldValue, value);
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkBindingNoChanges(view, def, bindingIdx, value) {
    const /** @type {?} */ oldValue = view.oldValues[def.bindingIndex + bindingIdx];
    if (unwrapCounter || (view.state & ViewState.FirstCheck) || !devModeEqual(oldValue, value)) {
        unwrapCounter = 0;
        throw expressionChangedAfterItHasBeenCheckedError$1(Services.createDebugContext(view, def.index), oldValue, value, (view.state & ViewState.FirstCheck) !== 0);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkAndUpdateBinding(view, def, bindingIdx, value) {
    const /** @type {?} */ oldValues = view.oldValues;
    if (unwrapCounter || (view.state & ViewState.FirstCheck) ||
        !looseIdentical(oldValues[def.bindingIndex + bindingIdx], value)) {
        unwrapCounter = 0;
        oldValues[def.bindingIndex + bindingIdx] = value;
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
function dispatchEvent(view, nodeIndex, eventName, event) {
    let /** @type {?} */ currView = view;
    while (currView) {
        if (currView.def.flags & ViewFlags.OnPush) {
            currView.state |= ViewState.ChecksEnabled;
        }
        currView = currView.parent;
    }
    return Services.handleEvent(view, nodeIndex, eventName, event);
}
/**
 * @param {?} view
 * @return {?}
 */
function declaredViewContainer(view) {
    if (view.parent) {
        const /** @type {?} */ parentView = view.parent;
        return asElementData(parentView, view.parentNodeDef.index);
    }
    return undefined;
}
/**
 * for component views, this is the host element.
 * for embedded views, this is the index of the parent node
 * that contains the view container.
 * @param {?} view
 * @return {?}
 */
function viewParentEl(view) {
    const /** @type {?} */ parentView = view.parent;
    if (parentView) {
        return view.parentNodeDef.parent;
    }
    else {
        return null;
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function renderNode(view, def) {
    switch (def.type) {
        case NodeType.Element:
            return asElementData(view, def.index).renderElement;
        case NodeType.Text:
            return asTextData(view, def.index).renderText;
    }
}
/**
 * @param {?} target
 * @param {?} name
 * @return {?}
 */
function elementEventFullName(target, name) {
    return target ? `${target}:${name}` : name;
}
/**
 * @param {?} view
 * @return {?}
 */
function isComponentView(view) {
    return view.component === view.context && !!view.parent;
}
/**
 * @param {?} view
 * @return {?}
 */
function isEmbeddedView(view) {
    return view.component !== view.context && !!view.parent;
}
/**
 * @param {?} queryId
 * @return {?}
 */
function filterQueryId(queryId) {
    return 1 << (queryId % 32);
}
/**
 * @param {?} matchedQueriesDsl
 * @return {?}
 */
function splitMatchedQueriesDsl(matchedQueriesDsl) {
    const /** @type {?} */ matchedQueries = {};
    let /** @type {?} */ matchedQueryIds = 0;
    const /** @type {?} */ references = {};
    if (matchedQueriesDsl) {
        matchedQueriesDsl.forEach(([queryId, valueType]) => {
            if (typeof queryId === 'number') {
                matchedQueries[queryId] = valueType;
                matchedQueryIds |= filterQueryId(queryId);
            }
            else {
                references[queryId] = valueType;
            }
        });
    }
    return { matchedQueries, references, matchedQueryIds };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
function getParentRenderElement(view, renderHost, def) {
    let /** @type {?} */ renderParent = def.renderParent;
    if (renderParent) {
        const /** @type {?} */ parent = def.parent;
        if (parent && (parent.type !== NodeType.Element || !parent.element.component ||
            (parent.element.component.provider.rendererType &&
                parent.element.component.provider.rendererType.encapsulation ===
                    ViewEncapsulation.Native))) {
            // only children of non components, or children of components with native encapsulation should
            // be attached.
            return asElementData(view, def.renderParent.index).renderElement;
        }
    }
    else {
        return renderHost;
    }
}
const /** @type {?} */ VIEW_DEFINITION_CACHE = new WeakMap();
/**
 * @param {?} factory
 * @return {?}
 */
function resolveViewDefinition(factory) {
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
function sliceErrorStack(start, end) {
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
/**
 * @param {?} view
 * @return {?}
 */
function rootRenderNodes(view) {
    const /** @type {?} */ renderNodes = [];
    visitRootRenderNodes(view, RenderNodeAction.Collect, undefined, undefined, renderNodes);
    return renderNodes;
}
let RenderNodeAction = {};
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
function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
    // We need to re-compute the parent node in case the nodes have been moved around manually
    if (action === RenderNodeAction.RemoveChild) {
        parentNode = view.renderer.parentNode(renderNode(view, view.def.lastRenderRootNode));
    }
    visitSiblingRenderNodes(view, action, 0, view.def.nodes.length - 1, parentNode, nextSibling, target);
}
/**
 * @param {?} view
 * @param {?} action
 * @param {?} startIndex
 * @param {?} endIndex
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
function visitSiblingRenderNodes(view, action, startIndex, endIndex, parentNode, nextSibling, target) {
    for (let /** @type {?} */ i = startIndex; i <= endIndex; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        if (nodeDef.type === NodeType.Element || nodeDef.type === NodeType.Text ||
            nodeDef.type === NodeType.NgContent) {
            visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target);
        }
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
function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
    let /** @type {?} */ compView = view;
    while (compView && !isComponentView(compView)) {
        compView = compView.parent;
    }
    const /** @type {?} */ hostView = compView.parent;
    const /** @type {?} */ hostElDef = viewParentEl(compView);
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
                execRenderNodeAction(view, projectedNodes[i], action, parentNode, nextSibling, target);
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
        execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
        if (nodeDef.flags & NodeFlags.HasEmbeddedViews) {
            const /** @type {?} */ embeddedViews = asElementData(view, nodeDef.index).embeddedViews;
            if (embeddedViews) {
                for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                    visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
                }
            }
        }
        if (nodeDef.type === NodeType.Element && !nodeDef.element.name) {
            visitSiblingRenderNodes(view, action, nodeDef.index + 1, nodeDef.index + nodeDef.childCount, parentNode, nextSibling, target);
        }
    }
}
/**
 * @param {?} view
 * @param {?} renderNode
 * @param {?} action
 * @param {?} parentNode
 * @param {?} nextSibling
 * @param {?} target
 * @return {?}
 */
function execRenderNodeAction(view, renderNode, action, parentNode, nextSibling, target) {
    const /** @type {?} */ renderer = view.renderer;
    switch (action) {
        case RenderNodeAction.AppendChild:
            renderer.appendChild(parentNode, renderNode);
            break;
        case RenderNodeAction.InsertBefore:
            renderer.insertBefore(parentNode, renderNode, nextSibling);
            break;
        case RenderNodeAction.RemoveChild:
            renderer.removeChild(parentNode, renderNode);
            break;
        case RenderNodeAction.Collect:
            target.push(renderNode);
            break;
    }
}
const /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)$/;
/**
 * @param {?} name
 * @return {?}
 */
function splitNamespace(name) {
    if (name[0] === ':') {
        const /** @type {?} */ match = name.match(NS_PREFIX_RE);
        return [match[1], match[2]];
    }
    return ['', name];
}

const /** @type {?} */ NOOP = () => { };
/**
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?=} handleEvent
 * @param {?=} templateFactory
 * @return {?}
 */
function anchorDef(flags, matchedQueriesDsl, ngContentIndex, childCount, handleEvent, templateFactory) {
    if (!handleEvent) {
        handleEvent = NOOP;
    }
    const { matchedQueries, references, matchedQueryIds } = splitMatchedQueriesDsl(matchedQueriesDsl);
    // skip the call to sliceErrorStack itself + the call to this function.
    const /** @type {?} */ source = isDevMode() ? sliceErrorStack(2, 3) : '';
    const /** @type {?} */ template = templateFactory ? resolveViewDefinition(templateFactory) : null;
    return {
        type: NodeType.Element,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        childFlags: 0,
        childMatchedQueries: 0, matchedQueries, matchedQueryIds, references, ngContentIndex, childCount,
        bindings: [],
        disposableCount: 0,
        element: {
            ns: undefined,
            name: undefined,
            attrs: undefined,
            outputs: [], template, source,
            // will bet set by the view definition
            component: undefined,
            publicProviders: undefined,
            allProviders: undefined, handleEvent
        },
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?} namespaceAndName
 * @param {?=} fixedAttrs
 * @param {?=} bindings
 * @param {?=} outputs
 * @param {?=} handleEvent
 * @return {?}
 */
function elementDef(flags, matchedQueriesDsl, ngContentIndex, childCount, namespaceAndName, fixedAttrs = [], bindings, outputs, handleEvent) {
    if (!handleEvent) {
        handleEvent = NOOP;
    }
    // skip the call to sliceErrorStack itself + the call to this function.
    const /** @type {?} */ source = isDevMode() ? sliceErrorStack(2, 3) : '';
    const { matchedQueries, references, matchedQueryIds } = splitMatchedQueriesDsl(matchedQueriesDsl);
    let /** @type {?} */ ns;
    let /** @type {?} */ name;
    if (namespaceAndName) {
        [ns, name] = splitNamespace(namespaceAndName);
    }
    bindings = bindings || [];
    const /** @type {?} */ bindingDefs = new Array(bindings.length);
    for (let /** @type {?} */ i = 0; i < bindings.length; i++) {
        const /** @type {?} */ entry = bindings[i];
        let /** @type {?} */ bindingDef;
        const /** @type {?} */ bindingType = entry[0];
        const [ns, name] = splitNamespace(entry[1]);
        let /** @type {?} */ securityContext;
        let /** @type {?} */ suffix;
        switch (bindingType) {
            case BindingType.ElementStyle:
                suffix = (entry[2]);
                break;
            case BindingType.ElementAttribute:
            case BindingType.ElementProperty:
                securityContext = (entry[2]);
                break;
        }
        bindingDefs[i] = { type: bindingType, ns, name, nonMinifiedName: name, securityContext, suffix };
    }
    outputs = outputs || [];
    const /** @type {?} */ outputDefs = new Array(outputs.length);
    for (let /** @type {?} */ i = 0; i < outputs.length; i++) {
        const /** @type {?} */ output = outputs[i];
        let /** @type {?} */ target;
        let /** @type {?} */ eventName;
        if (Array.isArray(output)) {
            [target, eventName] = output;
        }
        else {
            eventName = output;
        }
        outputDefs[i] = { eventName: eventName, target: target };
    }
    fixedAttrs = fixedAttrs || [];
    const /** @type {?} */ attrs = (fixedAttrs.map(([namespaceAndName, value]) => {
        const [ns, name] = splitNamespace(namespaceAndName);
        return [ns, name, value];
    }));
    return {
        type: NodeType.Element,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        childFlags: 0,
        childMatchedQueries: 0, matchedQueries, matchedQueryIds, references, ngContentIndex, childCount,
        bindings: bindingDefs,
        disposableCount: outputDefs.length,
        element: {
            ns,
            name,
            attrs,
            outputs: outputDefs, source,
            template: undefined,
            // will bet set by the view definition
            component: undefined,
            publicProviders: undefined,
            allProviders: undefined, handleEvent,
        },
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
function createElement(view, renderHost, def) {
    const /** @type {?} */ elDef = def.element;
    const /** @type {?} */ rootSelectorOrNode = view.root.selectorOrNode;
    const /** @type {?} */ renderer = view.renderer;
    let /** @type {?} */ el;
    if (view.parent || !rootSelectorOrNode) {
        if (elDef.name) {
            el = renderer.createElement(elDef.name, elDef.ns);
        }
        else {
            el = renderer.createComment('');
        }
        const /** @type {?} */ parentEl = getParentRenderElement(view, renderHost, def);
        if (parentEl) {
            renderer.appendChild(parentEl, el);
        }
    }
    else {
        el = renderer.selectRootElement(rootSelectorOrNode);
    }
    if (elDef.attrs) {
        for (let /** @type {?} */ i = 0; i < elDef.attrs.length; i++) {
            const [ns, name, value] = elDef.attrs[i];
            renderer.setAttribute(el, name, value, ns);
        }
    }
    if (elDef.outputs.length) {
        for (let /** @type {?} */ i = 0; i < elDef.outputs.length; i++) {
            const /** @type {?} */ output = elDef.outputs[i];
            const /** @type {?} */ handleEventClosure = renderEventHandlerClosure(view, def.index, elementEventFullName(output.target, output.eventName));
            const /** @type {?} */ disposable = (renderer.listen(output.target || el, output.eventName, handleEventClosure));
            view.disposables[def.disposableIndex + i] = disposable;
        }
    }
    return {
        renderElement: el,
        embeddedViews: (def.flags & NodeFlags.HasEmbeddedViews) ? [] : undefined,
        projectedViews: undefined
    };
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function renderEventHandlerClosure(view, index, eventName) {
    return (event) => dispatchEvent(view, index, eventName, event);
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    const /** @type {?} */ bindLen = def.bindings.length;
    if (bindLen > 0)
        checkAndUpdateElementValue(view, def, 0, v0);
    if (bindLen > 1)
        checkAndUpdateElementValue(view, def, 1, v1);
    if (bindLen > 2)
        checkAndUpdateElementValue(view, def, 2, v2);
    if (bindLen > 3)
        checkAndUpdateElementValue(view, def, 3, v3);
    if (bindLen > 4)
        checkAndUpdateElementValue(view, def, 4, v4);
    if (bindLen > 5)
        checkAndUpdateElementValue(view, def, 5, v5);
    if (bindLen > 6)
        checkAndUpdateElementValue(view, def, 6, v6);
    if (bindLen > 7)
        checkAndUpdateElementValue(view, def, 7, v7);
    if (bindLen > 8)
        checkAndUpdateElementValue(view, def, 8, v8);
    if (bindLen > 9)
        checkAndUpdateElementValue(view, def, 9, v9);
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
function checkAndUpdateElementDynamic(view, def, values) {
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        checkAndUpdateElementValue(view, def, i, values[i]);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkAndUpdateElementValue(view, def, bindingIdx, value) {
    if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
        return;
    }
    const /** @type {?} */ binding = def.bindings[bindingIdx];
    const /** @type {?} */ renderNode = asElementData(view, def.index).renderElement;
    const /** @type {?} */ name = binding.name;
    switch (binding.type) {
        case BindingType.ElementAttribute:
            setElementAttribute(view, binding, renderNode, binding.ns, name, value);
            break;
        case BindingType.ElementClass:
            setElementClass(view, renderNode, name, value);
            break;
        case BindingType.ElementStyle:
            setElementStyle(view, binding, renderNode, name, value);
            break;
        case BindingType.ElementProperty:
            setElementProperty(view, binding, renderNode, name, value);
            break;
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} ns
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementAttribute(view, binding, renderNode, ns, name, value) {
    const /** @type {?} */ securityContext = binding.securityContext;
    let /** @type {?} */ renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    renderValue = renderValue != null ? renderValue.toString() : null;
    const /** @type {?} */ renderer = view.renderer;
    if (value != null) {
        renderer.setAttribute(renderNode, name, renderValue, ns);
    }
    else {
        renderer.removeAttribute(renderNode, name, ns);
    }
}
/**
 * @param {?} view
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementClass(view, renderNode, name, value) {
    const /** @type {?} */ renderer = view.renderer;
    if (value) {
        renderer.addClass(renderNode, name);
    }
    else {
        renderer.removeClass(renderNode, name);
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementStyle(view, binding, renderNode, name, value) {
    let /** @type {?} */ renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
    if (renderValue != null) {
        renderValue = renderValue.toString();
        const /** @type {?} */ unit = binding.suffix;
        if (unit != null) {
            renderValue = renderValue + unit;
        }
    }
    else {
        renderValue = null;
    }
    const /** @type {?} */ renderer = view.renderer;
    if (renderValue != null) {
        renderer.setStyle(renderNode, name, renderValue, false, false);
    }
    else {
        renderer.removeStyle(renderNode, name, false);
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementProperty(view, binding, renderNode, name, value) {
    const /** @type {?} */ securityContext = binding.securityContext;
    let /** @type {?} */ renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    view.renderer.setProperty(renderNode, name, renderValue);
}

/**
 * @param {?} ngContentIndex
 * @param {?} index
 * @return {?}
 */
function ngContentDef(ngContentIndex, index) {
    return {
        type: NodeType.NgContent,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags: 0,
        childFlags: 0,
        childMatchedQueries: 0,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {}, ngContentIndex,
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
function appendNgContent(view, renderHost, def) {
    const /** @type {?} */ parentEl = getParentRenderElement(view, renderHost, def);
    if (!parentEl) {
        // Nothing to do if there is no parent element.
        return;
    }
    const /** @type {?} */ ngContentIndex = def.ngContent.index;
    visitProjectedRenderNodes(view, ngContentIndex, RenderNodeAction.AppendChild, parentEl, undefined, undefined);
}

const /** @type {?} */ EMPTY_CONTEXT = new Object();
/**
 * @param {?} selector
 * @param {?} componentType
 * @param {?} viewDefFactory
 * @return {?}
 */
function createComponentFactory(selector, componentType, viewDefFactory) {
    return new ComponentFactory_(selector, componentType, viewDefFactory);
}
class ComponentFactory_ extends ComponentFactory {
    /**
     * @param {?} selector
     * @param {?} componentType
     * @param {?} viewDefFactory
     */
    constructor(selector, componentType, viewDefFactory) {
        super(selector, viewDefFactory, componentType);
    }
    /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    create(injector, projectableNodes = null, rootSelectorOrNode = null) {
        const /** @type {?} */ viewDef = resolveViewDefinition(this._viewClass);
        const /** @type {?} */ componentNodeIndex = viewDef.nodes[0].element.component.index;
        const /** @type {?} */ view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, EMPTY_CONTEXT);
        const /** @type {?} */ component = asProviderData(view, componentNodeIndex).instance;
        view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);
        return new ComponentRef_$1(view, new ViewRef_$1(view), component);
    }
}
class ComponentRef_$1 extends ComponentRef {
    /**
     * @param {?} _view
     * @param {?} _viewRef
     * @param {?} _component
     */
    constructor(_view, _viewRef, _component) {
        super();
        this._view = _view;
        this._viewRef = _viewRef;
        this._component = _component;
        this._elDef = this._view.def.nodes[0];
    }
    /**
     * @return {?}
     */
    get location() {
        return new ElementRef(asElementData(this._view, this._elDef.index).renderElement);
    }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view, this._elDef); }
    /**
     * @return {?}
     */
    get instance() { return this._component; }
    ;
    /**
     * @return {?}
     */
    get hostView() { return this._viewRef; }
    ;
    /**
     * @return {?}
     */
    get changeDetectorRef() { return this._viewRef; }
    ;
    /**
     * @return {?}
     */
    get componentType() { return (this._component.constructor); }
    /**
     * @return {?}
     */
    destroy() { this._viewRef.destroy(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._viewRef.onDestroy(callback); }
}
/**
 * @param {?} view
 * @param {?} elDef
 * @return {?}
 */
function createViewContainerRef(view, elDef) {
    return new ViewContainerRef_$1(view, elDef);
}
class ViewContainerRef_$1 {
    /**
     * @param {?} _view
     * @param {?} _elDef
     */
    constructor(_view, _elDef) {
        this._view = _view;
        this._elDef = _elDef;
        this._data = asElementData(_view, _elDef.index);
    }
    /**
     * @return {?}
     */
    get element() { return new ElementRef(this._data.renderElement); }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view, this._elDef); }
    /**
     * @return {?}
     */
    get parentInjector() {
        let /** @type {?} */ view = this._view;
        let /** @type {?} */ elDef = this._elDef.parent;
        while (!elDef && view) {
            elDef = viewParentEl(view);
            view = view.parent;
        }
        return view ? new Injector_(view, elDef) : this._view.root.injector;
    }
    /**
     * @return {?}
     */
    clear() {
        const /** @type {?} */ len = this._data.embeddedViews.length;
        for (let /** @type {?} */ i = len - 1; i >= 0; i--) {
            const /** @type {?} */ view = Services.detachEmbeddedView(this._data, i);
            Services.destroyView(view);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return this._getViewRef(this._data.embeddedViews[index]); }
    /**
     * @param {?} view
     * @return {?}
     */
    _getViewRef(view) {
        if (view) {
            const /** @type {?} */ ref = new ViewRef_$1(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    }
    /**
     * @return {?}
     */
    get length() { return this._data.embeddedViews.length; }
    ;
    /**
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) {
        const /** @type {?} */ viewRef = templateRef.createEmbeddedView(context || ({}));
        this.insert(viewRef, index);
        return viewRef;
    }
    /**
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createComponent(componentFactory, index, injector, projectableNodes) {
        const /** @type {?} */ contextInjector = injector || this.parentInjector;
        const /** @type {?} */ componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return componentRef;
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index) {
        const /** @type {?} */ viewRef_ = (viewRef);
        const /** @type {?} */ viewData = viewRef_._view;
        Services.attachEmbeddedView(this._data, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    move(viewRef, currentIndex) {
        const /** @type {?} */ previousIndex = this._data.embeddedViews.indexOf(viewRef._view);
        Services.moveEmbeddedView(this._data, previousIndex, currentIndex);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) {
        return this._data.embeddedViews.indexOf(((viewRef))._view);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index) {
        const /** @type {?} */ viewData = Services.detachEmbeddedView(this._data, index);
        if (viewData) {
            Services.destroyView(viewData);
        }
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index) {
        const /** @type {?} */ view = Services.detachEmbeddedView(this._data, index);
        if (view) {
            const /** @type {?} */ viewRef = this._getViewRef(view);
            viewRef.detachFromContainer();
            return viewRef;
        }
        return null;
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function createChangeDetectorRef(view) {
    return new ViewRef_$1(view);
}
class ViewRef_$1 {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    /**
     * @return {?}
     */
    get rootNodes() { return rootRenderNodes(this._view); }
    /**
     * @return {?}
     */
    get context() { return this._view.context; }
    /**
     * @return {?}
     */
    get destroyed() { return (this._view.state & ViewState.Destroyed) !== 0; }
    /**
     * @return {?}
     */
    markForCheck() { this.reattach(); }
    /**
     * @return {?}
     */
    detach() { this._view.state &= ~ViewState.ChecksEnabled; }
    /**
     * @return {?}
     */
    detectChanges() { Services.checkAndUpdateView(this._view); }
    /**
     * @return {?}
     */
    checkNoChanges() { Services.checkNoChangesView(this._view); }
    /**
     * @return {?}
     */
    reattach() { this._view.state |= ViewState.ChecksEnabled; }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(/** @type {?} */ (callback));
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        Services.destroyView(this._view);
    }
    /**
     * @return {?}
     */
    detachFromContainer() {
        this._appRef = null;
        this._viewContainerRef = null;
    }
    /**
     * @param {?} appRef
     * @return {?}
     */
    attachToAppRef(appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    }
    /**
     * @param {?} vcRef
     * @return {?}
     */
    attachToViewContainerRef(vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createTemplateRef(view, def) {
    return new TemplateRef_$1(view, def);
}
class TemplateRef_$1 {
    /**
     * @param {?} _parentView
     * @param {?} _def
     */
    constructor(_parentView, _def) {
        this._parentView = _parentView;
        this._def = _def;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createEmbeddedView(context) {
        return new ViewRef_$1(Services.createEmbeddedView(this._parentView, this._def, context));
    }
    /**
     * @return {?}
     */
    get elementRef() {
        return new ElementRef(asElementData(this._parentView, this._def.index).renderElement);
    }
}
/**
 * @param {?} view
 * @param {?} elDef
 * @return {?}
 */
function createInjector(view, elDef) {
    return new Injector_(view, elDef);
}
class Injector_ {
    /**
     * @param {?} view
     * @param {?} elDef
     */
    constructor(view, elDef) {
        this.view = view;
        this.elDef = elDef;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        const /** @type {?} */ allowPrivateServices = !!this.elDef.element.component;
        return Services.resolveDep(this.view, this.elDef, allowPrivateServices, { flags: DepFlags.None, token, tokenKey: tokenKey(token) }, notFoundValue);
    }
}
/**
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function nodeValue(view, index) {
    const /** @type {?} */ def = view.def.nodes[index];
    switch (def.type) {
        case NodeType.Element:
            if (def.element.template) {
                return createTemplateRef(view, def);
            }
            else {
                return asElementData(view, def.index).renderElement;
            }
        case NodeType.Text:
            return asTextData(view, def.index).renderText;
        case NodeType.Directive:
        case NodeType.Pipe:
        case NodeType.Provider:
            return asProviderData(view, def.index).instance;
    }
    return undefined;
}
/**
 * @param {?} view
 * @return {?}
 */
function createRendererV1(view) {
    return new RendererAdapter(view.renderer);
}
class RendererAdapter {
    /**
     * @param {?} delegate
     */
    constructor(delegate) {
        this.delegate = delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    }
    /**
     * @param {?} parent
     * @param {?} namespaceAndName
     * @return {?}
     */
    createElement(parent, namespaceAndName) {
        const [ns, name] = splitNamespace(namespaceAndName);
        const /** @type {?} */ el = this.delegate.createElement(name, ns);
        if (parent) {
            this.delegate.appendChild(parent, el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) { return hostElement; }
    /**
     * @param {?} parentElement
     * @return {?}
     */
    createTemplateAnchor(parentElement) {
        const /** @type {?} */ comment = this.delegate.createComment('');
        if (parentElement) {
            this.delegate.appendChild(parentElement, comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @return {?}
     */
    createText(parentElement, value) {
        const /** @type {?} */ node = this.delegate.createText(value);
        if (parentElement) {
            this.delegate.appendChild(parentElement, node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
            this.delegate.appendChild(parentElement, nodes[i]);
        }
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        const /** @type {?} */ parentElement = this.delegate.parentNode(node);
        const /** @type {?} */ nextSibling = this.delegate.nextSibling(node);
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
        }
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            const /** @type {?} */ node = viewRootNodes[i];
            const /** @type {?} */ parentElement = this.delegate.parentNode(node);
            this.delegate.removeChild(parentElement, node);
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        for (let /** @type {?} */ i = 0; i < viewAllNodes.length; i++) {
            this.delegate.destroyNode(viewAllNodes[i]);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        return this.delegate.listen(renderElement, name, /** @type {?} */ (callback));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this.delegate.listen(target, name, /** @type {?} */ (callback));
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        this.delegate.setProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} namespaceAndName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, namespaceAndName, attributeValue) {
        const [ns, name] = splitNamespace(namespaceAndName);
        if (attributeValue != null) {
            this.delegate.setAttribute(renderElement, name, attributeValue, ns);
        }
        else {
            this.delegate.removeAttribute(renderElement, name, ns);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) { }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            this.delegate.addClass(renderElement, className);
        }
        else {
            this.delegate.removeClass(renderElement, className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (styleValue != null) {
            this.delegate.setStyle(renderElement, styleName, styleValue, false, false);
        }
        else {
            this.delegate.removeStyle(renderElement, styleName, false);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        ((renderElement))[methodName].apply(renderElement, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { this.delegate.setValue(renderNode, text); }
    /**
     * @return {?}
     */
    animate() { return new NoOpAnimationPlayer(); }
}

const /** @type {?} */ RendererV1TokenKey = tokenKey(RendererV1);
const /** @type {?} */ RendererV2TokenKey = tokenKey(RendererV2);
const /** @type {?} */ ElementRefTokenKey = tokenKey(ElementRef);
const /** @type {?} */ ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
const /** @type {?} */ TemplateRefTokenKey = tokenKey(TemplateRef);
const /** @type {?} */ ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
const /** @type {?} */ InjectorRefTokenKey = tokenKey(Injector);
const /** @type {?} */ NOT_CREATED = new Object();
/**
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} childCount
 * @param {?} ctor
 * @param {?} deps
 * @param {?=} props
 * @param {?=} outputs
 * @param {?=} component
 * @param {?=} rendererType
 * @return {?}
 */
function directiveDef(flags, matchedQueries, childCount, ctor, deps, props, outputs, component, rendererType) {
    const /** @type {?} */ bindings = [];
    if (props) {
        for (let /** @type {?} */ prop in props) {
            const [bindingIndex, nonMinifiedName] = props[prop];
            bindings[bindingIndex] = {
                type: BindingType.DirectiveProperty,
                name: prop, nonMinifiedName,
                ns: undefined,
                securityContext: undefined,
                suffix: undefined
            };
        }
    }
    const /** @type {?} */ outputDefs = [];
    if (outputs) {
        for (let /** @type {?} */ propName in outputs) {
            outputDefs.push({ propName, eventName: outputs[propName] });
        }
    }
    return _def(NodeType.Directive, flags, matchedQueries, childCount, ProviderType.Class, ctor, ctor, deps, bindings, outputDefs, component, rendererType);
}
/**
 * @param {?} flags
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
function pipeDef(flags, ctor, deps) {
    return _def(NodeType.Pipe, flags, null, 0, ProviderType.Class, ctor, ctor, deps);
}
/**
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} type
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @return {?}
 */
function providerDef(flags, matchedQueries, type, token, value, deps) {
    return _def(NodeType.Provider, flags, matchedQueries, 0, type, token, value, deps);
}
/**
 * @param {?} type
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} childCount
 * @param {?} providerType
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @param {?=} bindings
 * @param {?=} outputs
 * @param {?=} component
 * @param {?=} rendererType
 * @return {?}
 */
function _def(type, flags, matchedQueriesDsl, childCount, providerType, token, value, deps, bindings, outputs, component, rendererType) {
    const { matchedQueries, references, matchedQueryIds } = splitMatchedQueriesDsl(matchedQueriesDsl);
    // This is needed as the jit compiler always uses an empty hash as default RendererTypeV2,
    // which is not filled for host views.
    if (rendererType && rendererType.encapsulation == null) {
        rendererType = null;
    }
    if (!outputs) {
        outputs = [];
    }
    if (!bindings) {
        bindings = [];
    }
    const /** @type {?} */ depDefs = deps.map(value => {
        let /** @type {?} */ token;
        let /** @type {?} */ flags;
        if (Array.isArray(value)) {
            [flags, token] = value;
        }
        else {
            flags = DepFlags.None;
            token = value;
        }
        return { flags, token, tokenKey: tokenKey(token) };
    });
    if (component) {
        flags = flags | NodeFlags.HasComponent;
    }
    return {
        type,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        childFlags: 0,
        childMatchedQueries: 0, matchedQueries, matchedQueryIds, references,
        ngContentIndex: undefined, childCount, bindings,
        disposableCount: outputs.length,
        element: undefined,
        provider: {
            type: providerType,
            token,
            tokenKey: tokenKey(token), value,
            deps: depDefs, outputs, component, rendererType
        },
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createProviderInstance(view, def) {
    return def.flags & NodeFlags.LazyProvider ? NOT_CREATED : _createProviderInstance(view, def);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createPipeInstance(view, def) {
    // deps are looked up from component.
    let /** @type {?} */ compView = view;
    while (compView.parent && !isComponentView(compView)) {
        compView = compView.parent;
    }
    // pipes can see the private services of the component
    const /** @type {?} */ allowPrivateServices = true;
    // pipes are always eager and classes!
    return createClass(compView.parent, viewParentEl(compView), allowPrivateServices, def.provider.value, def.provider.deps);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createDirectiveInstance(view, def) {
    // components can see other private services, other directives can't.
    const /** @type {?} */ allowPrivateServices = (def.flags & NodeFlags.HasComponent) > 0;
    const /** @type {?} */ providerDef = def.provider;
    // directives are always eager and classes!
    const /** @type {?} */ instance = createClass(view, def.parent, allowPrivateServices, def.provider.value, def.provider.deps);
    if (providerDef.outputs.length) {
        for (let /** @type {?} */ i = 0; i < providerDef.outputs.length; i++) {
            const /** @type {?} */ output = providerDef.outputs[i];
            const /** @type {?} */ subscription = instance[output.propName].subscribe(eventHandlerClosure(view, def.parent.index, output.eventName));
            view.disposables[def.disposableIndex + i] = subscription.unsubscribe.bind(subscription);
        }
    }
    return instance;
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function eventHandlerClosure(view, index, eventName) {
    return (event) => dispatchEvent(view, index, eventName, event);
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    const /** @type {?} */ providerData = asProviderData(view, def.index);
    const /** @type {?} */ directive = providerData.instance;
    let /** @type {?} */ changes;
    const /** @type {?} */ bindLen = def.bindings.length;
    if (bindLen > 0)
        changes = checkAndUpdateProp(view, providerData, def, 0, v0, changes);
    if (bindLen > 1)
        changes = checkAndUpdateProp(view, providerData, def, 1, v1, changes);
    if (bindLen > 2)
        changes = checkAndUpdateProp(view, providerData, def, 2, v2, changes);
    if (bindLen > 3)
        changes = checkAndUpdateProp(view, providerData, def, 3, v3, changes);
    if (bindLen > 4)
        changes = checkAndUpdateProp(view, providerData, def, 4, v4, changes);
    if (bindLen > 5)
        changes = checkAndUpdateProp(view, providerData, def, 5, v5, changes);
    if (bindLen > 6)
        changes = checkAndUpdateProp(view, providerData, def, 6, v6, changes);
    if (bindLen > 7)
        changes = checkAndUpdateProp(view, providerData, def, 7, v7, changes);
    if (bindLen > 8)
        changes = checkAndUpdateProp(view, providerData, def, 8, v8, changes);
    if (bindLen > 9)
        changes = checkAndUpdateProp(view, providerData, def, 9, v9, changes);
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((view.state & ViewState.FirstCheck) && (def.flags & NodeFlags.OnInit)) {
        directive.ngOnInit();
    }
    if (def.flags & NodeFlags.DoCheck) {
        directive.ngDoCheck();
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
function checkAndUpdateDirectiveDynamic(view, def, values) {
    const /** @type {?} */ providerData = asProviderData(view, def.index);
    const /** @type {?} */ directive = providerData.instance;
    let /** @type {?} */ changes;
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        changes = checkAndUpdateProp(view, providerData, def, i, values[i], changes);
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((view.state & ViewState.FirstCheck) && (def.flags & NodeFlags.OnInit)) {
        directive.ngOnInit();
    }
    if (def.flags & NodeFlags.DoCheck) {
        directive.ngDoCheck();
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function _createProviderInstance(view, def) {
    // private services can see other private services
    const /** @type {?} */ allowPrivateServices = (def.flags & NodeFlags.PrivateProvider) > 0;
    const /** @type {?} */ providerDef = def.provider;
    let /** @type {?} */ injectable;
    switch (providerDef.type) {
        case ProviderType.Class:
            injectable =
                createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
            break;
        case ProviderType.Factory:
            injectable =
                callFactory(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
            break;
        case ProviderType.UseExisting:
            injectable = resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);
            break;
        case ProviderType.Value:
            injectable = providerDef.value;
            break;
    }
    return injectable;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
function createClass(view, elDef, allowPrivateServices, ctor, deps) {
    const /** @type {?} */ len = deps.length;
    let /** @type {?} */ injectable;
    switch (len) {
        case 0:
            injectable = new ctor();
            break;
        case 1:
            injectable = new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));
            break;
        case 2:
            injectable = new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
            break;
        case 3:
            injectable = new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
            break;
        default:
            const /** @type {?} */ depValues = new Array(len);
            for (let /** @type {?} */ i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            injectable = new ctor(...depValues);
    }
    return injectable;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} factory
 * @param {?} deps
 * @return {?}
 */
function callFactory(view, elDef, allowPrivateServices, factory, deps) {
    const /** @type {?} */ len = deps.length;
    let /** @type {?} */ injectable;
    switch (len) {
        case 0:
            injectable = factory();
            break;
        case 1:
            injectable = factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));
            break;
        case 2:
            injectable = factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
            break;
        case 3:
            injectable = factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
            break;
        default:
            const /** @type {?} */ depValues = Array(len);
            for (let /** @type {?} */ i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            injectable = factory(...depValues);
    }
    return injectable;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} depDef
 * @param {?=} notFoundValue
 * @return {?}
 */
function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
    if (depDef.flags & DepFlags.Value) {
        return depDef.token;
    }
    const /** @type {?} */ startView = view;
    if (depDef.flags & DepFlags.Optional) {
        notFoundValue = null;
    }
    const /** @type {?} */ tokenKey = depDef.tokenKey;
    if (depDef.flags & DepFlags.SkipSelf) {
        allowPrivateServices = false;
        elDef = elDef.parent;
    }
    while (view) {
        if (elDef) {
            switch (tokenKey) {
                case RendererV1TokenKey: {
                    const /** @type {?} */ compView = findCompView(view, elDef, allowPrivateServices);
                    return createRendererV1(compView);
                }
                case RendererV2TokenKey: {
                    const /** @type {?} */ compView = findCompView(view, elDef, allowPrivateServices);
                    return compView.renderer;
                }
                case ElementRefTokenKey:
                    return new ElementRef(asElementData(view, elDef.index).renderElement);
                case ViewContainerRefTokenKey:
                    return createViewContainerRef(view, elDef);
                case TemplateRefTokenKey: {
                    if (elDef.element.template) {
                        return createTemplateRef(view, elDef);
                    }
                    break;
                }
                case ChangeDetectorRefTokenKey: {
                    let /** @type {?} */ cdView = findCompView(view, elDef, allowPrivateServices);
                    return createChangeDetectorRef(cdView);
                }
                case InjectorRefTokenKey:
                    return createInjector(view, elDef);
                default:
                    const /** @type {?} */ providerDef = (allowPrivateServices ? elDef.element.allProviders :
                        elDef.element.publicProviders)[tokenKey];
                    if (providerDef) {
                        const /** @type {?} */ providerData = asProviderData(view, providerDef.index);
                        if (providerData.instance === NOT_CREATED) {
                            providerData.instance = _createProviderInstance(view, providerDef);
                        }
                        return providerData.instance;
                    }
            }
        }
        allowPrivateServices = isComponentView(view);
        elDef = viewParentEl(view);
        view = view.parent;
    }
    return startView.root.injector.get(depDef.token, notFoundValue);
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @return {?}
 */
function findCompView(view, elDef, allowPrivateServices) {
    let /** @type {?} */ compView;
    if (allowPrivateServices) {
        compView = asProviderData(view, elDef.element.component.index).componentView;
    }
    else {
        compView = view;
        while (compView.parent && !isComponentView(compView)) {
            compView = compView.parent;
        }
    }
    return compView;
}
/**
 * @param {?} view
 * @param {?} providerData
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @param {?} changes
 * @return {?}
 */
function checkAndUpdateProp(view, providerData, def, bindingIdx, value, changes) {
    let /** @type {?} */ change;
    let /** @type {?} */ changed;
    if (def.flags & NodeFlags.OnChanges) {
        const /** @type {?} */ oldValue = view.oldValues[def.bindingIndex + bindingIdx];
        changed = checkAndUpdateBinding(view, def, bindingIdx, value);
        change = changed ?
            new SimpleChange(oldValue, value, (view.state & ViewState.FirstCheck) !== 0) :
            null;
    }
    else {
        changed = checkAndUpdateBinding(view, def, bindingIdx, value);
    }
    if (changed) {
        if (def.flags & NodeFlags.HasComponent) {
            const /** @type {?} */ compView = providerData.componentView;
            if (compView.def.flags & ViewFlags.OnPush) {
                compView.state |= ViewState.ChecksEnabled;
            }
        }
        const /** @type {?} */ binding = def.bindings[bindingIdx];
        const /** @type {?} */ propName = binding.name;
        // Note: This is still safe with Closure Compiler as
        // the user passed in the property name as an object has to `providerDef`,
        // so Closure Compiler will have renamed the property correctly already.
        providerData.instance[propName] = value;
        if (change) {
            changes = changes || {};
            changes[binding.nonMinifiedName] = change;
        }
    }
    return changes;
}
/**
 * @param {?} view
 * @param {?} lifecycles
 * @return {?}
 */
function callLifecycleHooksChildrenFirst(view, lifecycles) {
    if (!(view.def.nodeFlags & lifecycles)) {
        return;
    }
    const /** @type {?} */ len = view.def.nodes.length;
    for (let /** @type {?} */ i = 0; i < len; i++) {
        // We use the reverse child oreder to call providers of children first.
        const /** @type {?} */ nodeDef = view.def.reverseChildNodes[i];
        const /** @type {?} */ nodeIndex = nodeDef.index;
        if (nodeDef.flags & lifecycles) {
            // a leaf
            Services.setCurrentNode(view, nodeIndex);
            callProviderLifecycles(asProviderData(view, nodeIndex).instance, nodeDef.flags & lifecycles);
        }
        else if ((nodeDef.childFlags & lifecycles) === 0) {
            // a parent with leafs
            // no child matches one of the lifecycles,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} provider
 * @param {?} lifecycles
 * @return {?}
 */
function callProviderLifecycles(provider, lifecycles) {
    if (lifecycles & NodeFlags.AfterContentInit) {
        provider.ngAfterContentInit();
    }
    if (lifecycles & NodeFlags.AfterContentChecked) {
        provider.ngAfterContentChecked();
    }
    if (lifecycles & NodeFlags.AfterViewInit) {
        provider.ngAfterViewInit();
    }
    if (lifecycles & NodeFlags.AfterViewChecked) {
        provider.ngAfterViewChecked();
    }
    if (lifecycles & NodeFlags.OnDestroy) {
        provider.ngOnDestroy();
    }
}

/**
 * @param {?} argCount
 * @return {?}
 */
function purePipeDef(argCount) {
    // argCount + 1 to include the pipe as first arg
    return _pureExpressionDef(PureExpressionType.Pipe, new Array(argCount + 1));
}
/**
 * @param {?} argCount
 * @return {?}
 */
function pureArrayDef(argCount) {
    return _pureExpressionDef(PureExpressionType.Array, new Array(argCount));
}
/**
 * @param {?} propertyNames
 * @return {?}
 */
function pureObjectDef(propertyNames) {
    return _pureExpressionDef(PureExpressionType.Object, propertyNames);
}
/**
 * @param {?} type
 * @param {?} propertyNames
 * @return {?}
 */
function _pureExpressionDef(type, propertyNames) {
    const /** @type {?} */ bindings = new Array(propertyNames.length);
    for (let /** @type {?} */ i = 0; i < propertyNames.length; i++) {
        const /** @type {?} */ prop = propertyNames[i];
        bindings[i] = {
            type: BindingType.PureExpressionProperty,
            name: prop,
            ns: undefined,
            nonMinifiedName: prop,
            securityContext: undefined,
            suffix: undefined
        };
    }
    return {
        type: NodeType.PureExpression,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags: 0,
        childFlags: 0,
        childMatchedQueries: 0,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {},
        ngContentIndex: undefined,
        childCount: 0, bindings,
        disposableCount: 0,
        element: undefined,
        provider: undefined,
        text: undefined,
        pureExpression: { type },
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createPureExpression(view, def) {
    return { value: undefined };
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkAndUpdatePureExpressionInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    const /** @type {?} */ bindings = def.bindings;
    let /** @type {?} */ changed = false;
    const /** @type {?} */ bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    const /** @type {?} */ data = asPureExpressionData(view, def.index);
    if (changed) {
        let /** @type {?} */ value;
        switch (def.pureExpression.type) {
            case PureExpressionType.Array:
                value = new Array(bindings.length);
                if (bindLen > 0)
                    value[0] = v0;
                if (bindLen > 1)
                    value[1] = v1;
                if (bindLen > 2)
                    value[2] = v2;
                if (bindLen > 3)
                    value[3] = v3;
                if (bindLen > 4)
                    value[4] = v4;
                if (bindLen > 5)
                    value[5] = v5;
                if (bindLen > 6)
                    value[6] = v6;
                if (bindLen > 7)
                    value[7] = v7;
                if (bindLen > 8)
                    value[8] = v8;
                if (bindLen > 9)
                    value[9] = v9;
                break;
            case PureExpressionType.Object:
                value = {};
                if (bindLen > 0)
                    value[bindings[0].name] = v0;
                if (bindLen > 1)
                    value[bindings[1].name] = v1;
                if (bindLen > 2)
                    value[bindings[2].name] = v2;
                if (bindLen > 3)
                    value[bindings[3].name] = v3;
                if (bindLen > 4)
                    value[bindings[4].name] = v4;
                if (bindLen > 5)
                    value[bindings[5].name] = v5;
                if (bindLen > 6)
                    value[bindings[6].name] = v6;
                if (bindLen > 7)
                    value[bindings[7].name] = v7;
                if (bindLen > 8)
                    value[bindings[8].name] = v8;
                if (bindLen > 9)
                    value[bindings[9].name] = v9;
                break;
            case PureExpressionType.Pipe:
                const /** @type {?} */ pipe = v0;
                switch (bindLen) {
                    case 1:
                        value = pipe.transform(v0);
                        break;
                    case 2:
                        value = pipe.transform(v1);
                        break;
                    case 3:
                        value = pipe.transform(v1, v2);
                        break;
                    case 4:
                        value = pipe.transform(v1, v2, v3);
                        break;
                    case 5:
                        value = pipe.transform(v1, v2, v3, v4);
                        break;
                    case 6:
                        value = pipe.transform(v1, v2, v3, v4, v5);
                        break;
                    case 7:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6);
                        break;
                    case 8:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7);
                        break;
                    case 9:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8);
                        break;
                    case 10:
                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8, v9);
                        break;
                }
                break;
        }
        data.value = value;
    }
    return data.value;
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
function checkAndUpdatePureExpressionDynamic(view, def, values) {
    const /** @type {?} */ bindings = def.bindings;
    let /** @type {?} */ changed = false;
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    const /** @type {?} */ data = asPureExpressionData(view, def.index);
    if (changed) {
        let /** @type {?} */ value;
        switch (def.pureExpression.type) {
            case PureExpressionType.Array:
                value = values;
                break;
            case PureExpressionType.Object:
                value = {};
                for (let /** @type {?} */ i = 0; i < values.length; i++) {
                    value[bindings[i].name] = values[i];
                }
                break;
            case PureExpressionType.Pipe:
                const /** @type {?} */ pipe = values[0];
                const /** @type {?} */ params = values.slice(1);
                value = ((pipe.transform))(...params);
                break;
        }
        data.value = value;
    }
    return data.value;
}

/**
 * @param {?} flags
 * @param {?} id
 * @param {?} bindings
 * @return {?}
 */
function queryDef(flags, id, bindings) {
    let /** @type {?} */ bindingDefs = [];
    for (let /** @type {?} */ propName in bindings) {
        const /** @type {?} */ bindingType = bindings[propName];
        bindingDefs.push({ propName, bindingType });
    }
    return {
        type: NodeType.Query,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        childFlags: 0,
        childMatchedQueries: 0,
        ngContentIndex: undefined,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {},
        childCount: 0,
        bindings: [],
        disposableCount: 0,
        element: undefined,
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: { id, filterId: filterQueryId(id), bindings: bindingDefs },
        ngContent: undefined
    };
}
/**
 * @return {?}
 */
function createQuery() {
    return new QueryList();
}
/**
 * @param {?} view
 * @return {?}
 */
function dirtyParentQueries(view) {
    const /** @type {?} */ queryIds = view.def.nodeMatchedQueries;
    while (view.parent && isEmbeddedView(view)) {
        let /** @type {?} */ tplDef = view.parentNodeDef;
        view = view.parent;
        // content queries
        const /** @type {?} */ end = tplDef.index + tplDef.childCount;
        for (let /** @type {?} */ i = 0; i <= end; i++) {
            const /** @type {?} */ nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & NodeFlags.HasContentQuery) &&
                (nodeDef.flags & NodeFlags.HasDynamicQuery) &&
                (nodeDef.query.filterId & queryIds) === nodeDef.query.filterId) {
                asQueryList(view, i).setDirty();
            }
            if ((nodeDef.type === NodeType.Element && i + nodeDef.childCount < tplDef.index) ||
                !(nodeDef.childFlags & NodeFlags.HasContentQuery) ||
                !(nodeDef.childFlags & NodeFlags.HasDynamicQuery)) {
                // skip elements that don't contain the template element or no query.
                i += nodeDef.childCount;
            }
        }
    }
    // view queries
    if (view.def.nodeFlags & NodeFlags.HasViewQuery) {
        for (let /** @type {?} */ i = 0; i < view.def.nodes.length; i++) {
            const /** @type {?} */ nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & NodeFlags.HasViewQuery) && (nodeDef.flags & NodeFlags.HasDynamicQuery)) {
                asQueryList(view, i).setDirty();
            }
            // only visit the root nodes
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @return {?}
 */
function checkAndUpdateQuery(view, nodeDef) {
    const /** @type {?} */ queryList = asQueryList(view, nodeDef.index);
    if (!queryList.dirty) {
        return;
    }
    let /** @type {?} */ directiveInstance;
    let /** @type {?} */ newValues;
    if (nodeDef.flags & NodeFlags.HasContentQuery) {
        const /** @type {?} */ elementDef = nodeDef.parent.parent;
        newValues = calcQueryValues(view, elementDef.index, elementDef.index + elementDef.childCount, nodeDef.query, []);
        directiveInstance = asProviderData(view, nodeDef.parent.index).instance;
    }
    else if (nodeDef.flags & NodeFlags.HasViewQuery) {
        newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, nodeDef.query, []);
        directiveInstance = view.component;
    }
    queryList.reset(newValues);
    const /** @type {?} */ bindings = nodeDef.query.bindings;
    let /** @type {?} */ notify = false;
    for (let /** @type {?} */ i = 0; i < bindings.length; i++) {
        const /** @type {?} */ binding = bindings[i];
        let /** @type {?} */ boundValue;
        switch (binding.bindingType) {
            case QueryBindingType.First:
                boundValue = queryList.first;
                break;
            case QueryBindingType.All:
                boundValue = queryList;
                notify = true;
                break;
        }
        directiveInstance[binding.propName] = boundValue;
    }
    if (notify) {
        queryList.notifyOnChanges();
    }
}
/**
 * @param {?} view
 * @param {?} startIndex
 * @param {?} endIndex
 * @param {?} queryDef
 * @param {?} values
 * @return {?}
 */
function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
    for (let /** @type {?} */ i = startIndex; i <= endIndex; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        const /** @type {?} */ valueType = nodeDef.matchedQueries[queryDef.id];
        if (valueType != null) {
            values.push(getQueryValue(view, nodeDef, valueType));
        }
        if (nodeDef.type === NodeType.Element && nodeDef.element.template &&
            (nodeDef.element.template.nodeMatchedQueries & queryDef.filterId) === queryDef.filterId) {
            // check embedded views that were attached at the place of their template.
            const /** @type {?} */ elementData = asElementData(view, i);
            const /** @type {?} */ embeddedViews = elementData.embeddedViews;
            if (embeddedViews) {
                for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                    const /** @type {?} */ embeddedView = embeddedViews[k];
                    const /** @type {?} */ dvc = declaredViewContainer(embeddedView);
                    if (dvc && dvc === elementData) {
                        calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                    }
                }
            }
            const /** @type {?} */ projectedViews = elementData.projectedViews;
            if (projectedViews) {
                for (let /** @type {?} */ k = 0; k < projectedViews.length; k++) {
                    const /** @type {?} */ projectedView = projectedViews[k];
                    calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                }
            }
        }
        if ((nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId) {
            // if no child matches the query, skip the children.
            i += nodeDef.childCount;
        }
    }
    return values;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} queryValueType
 * @return {?}
 */
function getQueryValue(view, nodeDef, queryValueType) {
    if (queryValueType != null) {
        // a match
        let /** @type {?} */ value;
        switch (queryValueType) {
            case QueryValueType.RenderElement:
                value = asElementData(view, nodeDef.index).renderElement;
                break;
            case QueryValueType.ElementRef:
                value = new ElementRef(asElementData(view, nodeDef.index).renderElement);
                break;
            case QueryValueType.TemplateRef:
                value = createTemplateRef(view, nodeDef);
                break;
            case QueryValueType.ViewContainerRef:
                value = createViewContainerRef(view, nodeDef);
                break;
            case QueryValueType.Provider:
                value = asProviderData(view, nodeDef.index).instance;
                break;
        }
        return value;
    }
}

/**
 * @param {?} ngContentIndex
 * @param {?} constants
 * @return {?}
 */
function textDef(ngContentIndex, constants) {
    // skip the call to sliceErrorStack itself + the call to this function.
    const /** @type {?} */ source = isDevMode() ? sliceErrorStack(2, 3) : '';
    const /** @type {?} */ bindings = new Array(constants.length - 1);
    for (let /** @type {?} */ i = 1; i < constants.length; i++) {
        bindings[i - 1] = {
            type: BindingType.TextInterpolation,
            name: undefined,
            ns: undefined,
            nonMinifiedName: undefined,
            securityContext: undefined,
            suffix: constants[i]
        };
    }
    return {
        type: NodeType.Text,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        renderParent: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags: 0,
        childFlags: 0,
        childMatchedQueries: 0,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {}, ngContentIndex,
        childCount: 0, bindings,
        disposableCount: 0,
        element: undefined,
        provider: undefined,
        text: { prefix: constants[0], source },
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
function createText(view, renderHost, def) {
    let /** @type {?} */ renderNode;
    const /** @type {?} */ renderer = view.renderer;
    renderNode = renderer.createText(def.text.prefix);
    const /** @type {?} */ parentEl = getParentRenderElement(view, renderHost, def);
    if (parentEl) {
        renderer.appendChild(parentEl, renderNode);
    }
    return { renderText: renderNode };
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    let /** @type {?} */ changed = false;
    const /** @type {?} */ bindings = def.bindings;
    const /** @type {?} */ bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    if (changed) {
        let /** @type {?} */ value = def.text.prefix;
        if (bindLen > 0)
            value += _addInterpolationPart(v0, bindings[0]);
        if (bindLen > 1)
            value += _addInterpolationPart(v1, bindings[1]);
        if (bindLen > 2)
            value += _addInterpolationPart(v2, bindings[2]);
        if (bindLen > 3)
            value += _addInterpolationPart(v3, bindings[3]);
        if (bindLen > 4)
            value += _addInterpolationPart(v4, bindings[4]);
        if (bindLen > 5)
            value += _addInterpolationPart(v5, bindings[5]);
        if (bindLen > 6)
            value += _addInterpolationPart(v6, bindings[6]);
        if (bindLen > 7)
            value += _addInterpolationPart(v7, bindings[7]);
        if (bindLen > 8)
            value += _addInterpolationPart(v8, bindings[8]);
        if (bindLen > 9)
            value += _addInterpolationPart(v9, bindings[9]);
        const /** @type {?} */ renderNode = asTextData(view, def.index).renderText;
        view.renderer.setValue(renderNode, value);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
function checkAndUpdateTextDynamic(view, def, values) {
    const /** @type {?} */ bindings = def.bindings;
    let /** @type {?} */ changed = false;
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    if (changed) {
        let /** @type {?} */ value = '';
        for (let /** @type {?} */ i = 0; i < values.length; i++) {
            value = value + _addInterpolationPart(values[i], bindings[i]);
        }
        value = def.text.prefix + value;
        const /** @type {?} */ renderNode = asTextData(view, def.index).renderText;
        view.renderer.setValue(renderNode, value);
    }
}
/**
 * @param {?} value
 * @param {?} binding
 * @return {?}
 */
function _addInterpolationPart(value, binding) {
    const /** @type {?} */ valueStr = value != null ? value.toString() : '';
    return valueStr + binding.suffix;
}

const /** @type {?} */ NOOP$1 = () => undefined;
/**
 * @param {?} flags
 * @param {?} nodes
 * @param {?=} updateDirectives
 * @param {?=} updateRenderer
 * @return {?}
 */
function viewDef(flags, nodes, updateDirectives, updateRenderer) {
    // clone nodes and set auto calculated values
    if (nodes.length === 0) {
        throw new Error(`Illegal State: Views without nodes are not allowed!`);
    }
    const /** @type {?} */ reverseChildNodes = new Array(nodes.length);
    let /** @type {?} */ viewBindingCount = 0;
    let /** @type {?} */ viewDisposableCount = 0;
    let /** @type {?} */ viewNodeFlags = 0;
    let /** @type {?} */ viewMatchedQueries = 0;
    let /** @type {?} */ currentParent = null;
    let /** @type {?} */ currentElementHasPublicProviders = false;
    let /** @type {?} */ currentElementHasPrivateProviders = false;
    let /** @type {?} */ lastRenderRootNode = null;
    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
        while (currentParent && i > currentParent.index + currentParent.childCount) {
            const /** @type {?} */ newParent = currentParent.parent;
            if (newParent) {
                newParent.childFlags |= currentParent.childFlags;
                newParent.childMatchedQueries |= currentParent.childMatchedQueries;
            }
            currentParent = newParent;
        }
        const /** @type {?} */ node = nodes[i];
        node.index = i;
        node.parent = currentParent;
        node.bindingIndex = viewBindingCount;
        node.disposableIndex = viewDisposableCount;
        node.reverseChildIndex =
            calculateReverseChildIndex(currentParent, i, node.childCount, nodes.length);
        // renderParent needs to account for ng-container!
        let /** @type {?} */ currentRenderParent;
        if (currentParent && currentParent.type === NodeType.Element && !currentParent.element.name) {
            currentRenderParent = currentParent.renderParent;
        }
        else {
            currentRenderParent = currentParent;
        }
        node.renderParent = currentRenderParent;
        if (node.element) {
            const /** @type {?} */ elDef = node.element;
            elDef.publicProviders =
                currentParent ? currentParent.element.publicProviders : Object.create(null);
            elDef.allProviders = elDef.publicProviders;
            // Note: We assume that all providers of an element are before any child element!
            currentElementHasPublicProviders = false;
            currentElementHasPrivateProviders = false;
        }
        reverseChildNodes[node.reverseChildIndex] = node;
        validateNode(currentParent, node, nodes.length);
        viewNodeFlags |= node.flags;
        viewMatchedQueries |= node.matchedQueryIds;
        if (node.element && node.element.template) {
            viewMatchedQueries |= node.element.template.nodeMatchedQueries;
        }
        if (currentParent) {
            currentParent.childFlags |= node.flags;
            currentParent.childMatchedQueries |= node.matchedQueryIds;
            if (node.element && node.element.template) {
                currentParent.childMatchedQueries |= node.element.template.nodeMatchedQueries;
            }
        }
        viewBindingCount += node.bindings.length;
        viewDisposableCount += node.disposableCount;
        if (!currentRenderParent && (node.type === NodeType.Element || node.type === NodeType.Text)) {
            lastRenderRootNode = node;
        }
        if (node.type === NodeType.Provider || node.type === NodeType.Directive) {
            if (!currentElementHasPublicProviders) {
                currentElementHasPublicProviders = true;
                // Use protoypical inheritance to not get O(n^2) complexity...
                currentParent.element.publicProviders =
                    Object.create(currentParent.element.publicProviders);
                currentParent.element.allProviders = currentParent.element.publicProviders;
            }
            const /** @type {?} */ isPrivateService = (node.flags & NodeFlags.PrivateProvider) !== 0;
            const /** @type {?} */ isComponent = (node.flags & NodeFlags.HasComponent) !== 0;
            if (!isPrivateService || isComponent) {
                currentParent.element.publicProviders[node.provider.tokenKey] = node;
            }
            else {
                if (!currentElementHasPrivateProviders) {
                    currentElementHasPrivateProviders = true;
                    // Use protoypical inheritance to not get O(n^2) complexity...
                    currentParent.element.allProviders = Object.create(currentParent.element.publicProviders);
                }
                currentParent.element.allProviders[node.provider.tokenKey] = node;
            }
            if (isComponent) {
                currentParent.element.component = node;
            }
        }
        if (node.childCount) {
            currentParent = node;
        }
    }
    while (currentParent) {
        const /** @type {?} */ newParent = currentParent.parent;
        if (newParent) {
            newParent.childFlags |= currentParent.childFlags;
            newParent.childMatchedQueries |= currentParent.childMatchedQueries;
        }
        currentParent = newParent;
    }
    const /** @type {?} */ handleEvent = (view, nodeIndex, eventName, event) => nodes[nodeIndex].element.handleEvent(view, eventName, event);
    return {
        nodeFlags: viewNodeFlags,
        nodeMatchedQueries: viewMatchedQueries, flags,
        nodes: nodes, reverseChildNodes,
        updateDirectives: updateDirectives || NOOP$1,
        updateRenderer: updateRenderer || NOOP$1,
        handleEvent: handleEvent || NOOP$1,
        bindingCount: viewBindingCount,
        disposableCount: viewDisposableCount, lastRenderRootNode
    };
}
/**
 * @param {?} currentParent
 * @param {?} i
 * @param {?} childCount
 * @param {?} nodeCount
 * @return {?}
 */
function calculateReverseChildIndex(currentParent, i, childCount, nodeCount) {
    // Notes about reverse child order:
    // - Every node is directly before its children, in dfs and reverse child order.
    // - node.childCount contains all children, in dfs and reverse child order.
    // - In dfs order, every node is before its first child
    // - In reverse child order, every node is before its last child
    // Algorithm, main idea:
    // - In reverse child order, the ranges for each child + its transitive children are mirrored
    //   regarding their position inside of their parent
    // Visualization:
    // Given the following tree:
    // Nodes: n0
    //             n1         n2
    //                n11 n12    n21 n22
    // dfs:    0   1   2   3  4   5   6
    // result: 0   4   6   5  1   3   2
    //
    // Example:
    // Current node = 1
    // 1) lastChildIndex = 3
    // 2) lastChildOffsetRelativeToParentInDfsOrder = 2
    // 3) parentEndIndexInReverseChildOrder = 6
    // 4) result = 4
    let /** @type {?} */ lastChildOffsetRelativeToParentInDfsOrder;
    let /** @type {?} */ parentEndIndexInReverseChildOrder;
    if (currentParent) {
        const /** @type {?} */ lastChildIndex = i + childCount;
        lastChildOffsetRelativeToParentInDfsOrder = lastChildIndex - currentParent.index - 1;
        parentEndIndexInReverseChildOrder = currentParent.reverseChildIndex + currentParent.childCount;
    }
    else {
        lastChildOffsetRelativeToParentInDfsOrder = i + childCount;
        parentEndIndexInReverseChildOrder = nodeCount - 1;
    }
    return parentEndIndexInReverseChildOrder - lastChildOffsetRelativeToParentInDfsOrder;
}
/**
 * @param {?} parent
 * @param {?} node
 * @param {?} nodeCount
 * @return {?}
 */
function validateNode(parent, node, nodeCount) {
    const /** @type {?} */ template = node.element && node.element.template;
    if (template) {
        if (template.lastRenderRootNode &&
            template.lastRenderRootNode.flags & NodeFlags.HasEmbeddedViews) {
            throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${node.index}!`);
        }
    }
    if (node.type === NodeType.Provider || node.type === NodeType.Directive) {
        const /** @type {?} */ parentType = parent ? parent.type : null;
        if (parentType !== NodeType.Element) {
            throw new Error(`Illegal State: Provider/Directive nodes need to be children of elements or anchors, at index ${node.index}!`);
        }
    }
    if (node.query) {
        if (node.flags & NodeFlags.HasContentQuery && (!parent || parent.type !== NodeType.Directive)) {
            throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${node.index}!`);
        }
        if (node.flags & NodeFlags.HasViewQuery && parent) {
            throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${node.index}!`);
        }
    }
    if (node.childCount) {
        const /** @type {?} */ parentEnd = parent ? parent.index + parent.childCount : nodeCount - 1;
        if (node.index <= parentEnd && node.index + node.childCount > parentEnd) {
            throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${node.index}!`);
        }
    }
}
/**
 * @param {?} parent
 * @param {?} anchorDef
 * @param {?=} context
 * @return {?}
 */
function createEmbeddedView(parent, anchorDef, context) {
    // embedded views are seen as siblings to the anchor, so we need
    // to get the parent of the anchor and use it as parentIndex.
    const /** @type {?} */ view = createView(parent.root, parent.renderer, parent, anchorDef, anchorDef.element.template);
    initView(view, parent.component, context);
    createViewNodes(view);
    return view;
}
/**
 * @param {?} root
 * @param {?} def
 * @param {?=} context
 * @return {?}
 */
function createRootView(root, def, context) {
    const /** @type {?} */ view = createView(root, root.renderer, null, null, def);
    initView(view, context, context);
    createViewNodes(view);
    return view;
}
/**
 * @param {?} root
 * @param {?} renderer
 * @param {?} parent
 * @param {?} parentNodeDef
 * @param {?} def
 * @return {?}
 */
function createView(root, renderer, parent, parentNodeDef, def) {
    const /** @type {?} */ nodes = new Array(def.nodes.length);
    const /** @type {?} */ disposables = def.disposableCount ? new Array(def.disposableCount) : undefined;
    const /** @type {?} */ view = {
        def,
        parent,
        parentNodeDef,
        context: undefined,
        component: undefined, nodes,
        state: ViewState.FirstCheck | ViewState.ChecksEnabled, root, renderer,
        oldValues: new Array(def.bindingCount), disposables
    };
    return view;
}
/**
 * @param {?} view
 * @param {?} component
 * @param {?} context
 * @return {?}
 */
function initView(view, component, context) {
    view.component = component;
    view.context = context;
}
/**
 * @param {?} view
 * @return {?}
 */
function createViewNodes(view) {
    let /** @type {?} */ renderHost;
    if (isComponentView(view)) {
        const /** @type {?} */ hostDef = view.parentNodeDef;
        renderHost = asElementData(view.parent, hostDef.parent.index).renderElement;
    }
    const /** @type {?} */ def = view.def;
    const /** @type {?} */ nodes = view.nodes;
    for (let /** @type {?} */ i = 0; i < def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = def.nodes[i];
        Services.setCurrentNode(view, i);
        switch (nodeDef.type) {
            case NodeType.Element:
                nodes[i] = (createElement(view, renderHost, nodeDef));
                break;
            case NodeType.Text:
                nodes[i] = (createText(view, renderHost, nodeDef));
                break;
            case NodeType.Provider: {
                const /** @type {?} */ instance = createProviderInstance(view, nodeDef);
                const /** @type {?} */ providerData = ({ componentView: undefined, instance });
                nodes[i] = (providerData);
                break;
            }
            case NodeType.Pipe: {
                const /** @type {?} */ instance = createPipeInstance(view, nodeDef);
                const /** @type {?} */ providerData = ({ componentView: undefined, instance });
                nodes[i] = (providerData);
                break;
            }
            case NodeType.Directive: {
                if (nodeDef.flags & NodeFlags.HasComponent) {
                    // Components can inject a ChangeDetectorRef that needs a references to
                    // the component view. Therefore, we create the component view first
                    // and set the ProviderData in ViewData, and then instantiate the provider.
                    const /** @type {?} */ compViewDef = resolveViewDefinition(nodeDef.provider.component);
                    const /** @type {?} */ rendererType = nodeDef.provider.rendererType;
                    let /** @type {?} */ compRenderer;
                    if (!rendererType) {
                        compRenderer = view.root.renderer;
                    }
                    else {
                        const /** @type {?} */ hostEl = asElementData(view, nodeDef.parent.index).renderElement;
                        compRenderer = view.root.rendererFactory.createRenderer(hostEl, rendererType);
                    }
                    const /** @type {?} */ componentView = createView(view.root, compRenderer, view, nodeDef, compViewDef);
                    const /** @type {?} */ providerData = ({ componentView, instance: undefined });
                    nodes[i] = (providerData);
                    const /** @type {?} */ instance = providerData.instance = createDirectiveInstance(view, nodeDef);
                    initView(componentView, instance, instance);
                }
                else {
                    const /** @type {?} */ instance = createDirectiveInstance(view, nodeDef);
                    const /** @type {?} */ providerData = ({ componentView: undefined, instance });
                    nodes[i] = (providerData);
                }
                break;
            }
            case NodeType.PureExpression:
                nodes[i] = (createPureExpression(view, nodeDef));
                break;
            case NodeType.Query:
                nodes[i] = (createQuery());
                break;
            case NodeType.NgContent:
                appendNgContent(view, renderHost, nodeDef);
                // no runtime data needed for NgContent...
                nodes[i] = undefined;
                break;
        }
    }
    // Create the ViewData.nodes of component views after we created everything else,
    // so that e.g. ng-content works
    execComponentViewsAction(view, ViewAction.CreateViewNodes);
    // fill static content and view queries
    execQueriesAction(view, NodeFlags.HasContentQuery | NodeFlags.HasViewQuery, NodeFlags.HasStaticQuery, QueryAction.CheckAndUpdate);
}
/**
 * @param {?} view
 * @return {?}
 */
function checkNoChangesView(view) {
    Services.updateDirectives(checkNoChangesNode, view);
    execEmbeddedViewsAction(view, ViewAction.CheckNoChanges);
    execQueriesAction(view, NodeFlags.HasContentQuery, NodeFlags.HasDynamicQuery, QueryAction.CheckNoChanges);
    Services.updateRenderer(checkNoChangesNode, view);
    execComponentViewsAction(view, ViewAction.CheckNoChanges);
    execQueriesAction(view, NodeFlags.HasViewQuery, NodeFlags.HasDynamicQuery, QueryAction.CheckNoChanges);
}
/**
 * @param {?} view
 * @return {?}
 */
function checkAndUpdateView(view) {
    Services.updateDirectives(checkAndUpdateNode, view);
    execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, NodeFlags.HasContentQuery, NodeFlags.HasDynamicQuery, QueryAction.CheckAndUpdate);
    callLifecycleHooksChildrenFirst(view, NodeFlags.AfterContentChecked |
        (view.state & ViewState.FirstCheck ? NodeFlags.AfterContentInit : 0));
    Services.updateRenderer(checkAndUpdateNode, view);
    execComponentViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, NodeFlags.HasViewQuery, NodeFlags.HasDynamicQuery, QueryAction.CheckAndUpdate);
    callLifecycleHooksChildrenFirst(view, NodeFlags.AfterViewChecked |
        (view.state & ViewState.FirstCheck ? NodeFlags.AfterViewInit : 0));
    if (view.def.flags & ViewFlags.OnPush) {
        view.state &= ~ViewState.ChecksEnabled;
    }
    view.state &= ~ViewState.FirstCheck;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} argStyle
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
function checkAndUpdateNode(view, nodeIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === ArgumentType.Inline) {
        return checkAndUpdateNodeInline(view, nodeIndex, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        return checkAndUpdateNodeDynamic(view, nodeIndex, v0);
    }
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
function checkAndUpdateNodeInline(view, nodeIndex, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
    switch (nodeDef.type) {
        case NodeType.Element:
            return checkAndUpdateElementInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case NodeType.Text:
            return checkAndUpdateTextInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case NodeType.Directive:
            return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case NodeType.PureExpression:
            return checkAndUpdatePureExpressionInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} values
 * @return {?}
 */
function checkAndUpdateNodeDynamic(view, nodeIndex, values) {
    const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
    switch (nodeDef.type) {
        case NodeType.Element:
            return checkAndUpdateElementDynamic(view, nodeDef, values);
        case NodeType.Text:
            return checkAndUpdateTextDynamic(view, nodeDef, values);
        case NodeType.Directive:
            return checkAndUpdateDirectiveDynamic(view, nodeDef, values);
        case NodeType.PureExpression:
            return checkAndUpdatePureExpressionDynamic(view, nodeDef, values);
    }
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} argStyle
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
function checkNoChangesNode(view, nodeIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === ArgumentType.Inline) {
        return checkNoChangesNodeInline(view, nodeIndex, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        return checkNoChangesNodeDynamic(view, nodeIndex, v0);
    }
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkNoChangesNodeInline(view, nodeIndex, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
    const /** @type {?} */ bindLen = nodeDef.bindings.length;
    if (bindLen > 0)
        checkBindingNoChanges(view, nodeDef, 0, v0);
    if (bindLen > 1)
        checkBindingNoChanges(view, nodeDef, 1, v1);
    if (bindLen > 2)
        checkBindingNoChanges(view, nodeDef, 2, v2);
    if (bindLen > 3)
        checkBindingNoChanges(view, nodeDef, 3, v3);
    if (bindLen > 4)
        checkBindingNoChanges(view, nodeDef, 4, v4);
    if (bindLen > 5)
        checkBindingNoChanges(view, nodeDef, 5, v5);
    if (bindLen > 6)
        checkBindingNoChanges(view, nodeDef, 6, v6);
    if (bindLen > 7)
        checkBindingNoChanges(view, nodeDef, 7, v7);
    if (bindLen > 8)
        checkBindingNoChanges(view, nodeDef, 8, v8);
    if (bindLen > 9)
        checkBindingNoChanges(view, nodeDef, 9, v9);
    return nodeDef.type === NodeType.PureExpression ? asPureExpressionData(view, nodeIndex).value :
        undefined;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} values
 * @return {?}
 */
function checkNoChangesNodeDynamic(view, nodeIndex, values) {
    const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        checkBindingNoChanges(view, nodeDef, i, values[i]);
    }
    return nodeDef.type === NodeType.PureExpression ? asPureExpressionData(view, nodeIndex).value :
        undefined;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @return {?}
 */
function checkNoChangesQuery(view, nodeDef) {
    const /** @type {?} */ queryList = asQueryList(view, nodeDef.index);
    if (queryList.dirty) {
        throw expressionChangedAfterItHasBeenCheckedError$1(Services.createDebugContext(view, nodeDef.index), `Query ${nodeDef.query.id} not dirty`, `Query ${nodeDef.query.id} dirty`, (view.state & ViewState.FirstCheck) !== 0);
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function destroyView(view) {
    if (view.state & ViewState.Destroyed) {
        return;
    }
    execEmbeddedViewsAction(view, ViewAction.Destroy);
    execComponentViewsAction(view, ViewAction.Destroy);
    callLifecycleHooksChildrenFirst(view, NodeFlags.OnDestroy);
    if (view.disposables) {
        for (let /** @type {?} */ i = 0; i < view.disposables.length; i++) {
            view.disposables[i]();
        }
    }
    if (view.renderer.destroyNode) {
        destroyViewNodes(view);
    }
    if (view.parentNodeDef && view.parentNodeDef.flags & NodeFlags.HasComponent) {
        view.renderer.destroy();
    }
    view.state |= ViewState.Destroyed;
}
/**
 * @param {?} view
 * @return {?}
 */
function destroyViewNodes(view) {
    const /** @type {?} */ len = view.def.nodes.length;
    for (let /** @type {?} */ i = 0; i < len; i++) {
        const /** @type {?} */ def = view.def.nodes[i];
        if (def.type === NodeType.Element) {
            view.renderer.destroyNode(asElementData(view, i).renderElement);
        }
        else if (def.type === NodeType.Text) {
            view.renderer.destroyNode(asTextData(view, i).renderText);
        }
    }
}
let ViewAction = {};
ViewAction.CreateViewNodes = 0;
ViewAction.CheckNoChanges = 1;
ViewAction.CheckAndUpdate = 2;
ViewAction.Destroy = 3;
ViewAction[ViewAction.CreateViewNodes] = "CreateViewNodes";
ViewAction[ViewAction.CheckNoChanges] = "CheckNoChanges";
ViewAction[ViewAction.CheckAndUpdate] = "CheckAndUpdate";
ViewAction[ViewAction.Destroy] = "Destroy";
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function execComponentViewsAction(view, action) {
    const /** @type {?} */ def = view.def;
    if (!(def.nodeFlags & NodeFlags.HasComponent)) {
        return;
    }
    for (let /** @type {?} */ i = 0; i < def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = def.nodes[i];
        if (nodeDef.flags & NodeFlags.HasComponent) {
            // a leaf
            const /** @type {?} */ providerData = asProviderData(view, i);
            callViewAction(providerData.componentView, action);
        }
        else if ((nodeDef.childFlags & NodeFlags.HasComponent) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function execEmbeddedViewsAction(view, action) {
    const /** @type {?} */ def = view.def;
    if (!(def.nodeFlags & NodeFlags.HasEmbeddedViews)) {
        return;
    }
    for (let /** @type {?} */ i = 0; i < def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = def.nodes[i];
        if (nodeDef.flags & NodeFlags.HasEmbeddedViews) {
            // a leaf
            const /** @type {?} */ embeddedViews = asElementData(view, i).embeddedViews;
            if (embeddedViews) {
                for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                    callViewAction(embeddedViews[k], action);
                }
            }
        }
        else if ((nodeDef.childFlags & NodeFlags.HasEmbeddedViews) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function callViewAction(view, action) {
    const /** @type {?} */ viewState = view.state;
    switch (action) {
        case ViewAction.CheckNoChanges:
            if ((viewState & ViewState.ChecksEnabled) &&
                (viewState & (ViewState.Errored | ViewState.Destroyed)) === 0) {
                checkNoChangesView(view);
            }
            break;
        case ViewAction.CheckAndUpdate:
            if ((viewState & ViewState.ChecksEnabled) &&
                (viewState & (ViewState.Errored | ViewState.Destroyed)) === 0) {
                checkAndUpdateView(view);
            }
            break;
        case ViewAction.Destroy:
            destroyView(view);
            break;
        case ViewAction.CreateViewNodes:
            createViewNodes(view);
            break;
    }
}
let QueryAction = {};
QueryAction.CheckAndUpdate = 0;
QueryAction.CheckNoChanges = 1;
QueryAction[QueryAction.CheckAndUpdate] = "CheckAndUpdate";
QueryAction[QueryAction.CheckNoChanges] = "CheckNoChanges";
/**
 * @param {?} view
 * @param {?} queryFlags
 * @param {?} staticDynamicQueryFlag
 * @param {?} action
 * @return {?}
 */
function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, action) {
    if (!(view.def.nodeFlags & queryFlags) || !(view.def.nodeFlags & staticDynamicQueryFlag)) {
        return;
    }
    const /** @type {?} */ nodeCount = view.def.nodes.length;
    for (let /** @type {?} */ i = 0; i < nodeCount; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        if ((nodeDef.flags & queryFlags) && (nodeDef.flags & staticDynamicQueryFlag)) {
            Services.setCurrentNode(view, nodeDef.index);
            switch (action) {
                case QueryAction.CheckAndUpdate:
                    checkAndUpdateQuery(view, nodeDef);
                    break;
                case QueryAction.CheckNoChanges:
                    checkNoChangesQuery(view, nodeDef);
                    break;
            }
        }
        if (!(nodeDef.childFlags & queryFlags) || !(nodeDef.childFlags & staticDynamicQueryFlag)) {
            // no child has a matching query
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}

/**
 * @param {?} elementData
 * @param {?} viewIndex
 * @param {?} view
 * @return {?}
 */
function attachEmbeddedView(elementData, viewIndex, view) {
    let /** @type {?} */ embeddedViews = elementData.embeddedViews;
    if (viewIndex == null) {
        viewIndex = embeddedViews.length;
    }
    addToArray$1(embeddedViews, viewIndex, view);
    const /** @type {?} */ dvcElementData = declaredViewContainer(view);
    if (dvcElementData && dvcElementData !== elementData) {
        let /** @type {?} */ projectedViews = dvcElementData.projectedViews;
        if (!projectedViews) {
            projectedViews = dvcElementData.projectedViews = [];
        }
        projectedViews.push(view);
    }
    dirtyParentQueries(view);
    const /** @type {?} */ prevView = viewIndex > 0 ? embeddedViews[viewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
}
/**
 * @param {?} elementData
 * @param {?} viewIndex
 * @return {?}
 */
function detachEmbeddedView(elementData, viewIndex) {
    const /** @type {?} */ embeddedViews = elementData.embeddedViews;
    if (viewIndex == null || viewIndex >= embeddedViews.length) {
        viewIndex = embeddedViews.length - 1;
    }
    if (viewIndex < 0) {
        return null;
    }
    const /** @type {?} */ view = embeddedViews[viewIndex];
    removeFromArray(embeddedViews, viewIndex);
    const /** @type {?} */ dvcElementData = declaredViewContainer(view);
    if (dvcElementData && dvcElementData !== elementData) {
        const /** @type {?} */ projectedViews = dvcElementData.projectedViews;
        removeFromArray(projectedViews, projectedViews.indexOf(view));
    }
    dirtyParentQueries(view);
    renderDetachEmbeddedView(elementData, view);
    return view;
}
/**
 * @param {?} elementData
 * @param {?} oldViewIndex
 * @param {?} newViewIndex
 * @return {?}
 */
function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
    const /** @type {?} */ embeddedViews = elementData.embeddedViews;
    const /** @type {?} */ view = embeddedViews[oldViewIndex];
    removeFromArray(embeddedViews, oldViewIndex);
    if (newViewIndex == null) {
        newViewIndex = embeddedViews.length;
    }
    addToArray$1(embeddedViews, newViewIndex, view);
    // Note: Don't need to change projectedViews as the order in there
    // as always invalid...
    dirtyParentQueries(view);
    renderDetachEmbeddedView(elementData, view);
    const /** @type {?} */ prevView = newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
    return view;
}
/**
 * @param {?} elementData
 * @param {?} prevView
 * @param {?} view
 * @return {?}
 */
function renderAttachEmbeddedView(elementData, prevView, view) {
    const /** @type {?} */ prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRenderRootNode) : elementData.renderElement;
    const /** @type {?} */ parentNode = view.renderer.parentNode(prevRenderNode);
    const /** @type {?} */ nextSibling = view.renderer.nextSibling(prevRenderNode);
    // Note: We can't check if `nextSibling` is present, as on WebWorkers it will always be!
    // However, browsers automatically do `appendChild` when there is no `nextSibling`.
    visitRootRenderNodes(view, RenderNodeAction.InsertBefore, parentNode, nextSibling, undefined);
}
/**
 * @param {?} elementData
 * @param {?} view
 * @return {?}
 */
function renderDetachEmbeddedView(elementData, view) {
    const /** @type {?} */ parentNode = view.renderer.parentNode(elementData.renderElement);
    visitRootRenderNodes(view, RenderNodeAction.RemoveChild, parentNode, null, undefined);
}
/**
 * @param {?} arr
 * @param {?} index
 * @param {?} value
 * @return {?}
 */
function addToArray$1(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
/**
 * @param {?} arr
 * @param {?} index
 * @return {?}
 */
function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        arr.pop();
    }
    else {
        arr.splice(index, 1);
    }
}

let /** @type {?} */ initialized = false;
/**
 * @return {?}
 */
function initServicesIfNeeded() {
    if (initialized) {
        return;
    }
    initialized = true;
    const /** @type {?} */ services = isDevMode() ? createDebugServices() : createProdServices();
    Services.setCurrentNode = services.setCurrentNode;
    Services.createRootView = services.createRootView;
    Services.createEmbeddedView = services.createEmbeddedView;
    Services.checkAndUpdateView = services.checkAndUpdateView;
    Services.checkNoChangesView = services.checkNoChangesView;
    Services.destroyView = services.destroyView;
    Services.attachEmbeddedView = services.attachEmbeddedView,
        Services.detachEmbeddedView = services.detachEmbeddedView,
        Services.moveEmbeddedView = services.moveEmbeddedView;
    Services.resolveDep = services.resolveDep;
    Services.createDebugContext = services.createDebugContext;
    Services.handleEvent = services.handleEvent;
    Services.updateDirectives = services.updateDirectives;
    Services.updateRenderer = services.updateRenderer;
}
/**
 * @return {?}
 */
function createProdServices() {
    return {
        setCurrentNode: () => { },
        createRootView: createProdRootView,
        createEmbeddedView: createEmbeddedView,
        checkAndUpdateView: checkAndUpdateView,
        checkNoChangesView: checkNoChangesView,
        destroyView: destroyView,
        attachEmbeddedView: attachEmbeddedView,
        detachEmbeddedView: detachEmbeddedView,
        moveEmbeddedView: moveEmbeddedView,
        resolveDep: resolveDep,
        createDebugContext: (view, nodeIndex) => new DebugContext_(view, nodeIndex),
        handleEvent: (view, nodeIndex, eventName, event) => view.def.handleEvent(view, nodeIndex, eventName, event),
        updateDirectives: (check, view) => view.def.updateDirectives(check, view),
        updateRenderer: (check, view) => view.def.updateRenderer(check, view),
    };
}
/**
 * @return {?}
 */
function createDebugServices() {
    return {
        setCurrentNode: debugSetCurrentNode,
        createRootView: debugCreateRootView,
        createEmbeddedView: debugCreateEmbeddedView,
        checkAndUpdateView: debugCheckAndUpdateView,
        checkNoChangesView: debugCheckNoChangesView,
        destroyView: debugDestroyView,
        attachEmbeddedView: attachEmbeddedView,
        detachEmbeddedView: detachEmbeddedView,
        moveEmbeddedView: moveEmbeddedView,
        resolveDep: resolveDep,
        createDebugContext: (view, nodeIndex) => new DebugContext_(view, nodeIndex),
        handleEvent: debugHandleEvent,
        updateDirectives: debugUpdateDirectives,
        updateRenderer: debugUpdateRenderer
    };
}
/**
 * @param {?} injector
 * @param {?} projectableNodes
 * @param {?} rootSelectorOrNode
 * @param {?} def
 * @param {?=} context
 * @return {?}
 */
function createProdRootView(injector, projectableNodes, rootSelectorOrNode, def, context) {
    const /** @type {?} */ rendererFactory = injector.get(RendererFactoryV2);
    return createRootView(createRootData(injector, rendererFactory, projectableNodes, rootSelectorOrNode), def, context);
}
/**
 * @param {?} injector
 * @param {?} projectableNodes
 * @param {?} rootSelectorOrNode
 * @param {?} def
 * @param {?=} context
 * @return {?}
 */
function debugCreateRootView(injector, projectableNodes, rootSelectorOrNode, def, context) {
    const /** @type {?} */ rendererFactory = injector.get(RendererFactoryV2);
    const /** @type {?} */ root = createRootData(injector, new DebugRendererFactoryV2(rendererFactory), projectableNodes, rootSelectorOrNode);
    return callWithDebugContext(DebugAction.create, createRootView, null, [root, def, context]);
}
/**
 * @param {?} injector
 * @param {?} rendererFactory
 * @param {?} projectableNodes
 * @param {?} rootSelectorOrNode
 * @return {?}
 */
function createRootData(injector, rendererFactory, projectableNodes, rootSelectorOrNode) {
    const /** @type {?} */ sanitizer = injector.get(Sanitizer);
    const /** @type {?} */ renderer = rendererFactory.createRenderer(null, null);
    return {
        injector,
        projectableNodes,
        selectorOrNode: rootSelectorOrNode, sanitizer, rendererFactory, renderer
    };
}
/**
 * @param {?} parent
 * @param {?} anchorDef
 * @param {?=} context
 * @return {?}
 */
function debugCreateEmbeddedView(parent, anchorDef, context) {
    return callWithDebugContext(DebugAction.create, createEmbeddedView, null, [parent, anchorDef, context]);
}
/**
 * @param {?} view
 * @return {?}
 */
function debugCheckAndUpdateView(view) {
    return callWithDebugContext(DebugAction.detectChanges, checkAndUpdateView, null, [view]);
}
/**
 * @param {?} view
 * @return {?}
 */
function debugCheckNoChangesView(view) {
    return callWithDebugContext(DebugAction.checkNoChanges, checkNoChangesView, null, [view]);
}
/**
 * @param {?} view
 * @return {?}
 */
function debugDestroyView(view) {
    return callWithDebugContext(DebugAction.destroy, destroyView, null, [view]);
}
let DebugAction = {};
DebugAction.create = 0;
DebugAction.detectChanges = 1;
DebugAction.checkNoChanges = 2;
DebugAction.destroy = 3;
DebugAction.handleEvent = 4;
DebugAction[DebugAction.create] = "create";
DebugAction[DebugAction.detectChanges] = "detectChanges";
DebugAction[DebugAction.checkNoChanges] = "checkNoChanges";
DebugAction[DebugAction.destroy] = "destroy";
DebugAction[DebugAction.handleEvent] = "handleEvent";
let /** @type {?} */ _currentAction;
let /** @type {?} */ _currentView;
let /** @type {?} */ _currentNodeIndex;
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @return {?}
 */
function debugSetCurrentNode(view, nodeIndex) {
    _currentView = view;
    _currentNodeIndex = nodeIndex;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} eventName
 * @param {?} event
 * @return {?}
 */
function debugHandleEvent(view, nodeIndex, eventName, event) {
    if (view.state & ViewState.Destroyed) {
        throw viewDestroyedError$1(DebugAction[_currentAction]);
    }
    debugSetCurrentNode(view, nodeIndex);
    return callWithDebugContext(DebugAction.handleEvent, view.def.handleEvent, null, [view, nodeIndex, eventName, event]);
}
/**
 * @param {?} check
 * @param {?} view
 * @return {?}
 */
function debugUpdateDirectives(check, view) {
    if (view.state & ViewState.Destroyed) {
        throw viewDestroyedError$1(DebugAction[_currentAction]);
    }
    debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0));
    return view.def.updateDirectives(debugCheckDirectivesFn, view);
    /**
     * @param {?} view
     * @param {?} nodeIndex
     * @param {?} argStyle
     * @param {...?} values
     * @return {?}
     */
    function debugCheckDirectivesFn(view, nodeIndex, argStyle, ...values) {
        const /** @type {?} */ result = debugCheckFn(check, view, nodeIndex, argStyle, values);
        if (view.def.nodes[nodeIndex].type === NodeType.Directive) {
            debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex));
        }
        return result;
    }
    ;
}
/**
 * @param {?} check
 * @param {?} view
 * @return {?}
 */
function debugUpdateRenderer(check, view) {
    if (view.state & ViewState.Destroyed) {
        throw viewDestroyedError$1(DebugAction[_currentAction]);
    }
    debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0));
    return view.def.updateRenderer(debugCheckRenderNodeFn, view);
    /**
     * @param {?} view
     * @param {?} nodeIndex
     * @param {?} argStyle
     * @param {...?} values
     * @return {?}
     */
    function debugCheckRenderNodeFn(view, nodeIndex, argStyle, ...values) {
        const /** @type {?} */ result = debugCheckFn(check, view, nodeIndex, argStyle, values);
        const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
        if (nodeDef.type === NodeType.Element || nodeDef.type === NodeType.Text) {
            debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex));
        }
        return result;
    }
}
/**
 * @param {?} delegate
 * @param {?} view
 * @param {?} nodeIndex
 * @param {?} argStyle
 * @param {?} givenValues
 * @return {?}
 */
function debugCheckFn(delegate, view, nodeIndex, argStyle, givenValues) {
    if (_currentAction === DebugAction.detectChanges) {
        const /** @type {?} */ values = argStyle === ArgumentType.Dynamic ? givenValues[0] : givenValues;
        const /** @type {?} */ nodeDef = view.def.nodes[nodeIndex];
        if (nodeDef.type === NodeType.Directive || nodeDef.type === NodeType.Element) {
            const /** @type {?} */ bindingValues = {};
            for (let /** @type {?} */ i = 0; i < nodeDef.bindings.length; i++) {
                const /** @type {?} */ binding = nodeDef.bindings[i];
                const /** @type {?} */ value = values[i];
                if ((binding.type === BindingType.ElementProperty ||
                    binding.type === BindingType.DirectiveProperty) &&
                    checkBinding$1(view, nodeDef, i, value)) {
                    bindingValues[normalizeDebugBindingName(binding.nonMinifiedName)] =
                        normalizeDebugBindingValue(value);
                }
            }
            const /** @type {?} */ elDef = nodeDef.type === NodeType.Directive ? nodeDef.parent : nodeDef;
            const /** @type {?} */ el = asElementData(view, elDef.index).renderElement;
            if (!elDef.element.name) {
                // a comment.
                view.renderer.setValue(el, `bindings=${JSON.stringify(bindingValues, null, 2)}`);
            }
            else {
                // a regular element.
                for (let /** @type {?} */ attr in bindingValues) {
                    view.renderer.setAttribute(el, attr, bindingValues[attr]);
                }
            }
        }
    }
    return ((delegate))(view, nodeIndex, argStyle, ...givenValues);
}
;
/**
 * @param {?} name
 * @return {?}
 */
function normalizeDebugBindingName(name) {
    // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
    name = camelCaseToDashCase$1(name.replace(/\$/g, '_'));
    return `ng-reflect-${name}`;
}
const /** @type {?} */ CAMEL_CASE_REGEXP$1 = /([A-Z])/g;
/**
 * @param {?} input
 * @return {?}
 */
function camelCaseToDashCase$1(input) {
    return input.replace(CAMEL_CASE_REGEXP$1, (...m) => '-' + m[1].toLowerCase());
}
/**
 * @param {?} value
 * @return {?}
 */
function normalizeDebugBindingValue(value) {
    try {
        // Limit the size of the value as otherwise the DOM just gets polluted.
        return value ? value.toString().slice(0, 20) : value;
    }
    catch (e) {
        return '[ERROR] Exception while trying to serialize the value';
    }
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @return {?}
 */
function nextDirectiveWithBinding(view, nodeIndex) {
    for (let /** @type {?} */ i = nodeIndex; i < view.def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        if (nodeDef.type === NodeType.Directive && nodeDef.bindings && nodeDef.bindings.length) {
            return i;
        }
    }
    return undefined;
}
/**
 * @param {?} view
 * @param {?} nodeIndex
 * @return {?}
 */
function nextRenderNodeWithBinding(view, nodeIndex) {
    for (let /** @type {?} */ i = nodeIndex; i < view.def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        if ((nodeDef.type === NodeType.Element || nodeDef.type === NodeType.Text) && nodeDef.bindings &&
            nodeDef.bindings.length) {
            return i;
        }
    }
    return undefined;
}
class DebugContext_ {
    /**
     * @param {?} view
     * @param {?} nodeIndex
     */
    constructor(view, nodeIndex) {
        this.view = view;
        this.nodeIndex = nodeIndex;
        if (nodeIndex == null) {
            this.nodeIndex = nodeIndex = 0;
        }
        this.nodeDef = view.def.nodes[nodeIndex];
        let elDef = this.nodeDef;
        let elView = view;
        while (elDef && elDef.type !== NodeType.Element) {
            elDef = elDef.parent;
        }
        if (!elDef) {
            while (!elDef && elView) {
                elDef = viewParentEl(elView);
                elView = elView.parent;
            }
        }
        this.elDef = elDef;
        this.elView = elView;
        this.compProviderDef = elView ? this.elDef.element.component : null;
    }
    /**
     * @return {?}
     */
    get injector() { return createInjector(this.elView, this.elDef); }
    /**
     * @return {?}
     */
    get component() {
        if (this.compProviderDef) {
            return asProviderData(this.elView, this.compProviderDef.index).instance;
        }
        return this.view.component;
    }
    /**
     * @return {?}
     */
    get context() {
        if (this.compProviderDef) {
            return asProviderData(this.elView, this.compProviderDef.index).instance;
        }
        return this.view.context;
    }
    /**
     * @return {?}
     */
    get providerTokens() {
        const /** @type {?} */ tokens = [];
        if (this.elDef) {
            for (let /** @type {?} */ i = this.elDef.index + 1; i <= this.elDef.index + this.elDef.childCount; i++) {
                const /** @type {?} */ childDef = this.elView.def.nodes[i];
                if (childDef.type === NodeType.Provider || childDef.type === NodeType.Directive) {
                    tokens.push(childDef.provider.token);
                }
                i += childDef.childCount;
            }
        }
        return tokens;
    }
    /**
     * @return {?}
     */
    get references() {
        const /** @type {?} */ references = {};
        if (this.elDef) {
            collectReferences(this.elView, this.elDef, references);
            for (let /** @type {?} */ i = this.elDef.index + 1; i <= this.elDef.index + this.elDef.childCount; i++) {
                const /** @type {?} */ childDef = this.elView.def.nodes[i];
                if (childDef.type === NodeType.Provider || childDef.type === NodeType.Directive) {
                    collectReferences(this.elView, childDef, references);
                }
                i += childDef.childCount;
            }
        }
        return references;
    }
    /**
     * @return {?}
     */
    get source() {
        if (this.nodeDef.type === NodeType.Text) {
            return this.nodeDef.text.source;
        }
        else {
            return this.elDef.element.source;
        }
    }
    /**
     * @return {?}
     */
    get componentRenderElement() {
        const /** @type {?} */ view = this.compProviderDef ?
            asProviderData(this.elView, this.compProviderDef.index).componentView :
            this.view;
        const /** @type {?} */ elData = findHostElement(view);
        return elData ? elData.renderElement : undefined;
    }
    /**
     * @return {?}
     */
    get renderNode() {
        return this.nodeDef.type === NodeType.Text ? renderNode(this.view, this.nodeDef) :
            renderNode(this.elView, this.elDef);
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function findHostElement(view) {
    while (view && !isComponentView(view)) {
        view = view.parent;
    }
    if (view.parent) {
        return asElementData(view.parent, viewParentEl(view).index);
    }
    return undefined;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} references
 * @return {?}
 */
function collectReferences(view, nodeDef, references) {
    for (let /** @type {?} */ refName in nodeDef.references) {
        references[refName] = getQueryValue(view, nodeDef, nodeDef.references[refName]);
    }
}
/**
 * @param {?} action
 * @param {?} fn
 * @param {?} self
 * @param {?} args
 * @return {?}
 */
function callWithDebugContext(action, fn, self, args) {
    const /** @type {?} */ oldAction = _currentAction;
    const /** @type {?} */ oldView = _currentView;
    const /** @type {?} */ oldNodeIndex = _currentNodeIndex;
    try {
        _currentAction = action;
        const /** @type {?} */ result = fn.apply(self, args);
        _currentView = oldView;
        _currentNodeIndex = oldNodeIndex;
        _currentAction = oldAction;
        return result;
    }
    catch (e) {
        if (isViewDebugError(e) || !_currentView) {
            throw e;
        }
        _currentView.state |= ViewState.Errored;
        throw viewWrappedDebugError(e, getCurrentDebugContext());
    }
}
/**
 * @return {?}
 */
function getCurrentDebugContext() {
    return new DebugContext_(_currentView, _currentNodeIndex);
}
class DebugRendererFactoryV2 {
    /**
     * @param {?} delegate
     */
    constructor(delegate) {
        this.delegate = delegate;
    }
    /**
     * @param {?} element
     * @param {?} renderData
     * @return {?}
     */
    createRenderer(element, renderData) {
        return new DebugRendererV2(this.delegate.createRenderer(element, renderData));
    }
}
class DebugRendererV2 {
    /**
     * @param {?} delegate
     */
    constructor(delegate) {
        this.delegate = delegate;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    destroyNode(node) {
        removeDebugNodeFromIndex(getDebugNode(node));
        if (this.delegate.destroyNode) {
            this.delegate.destroyNode(node);
        }
    }
    /**
     * @return {?}
     */
    destroy() { this.delegate.destroy(); }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        const /** @type {?} */ el = this.delegate.createElement(name, namespace);
        const /** @type {?} */ debugEl = new DebugElement(el, null, getCurrentDebugContext());
        debugEl.name = name;
        indexDebugNode(debugEl);
        return el;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) {
        const /** @type {?} */ comment = this.delegate.createComment(value);
        const /** @type {?} */ debugEl = new DebugNode(comment, null, getCurrentDebugContext());
        indexDebugNode(debugEl);
        return comment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) {
        const /** @type {?} */ text = this.delegate.createText(value);
        const /** @type {?} */ debugEl = new DebugNode(text, null, getCurrentDebugContext());
        indexDebugNode(debugEl);
        return text;
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        const /** @type {?} */ debugEl = getDebugNode(parent);
        const /** @type {?} */ debugChildEl = getDebugNode(newChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
            debugEl.addChild(debugChildEl);
        }
        this.delegate.appendChild(parent, newChild);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        const /** @type {?} */ debugEl = getDebugNode(parent);
        const /** @type {?} */ debugChildEl = getDebugNode(newChild);
        const /** @type {?} */ debugRefEl = getDebugNode(refChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
            debugEl.insertBefore(debugRefEl, debugChildEl);
        }
        this.delegate.insertBefore(parent, newChild, refChild);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        const /** @type {?} */ debugEl = getDebugNode(parent);
        const /** @type {?} */ debugChildEl = getDebugNode(oldChild);
        if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
            debugEl.removeChild(debugChildEl);
        }
        this.delegate.removeChild(parent, oldChild);
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        const /** @type {?} */ el = this.delegate.selectRootElement(selectorOrNode);
        const /** @type {?} */ debugEl = new DebugElement(el, null, getCurrentDebugContext());
        indexDebugNode(debugEl);
        return el;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            const /** @type {?} */ fullName = namespace ? namespace + ':' + name : name;
            debugEl.attributes[fullName] = value;
        }
        this.delegate.setAttribute(el, name, value, namespace);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            const /** @type {?} */ fullName = namespace ? namespace + ':' + name : name;
            debugEl.attributes[fullName] = null;
        }
        this.delegate.removeAttribute(el, name, namespace);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            debugEl.classes[name] = true;
        }
        this.delegate.addClass(el, name);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            debugEl.classes[name] = false;
        }
        this.delegate.removeClass(el, name);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            debugEl.styles[style] = value;
        }
        this.delegate.setStyle(el, style, value, hasVendorPrefix, hasImportant);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            debugEl.styles[style] = null;
        }
        this.delegate.removeStyle(el, style, hasVendorPrefix);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        const /** @type {?} */ debugEl = getDebugNode(el);
        if (debugEl && debugEl instanceof DebugElement) {
            debugEl.properties[name] = value;
        }
        this.delegate.setProperty(el, name, value);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) {
        if (typeof target !== 'string') {
            const /** @type {?} */ debugEl = getDebugNode(target);
            if (debugEl) {
                debugEl.listeners.push(new EventListener(eventName, callback));
            }
        }
        return this.delegate.listen(target, eventName, callback);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return this.delegate.parentNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return this.delegate.nextSibling(node); }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { return this.delegate.setValue(node, value); }
}

/**
 * @return {?}
 */
function _iterableDiffersFactory() {
    return defaultIterableDiffers;
}
/**
 * @return {?}
 */
function _keyValueDiffersFactory() {
    return defaultKeyValueDiffers;
}
/**
 * @param {?=} locale
 * @return {?}
 */
function _localeFactory(locale) {
    return locale || 'en-US';
}
/**
 * @return {?}
 */
function _initViewEngine() {
    initServicesIfNeeded();
}
/**
 * This module includes the providers of \@angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * \@experimental
 */
class ApplicationModule {
}
ApplicationModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    ApplicationRef_,
                    { provide: ApplicationRef, useExisting: ApplicationRef_ },
                    ApplicationInitStatus,
                    Compiler,
                    APP_ID_RANDOM_PROVIDER,
                    ViewUtils,
                    AnimationQueue,
                    { provide: IterableDiffers, useFactory: _iterableDiffersFactory },
                    { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory },
                    {
                        provide: LOCALE_ID,
                        useFactory: _localeFactory,
                        deps: [[new Inject(LOCALE_ID), new Optional(), new SkipSelf()]]
                    },
                    { provide: APP_INITIALIZER, useValue: _initViewEngine, multi: true },
                ]
            },] },
];
/** @nocollapse */
ApplicationModule.ctorParameters = () => [];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ const /** @type {?} */ FILL_STYLE_FLAG = 'true'; // TODO (matsko): change to boolean
// TODO (matsko): change to boolean
const /** @type {?} */ ANY_STATE = '*';
const /** @type {?} */ DEFAULT_STATE = '*';
const /** @type {?} */ EMPTY_STATE = 'void';

class AnimationGroupPlayer {
    /**
     * @param {?} _players
     */
    constructor(_players) {
        this._players = _players;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this._onDestroyFns = [];
        this.parentPlayer = null;
        let count = 0;
        const total = this._players.length;
        if (total == 0) {
            scheduleMicroTask(() => this._onFinish());
        }
        else {
            this._players.forEach(player => {
                player.parentPlayer = this;
                player.onDone(() => {
                    if (++count >= total) {
                        this._onFinish();
                    }
                });
            });
        }
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @return {?}
     */
    init() { this._players.forEach(player => player.init()); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    play() {
        if (!isPresent(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
            this._started = true;
        }
        this._players.forEach(player => player.play());
    }
    /**
     * @return {?}
     */
    pause() { this._players.forEach(player => player.pause()); }
    /**
     * @return {?}
     */
    restart() { this._players.forEach(player => player.restart()); }
    /**
     * @return {?}
     */
    finish() {
        this._onFinish();
        this._players.forEach(player => player.finish());
    }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._onFinish();
            this._players.forEach(player => player.destroy());
            this._destroyed = true;
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this._players.forEach(player => player.reset());
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) {
        this._players.forEach(player => { player.setPosition(p); });
    }
    /**
     * @return {?}
     */
    getPosition() {
        let /** @type {?} */ min = 0;
        this._players.forEach(player => {
            const /** @type {?} */ p = player.getPosition();
            min = Math.min(p, min);
        });
        return min;
    }
    /**
     * @return {?}
     */
    get players() { return this._players; }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `AnimationKeyframe` consists of a series of styles (contained within {\@link AnimationStyles
 * `AnimationStyles`})
 * and an offset value indicating when those styles are applied within the `duration/delay/easing`
 * timings.
 * `AnimationKeyframe` is mostly an internal class which is designed to be used alongside {\@link
 * Renderer#animate-anchor `Renderer.animate`}.
 *
 * \@experimental Animation support is experimental
 */
class AnimationKeyframe {
    /**
     * @param {?} offset
     * @param {?} styles
     */
    constructor(offset, styles) {
        this.offset = offset;
        this.styles = styles;
    }
}

class AnimationSequencePlayer {
    /**
     * @param {?} _players
     */
    constructor(_players) {
        this._players = _players;
        this._currentIndex = 0;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.parentPlayer = null;
        this._players.forEach(player => { player.parentPlayer = this; });
        this._onNext(false);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _onNext(start) {
        if (this._finished)
            return;
        if (this._players.length == 0) {
            this._activePlayer = new NoOpAnimationPlayer();
            scheduleMicroTask(() => this._onFinish());
        }
        else if (this._currentIndex >= this._players.length) {
            this._activePlayer = new NoOpAnimationPlayer();
            this._onFinish();
        }
        else {
            const /** @type {?} */ player = this._players[this._currentIndex++];
            player.onDone(() => this._onNext(true));
            this._activePlayer = player;
            if (start) {
                player.play();
            }
        }
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @return {?}
     */
    init() { this._players.forEach(player => player.init()); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    play() {
        if (!isPresent(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
            this._started = true;
        }
        this._activePlayer.play();
    }
    /**
     * @return {?}
     */
    pause() { this._activePlayer.pause(); }
    /**
     * @return {?}
     */
    restart() {
        this.reset();
        if (this._players.length > 0) {
            this._players[0].restart();
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this._players.forEach(player => player.reset());
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    }
    /**
     * @return {?}
     */
    finish() {
        this._onFinish();
        this._players.forEach(player => player.finish());
    }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._onFinish();
            this._players.forEach(player => player.destroy());
            this._destroyed = true;
            this._activePlayer = new NoOpAnimationPlayer();
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this._players[0].setPosition(p); }
    /**
     * @return {?}
     */
    getPosition() { return this._players[0].getPosition(); }
    /**
     * @return {?}
     */
    get players() { return this._players; }
}

/**
 * @experimental Animation support is experimental.
 */
const /** @type {?} */ AUTO_STYLE = '*';
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link trigger trigger
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationEntryMetadata {
    /**
     * @param {?} name
     * @param {?} definitions
     */
    constructor(name, definitions) {
        this.name = name;
        this.definitions = definitions;
    }
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
class AnimationStateMetadata {
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link state state animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationStateDeclarationMetadata extends AnimationStateMetadata {
    /**
     * @param {?} stateNameExpr
     * @param {?} styles
     */
    constructor(stateNameExpr, styles) {
        super();
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the
 * {\@link transition transition animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationStateTransitionMetadata extends AnimationStateMetadata {
    /**
     * @param {?} stateChangeExpr
     * @param {?} steps
     */
    constructor(stateChangeExpr, steps) {
        super();
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
class AnimationMetadata {
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link keyframes keyframes
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationKeyframesSequenceMetadata extends AnimationMetadata {
    /**
     * @param {?} steps
     */
    constructor(steps) {
        super();
        this.steps = steps;
    }
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link style style animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationStyleMetadata extends AnimationMetadata {
    /**
     * @param {?} styles
     * @param {?=} offset
     */
    constructor(styles, offset = null) {
        super();
        this.styles = styles;
        this.offset = offset;
    }
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link animate animate
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationAnimateMetadata extends AnimationMetadata {
    /**
     * @param {?} timings
     * @param {?} styles
     */
    constructor(timings, styles) {
        super();
        this.timings = timings;
        this.styles = styles;
    }
}
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
class AnimationWithStepsMetadata extends AnimationMetadata {
    constructor() { super(); }
    /**
     * @return {?}
     */
    get steps() { throw new Error('NOT IMPLEMENTED: Base Class'); }
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link sequence sequence
 * animation function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationSequenceMetadata extends AnimationWithStepsMetadata {
    /**
     * @param {?} _steps
     */
    constructor(_steps) {
        super();
        this._steps = _steps;
    }
    /**
     * @return {?}
     */
    get steps() { return this._steps; }
}
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {\@link group group animation
 * function} is called.
 *
 * \@experimental Animation support is experimental.
 */
class AnimationGroupMetadata extends AnimationWithStepsMetadata {
    /**
     * @param {?} _steps
     */
    constructor(_steps) {
        super();
        this._steps = _steps;
    }
    /**
     * @return {?}
     */
    get steps() { return this._steps; }
}
/**
 * `animate` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `animate` specifies an animation step that will apply the provided `styles` data for a given
 * amount of
 * time based on the provided `timing` expression value. Calls to `animate` are expected to be
 * used within {\@link sequence an animation sequence}, {\@link group group}, or {\@link transition
 * transition}.
 *
 * ### Usage
 *
 * The `animate` function accepts two input parameters: `timing` and `styles`:
 *
 * - `timing` is a string based value that can be a combination of a duration with optional
 * delay and easing values. The format for the expression breaks down to `duration delay easing`
 * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000,
 * delay=100, easing=ease-out`.
 * If a numeric value is provided then that will be used as the `duration` value in millisecond
 * form.
 * - `styles` is the style input data which can either be a call to {\@link style style} or {\@link
 * keyframes keyframes}.
 * If left empty then the styles from the destination state will be collected and used (this is
 * useful when
 * describing an animation step that will complete an animation by {\@link
 * transition#the-final-animate-call animating to the final state}).
 *
 * ```typescript
 * // various functions for specifying timing data
 * animate(500, style(...))
 * animate("1s", style(...))
 * animate("100ms 0.5s", style(...))
 * animate("5s ease", style(...))
 * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
 *
 * // either style() of keyframes() can be used
 * animate(500, style({ background: "red" }))
 * animate(500, keyframes([
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} timing
 * @param {?=} styles
 * @return {?}
 */
function animate(timing, styles = null) {
    let /** @type {?} */ stylesEntry = styles;
    if (!isPresent(stylesEntry)) {
        const /** @type {?} */ EMPTY_STYLE = {};
        stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
    }
    return new AnimationAnimateMetadata(timing, stylesEntry);
}
/**
 * `group` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
 * are useful when a series of styles must be animated/closed off
 * at different statrting/ending times.
 *
 * The `group` function can either be used within a {\@link sequence sequence} or a {\@link transition
 * transition}
 * and it will only continue to the next instruction once all of the inner animation steps
 * have completed.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `group` animation function can either consist
 * of {\@link style style} or {\@link animate animate} function calls. Each call to `style()` or
 * `animate()`
 * within a group will be executed instantly (use {\@link keyframes keyframes} or a
 * {\@link animate#usage animate() with a delay value} to offset styles to be applied at a later
 * time).
 *
 * ```typescript
 * group([
 *   animate("1s", { background: "black" }))
 *   animate("2s", { color: "white" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function group(steps) {
    return new AnimationGroupMetadata(steps);
}
/**
 * `sequence` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
 * by default when an array is passed as animation data into {\@link transition transition}.)
 *
 * The `sequence` function can either be used within a {\@link group group} or a {\@link transition
 * transition}
 * and it will only continue to the next instruction once each of the inner animation steps
 * have completed.
 *
 * To perform animation styling in parallel with other animation steps then
 * have a look at the {\@link group group} animation function.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `sequence` animation function can either consist
 * of {\@link style style} or {\@link animate animate} function calls. A call to `style()` will apply
 * the
 * provided styling data immediately while a call to `animate()` will apply its styling
 * data over a given time depending on its timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 })),
 *   animate("1s", { opacity: 1 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function sequence(steps) {
    return new AnimationSequenceMetadata(steps);
}
/**
 * `style` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `style` declares a key/value object containing CSS properties/styles that can then
 * be used for {\@link state animation states}, within an {\@link sequence animation sequence}, or as
 * styling data for both {\@link animate animate} and {\@link keyframes keyframes}.
 *
 * ### Usage
 *
 * `style` takes in a key/value string map as data and expects one or more CSS property/value
 * pairs to be defined.
 *
 * ```typescript
 * // string values are used for css properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical (pixel) values are also supported
 * style({ width: 100, height: 0 })
 * ```
 *
 * #### Auto-styles (using `*`)
 *
 * When an asterix (`*`) character is used as a value then it will be detected from the element
 * being animated
 * and applied as animation data when the animation starts.
 *
 * This feature proves useful for a state depending on layout and/or environment factors; in such
 * cases
 * the styles are calculated just before the animation starts.
 *
 * ```typescript
 * // the steps below will animate from 0 to the
 * // actual height of the element
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} tokens
 * @return {?}
 */
function style(tokens) {
    let /** @type {?} */ input;
    let /** @type {?} */ offset = null;
    if (typeof tokens === 'string') {
        input = [/** @type {?} */ (tokens)];
    }
    else {
        if (Array.isArray(tokens)) {
            input = (tokens);
        }
        else {
            input = [/** @type {?} */ (tokens)];
        }
        input.forEach(entry => {
            const /** @type {?} */ entryOffset = ((entry) /** TODO #9100 */)['offset'];
            if (isPresent(entryOffset)) {
                offset = offset == null ? parseFloat(entryOffset) : offset;
            }
        });
    }
    return new AnimationStyleMetadata(input, offset);
}
/**
 * `state` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `state` declares an animation state within the given trigger. When a state is
 * active within a component then its associated styles will persist on
 * the element that the trigger is attached to (even when the animation ends).
 *
 * To animate between states, have a look at the animation {\@link transition transition}
 * DSL function. To register states to an animation trigger please have a look
 * at the {\@link trigger trigger} function.
 *
 * #### The `void` state
 *
 * The `void` state value is a reserved word that angular uses to determine when the element is not
 * apart
 * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the
 * associated element
 * is void).
 *
 * #### The `*` (default) state
 *
 * The `*` state (when styled) is a fallback state that will be used if
 * the state that is being animated is not declared within the trigger.
 *
 * ### Usage
 *
 * `state` will declare an animation state with its associated styles
 * within the given trigger.
 *
 * - `stateNameExpr` can be one or more state names separated by commas.
 * - `styles` refers to the {\@link style styling data} that will be persisted on the element once
 * the state
 * has been reached.
 *
 * ```typescript
 * // "void" is a reserved name for a state and is used to represent
 * // the state in which an element is detached from from the application.
 * state("void", style({ height: 0 }))
 *
 * // user-defined states
 * state("closed", style({ height: 0 }))
 * state("open, visible", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} stateNameExpr
 * @param {?} styles
 * @return {?}
 */
function state(stateNameExpr, styles) {
    return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
}
/**
 * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `keyframes` specifies a collection of {\@link style style} entries each optionally characterized
 * by an `offset` value.
 *
 * ### Usage
 *
 * The `keyframes` animation function is designed to be used alongside the {\@link animate animate}
 * animation function. Instead of applying animations from where they are
 * currently to their destination, keyframes can describe how each style entry is applied
 * and at what point within the animation arc (much like CSS Keyframe Animations do).
 *
 * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
 * what percentage of the animate time the styles will be applied.
 *
 * ```typescript
 * // the provided offset values describe when each backgroundColor value is applied.
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * Alternatively, if there are no `offset` values used within the style entries then the offsets
 * will
 * be calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} steps
 * @return {?}
 */
function keyframes(steps) {
    return new AnimationKeyframesSequenceMetadata(steps);
}
/**
 * `transition` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `transition` declares the {\@link sequence sequence of animation steps} that will be run when the
 * provided
 * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2`
 * which consists
 * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
 *
 * A function can also be provided as the `stateChangeExpr` argument for a transition and this
 * function will be executed each time a state change occurs. If the value returned within the
 * function is true then the associated animation will be run.
 *
 * Animation transitions are placed within an {\@link trigger animation trigger}. For an transition
 * to animate to
 * a state value and persist its styles then one or more {\@link state animation states} is expected
 * to be defined.
 *
 * ### Usage
 *
 * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on
 * what the
 * previous state is and what the current state has become. In other words, if a transition is
 * defined that
 * matches the old/current state criteria then the associated animation will be triggered.
 *
 * ```typescript
 * // all transition/state changes are defined within an animation trigger
 * trigger("myAnimationTrigger", [
 *   // if a state is defined then its styles will be persisted when the
 *   // animation has fully completed itself
 *   state("on", style({ background: "green" })),
 *   state("off", style({ background: "grey" })),
 *
 *   // a transition animation that will be kicked off when the state value
 *   // bound to "myAnimationTrigger" changes from "on" to "off"
 *   transition("on => off", animate(500)),
 *
 *   // it is also possible to do run the same animation for both directions
 *   transition("on <=> off", animate(500)),
 *
 *   // or to define multiple states pairs separated by commas
 *   transition("on => off, off => void", animate(500)),
 *
 *   // this is a catch-all state change for when an element is inserted into
 *   // the page and the destination state is unknown
 *   transition("void => *", [
 *     style({ opacity: 0 }),
 *     animate(500)
 *   ]),
 *
 *   // this will capture a state change between any states
 *   transition("* => *", animate("1s 0s")),
 *
 *   // you can also go full out and include a function
 *   transition((fromState, toState) => {
 *     // when `true` then it will allow the animation below to be invoked
 *     return fromState == "off" && toState == "on";
 *   }, animate("1s 0s"))
 * ])
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [\@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * #### The final `animate` call
 *
 * If the final step within the transition steps is a call to `animate()` that **only**
 * uses a timing value with **no style data** then it will be automatically used as the final
 * animation
 * arc for the element to animate itself to the final state. This involves an automatic mix of
 * adding/removing CSS styles so that the element will be in the exact state it should be for the
 * applied state to be presented correctly.
 *
 * ```
 * // start off by hiding the element, but make sure that it animates properly to whatever state
 * // is currently active for "myAnimationTrigger"
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 * ])
 * ```
 *
 * ### Transition Aliases (`:enter` and `:leave`)
 *
 * Given that enter (insertion) and leave (removal) animations are so common,
 * the `transition` function accepts both `:enter` and `:leave` values which
 * are aliases for the `void => *` and `* => void` state changes.
 *
 * ```
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 * ])
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} stateChangeExpr
 * @param {?} steps
 * @return {?}
 */
function transition(stateChangeExpr, steps) {
    const /** @type {?} */ animationData = Array.isArray(steps) ? new AnimationSequenceMetadata(steps) : steps;
    return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
}
/**
 * `trigger` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {\@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `trigger` Creates an animation trigger which will a list of {\@link state state} and {\@link
 * transition transition}
 * entries that will be evaluated when the expression bound to the trigger changes.
 *
 * Triggers are registered within the component annotation data under the
 * {\@link Component#animations-anchor animations section}. An animation trigger can
 * be placed on an element within a template by referencing the name of the
 * trigger followed by the expression value that the trigger is bound to
 * (in the form of `[\@triggerName]="expression"`.
 *
 * ### Usage
 *
 * `trigger` will create an animation trigger reference based on the provided `name` value.
 * The provided `animation` value is expected to be an array consisting of {\@link state state} and
 * {\@link transition transition}
 * declarations.
 *
 * ```typescript
 * \@Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [\@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {\@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} animation
 * @return {?}
 */
function trigger(name, animation) {
    return new AnimationEntryMetadata(name, animation);
}

/**
 * @param {?} previousStyles
 * @param {?} newStyles
 * @param {?=} nullValue
 * @return {?}
 */
function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue = null) {
    const /** @type {?} */ finalStyles = {};
    Object.keys(newStyles).forEach(prop => {
        const /** @type {?} */ value = newStyles[prop];
        finalStyles[prop] = value == AUTO_STYLE ? nullValue : value.toString();
    });
    Object.keys(previousStyles).forEach(prop => {
        if (!isPresent(finalStyles[prop])) {
            finalStyles[prop] = nullValue;
        }
    });
    return finalStyles;
}
/**
 * @param {?} collectedStyles
 * @param {?} finalStateStyles
 * @param {?} keyframes
 * @return {?}
 */
function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
    const /** @type {?} */ limit = keyframes.length - 1;
    const /** @type {?} */ firstKeyframe = keyframes[0];
    // phase 1: copy all the styles from the first keyframe into the lookup map
    const /** @type {?} */ flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
    const /** @type {?} */ extraFirstKeyframeStyles = {};
    let /** @type {?} */ hasExtraFirstStyles = false;
    Object.keys(collectedStyles).forEach(prop => {
        const /** @type {?} */ value = (collectedStyles[prop]);
        // if the style is already defined in the first keyframe then
        // we do not replace it.
        if (!flatenedFirstKeyframeStyles[prop]) {
            flatenedFirstKeyframeStyles[prop] = value;
            extraFirstKeyframeStyles[prop] = value;
            hasExtraFirstStyles = true;
        }
    });
    const /** @type {?} */ keyframeCollectedStyles = StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
    // phase 2: normalize the final keyframe
    const /** @type {?} */ finalKeyframe = keyframes[limit];
    finalKeyframe.styles.styles.unshift(finalStateStyles);
    const /** @type {?} */ flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
    const /** @type {?} */ extraFinalKeyframeStyles = {};
    let /** @type {?} */ hasExtraFinalStyles = false;
    Object.keys(keyframeCollectedStyles).forEach(prop => {
        if (!isPresent(flatenedFinalKeyframeStyles[prop])) {
            extraFinalKeyframeStyles[prop] = AUTO_STYLE;
            hasExtraFinalStyles = true;
        }
    });
    if (hasExtraFinalStyles) {
        finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
    }
    Object.keys(flatenedFinalKeyframeStyles).forEach(prop => {
        if (!isPresent(flatenedFirstKeyframeStyles[prop])) {
            extraFirstKeyframeStyles[prop] = AUTO_STYLE;
            hasExtraFirstStyles = true;
        }
    });
    if (hasExtraFirstStyles) {
        firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
    }
    collectAndResolveStyles(collectedStyles, [finalStateStyles]);
    return keyframes;
}
/**
 * @param {?} styles
 * @return {?}
 */
function clearStyles(styles) {
    const /** @type {?} */ finalStyles = {};
    Object.keys(styles).forEach(key => { finalStyles[key] = null; });
    return finalStyles;
}
/**
 * @param {?} collection
 * @param {?} styles
 * @return {?}
 */
function collectAndResolveStyles(collection, styles) {
    return styles.map(entry => {
        const /** @type {?} */ stylesObj = {};
        Object.keys(entry).forEach(prop => {
            let /** @type {?} */ value = entry[prop];
            if (value == FILL_STYLE_FLAG) {
                value = collection[prop];
                if (!isPresent(value)) {
                    value = AUTO_STYLE;
                }
            }
            collection[prop] = value;
            stylesObj[prop] = value;
        });
        return stylesObj;
    });
}
/**
 * @param {?} element
 * @param {?} renderer
 * @param {?} styles
 * @return {?}
 */
function renderStyles(element, renderer, styles) {
    Object.keys(styles).forEach(prop => { renderer.setElementStyle(element, prop, styles[prop]); });
}
/**
 * @param {?} styles
 * @return {?}
 */
function flattenStyles(styles) {
    const /** @type {?} */ finalStyles = {};
    styles.forEach(entry => {
        Object.keys(entry).forEach(prop => { finalStyles[prop] = (entry[prop]); });
    });
    return finalStyles;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `AnimationStyles` consists of a collection of key/value maps containing CSS-based style data
 * that can either be used as initial styling data or apart of a series of keyframes within an
 * animation.
 * This class is mostly internal, and it is designed to be used alongside
 * {\@link AnimationKeyframe `AnimationKeyframe`} and {\@link Renderer#animate-anchor
 * `Renderer.animate`}.
 *
 * \@experimental Animation support is experimental
 */
class AnimationStyles {
    /**
     * @param {?} styles
     */
    constructor(styles) {
        this.styles = styles;
    }
}

/**
 * An instance of this class is returned as an event parameter when an animation
 * callback is captured for an animation either during the start or done phase.
 *
 * ```typescript
 * \@Component({
 *   host: {
 *     '[\@myAnimationTrigger]': 'someExpression',
 *     '(\@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *     '(\@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *   },
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *        // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   someExpression: any = false;
 *   captureStartEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 *
 *   captureDoneEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 * }
 * ```
 *
 * \@experimental Animation support is experimental.
 */
class AnimationTransitionEvent {
    /**
     * @param {?} __0
     */
    constructor({ fromState, toState, totalTime, phaseName, element, triggerName }) {
        this.fromState = fromState;
        this.toState = toState;
        this.totalTime = totalTime;
        this.phaseName = phaseName;
        this.element = new ElementRef(element);
        this.triggerName = triggerName;
    }
}

class AnimationTransition {
    /**
     * @param {?} _player
     * @param {?} _element
     * @param {?} _triggerName
     * @param {?} _fromState
     * @param {?} _toState
     * @param {?} _totalTime
     */
    constructor(_player, _element, _triggerName, _fromState, _toState, _totalTime) {
        this._player = _player;
        this._element = _element;
        this._triggerName = _triggerName;
        this._fromState = _fromState;
        this._toState = _toState;
        this._totalTime = _totalTime;
    }
    /**
     * @param {?} phaseName
     * @return {?}
     */
    _createEvent(phaseName) {
        return new AnimationTransitionEvent({
            fromState: this._fromState,
            toState: this._toState,
            totalTime: this._totalTime,
            phaseName: phaseName,
            element: this._element,
            triggerName: this._triggerName
        });
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onStart(callback) {
        const /** @type {?} */ fn = (Zone.current.wrap(() => callback(this._createEvent('start')), 'player.onStart'));
        this._player.onStart(fn);
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDone(callback) {
        const /** @type {?} */ fn = (Zone.current.wrap(() => callback(this._createEvent('done')), 'player.onDone'));
        this._player.onDone(fn);
    }
}

class DebugDomRootRenderer {
    /**
     * @param {?} _delegate
     */
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    }
}
class DebugDomRenderer {
    /**
     * @param {?} _delegate
     */
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        const /** @type {?} */ nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        const /** @type {?} */ debugEl = new DebugElement(nativeEl, null, debugInfo);
        indexDebugNode(debugEl);
        return nativeEl;
    }
    /**
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    createElement(parentElement, name, debugInfo) {
        const /** @type {?} */ nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        const /** @type {?} */ debugEl = new DebugElement(nativeEl, getDebugNode(parentElement), debugInfo);
        debugEl.name = name;
        indexDebugNode(debugEl);
        return nativeEl;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) { return this._delegate.createViewRoot(hostElement); }
    /**
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        const /** @type {?} */ debugEl = new DebugNode(comment, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        const /** @type {?} */ text = this._delegate.createText(parentElement, value, debugInfo);
        const /** @type {?} */ debugEl = new DebugNode(text, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return text;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        const /** @type {?} */ debugParent = getDebugNode(parentElement);
        if (isPresent(debugParent) && debugParent instanceof DebugElement) {
            const /** @type {?} */ debugElement = debugParent;
            nodes.forEach((node) => { debugElement.addChild(getDebugNode(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        const /** @type {?} */ debugNode = getDebugNode(node);
        if (isPresent(debugNode)) {
            const /** @type {?} */ debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && isPresent(debugParent)) {
                const /** @type {?} */ debugViewRootNodes = [];
                viewRootNodes.forEach((rootNode) => debugViewRootNodes.push(getDebugNode(rootNode)));
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        viewRootNodes.forEach((node) => {
            const /** @type {?} */ debugNode = getDebugNode(node);
            if (debugNode && debugNode.parent) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        viewAllNodes = viewAllNodes || [];
        viewAllNodes.forEach((node) => { removeDebugNodeFromIndex(getDebugNode(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        const /** @type {?} */ debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl)) {
            debugEl.listeners.push(new EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        const /** @type {?} */ debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        const /** @type {?} */ debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        const /** @type {?} */ debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.classes[className] = isAdd;
        }
        this._delegate.setElementClass(renderElement, className, isAdd);
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        const /** @type {?} */ debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.styles[styleName] = styleValue;
        }
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { this._delegate.setText(renderNode, text); }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
    }
}

let ViewType = {};
ViewType.HOST = 0;
ViewType.COMPONENT = 1;
ViewType.EMBEDDED = 2;
ViewType[ViewType.HOST] = "HOST";
ViewType[ViewType.COMPONENT] = "COMPONENT";
ViewType[ViewType.EMBEDDED] = "EMBEDDED";

class StaticNodeDebugInfo {
    /**
     * @param {?} providerTokens
     * @param {?} componentToken
     * @param {?} refTokens
     */
    constructor(providerTokens, componentToken, refTokens) {
        this.providerTokens = providerTokens;
        this.componentToken = componentToken;
        this.refTokens = refTokens;
    }
}
class DebugContext$1 {
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     * @param {?} _tplRow
     * @param {?} _tplCol
     */
    constructor(_view, _nodeIndex, _tplRow, _tplCol) {
        this._view = _view;
        this._nodeIndex = _nodeIndex;
        this._tplRow = _tplRow;
        this._tplCol = _tplCol;
    }
    /**
     * @return {?}
     */
    get _staticNodeInfo() {
        return isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
    }
    /**
     * @return {?}
     */
    get context() { return this._view.context; }
    /**
     * @return {?}
     */
    get component() {
        const /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        if (isPresent(staticNodeInfo) && isPresent(staticNodeInfo.componentToken)) {
            return this.injector.get(staticNodeInfo.componentToken);
        }
        return null;
    }
    /**
     * @return {?}
     */
    get componentRenderElement() {
        let /** @type {?} */ componentView = this._view;
        while (isPresent(componentView.parentView) && componentView.type !== ViewType.COMPONENT) {
            componentView = (componentView.parentView);
        }
        return componentView.parentElement;
    }
    /**
     * @return {?}
     */
    get injector() { return this._view.injector(this._nodeIndex); }
    /**
     * @return {?}
     */
    get renderNode() {
        if (isPresent(this._nodeIndex) && this._view.allNodes) {
            return this._view.allNodes[this._nodeIndex];
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    get providerTokens() {
        const /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        return isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
    }
    /**
     * @return {?}
     */
    get source() {
        return `${this._view.componentType.templateUrl}:${this._tplRow}:${this._tplCol}`;
    }
    /**
     * @return {?}
     */
    get references() {
        const /** @type {?} */ varValues = {};
        const /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        if (isPresent(staticNodeInfo)) {
            const /** @type {?} */ refs = staticNodeInfo.refTokens;
            Object.keys(refs).forEach(refName => {
                const /** @type {?} */ refToken = refs[refName];
                let /** @type {?} */ varValue;
                if (isBlank(refToken)) {
                    varValue = this._view.allNodes ? this._view.allNodes[this._nodeIndex] : null;
                }
                else {
                    varValue = this._view.injectorGet(refToken, this._nodeIndex, null);
                }
                varValues[refName] = varValue;
            });
        }
        return varValues;
    }
}

class ViewAnimationMap {
    constructor() {
        this._map = new Map();
        this._allPlayers = [];
    }
    /**
     * @param {?} element
     * @param {?} animationName
     * @return {?}
     */
    find(element, animationName) {
        const /** @type {?} */ playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    findAllPlayersByElement(element) {
        const /** @type {?} */ el = this._map.get(element);
        return el ? Object.keys(el).map(k => el[k]) : [];
    }
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?} player
     * @return {?}
     */
    set(element, animationName, player) {
        let /** @type {?} */ playersByAnimation = this._map.get(element);
        if (!isPresent(playersByAnimation)) {
            playersByAnimation = {};
        }
        const /** @type {?} */ existingEntry = playersByAnimation[animationName];
        if (isPresent(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    }
    /**
     * @return {?}
     */
    getAllPlayers() { return this._allPlayers; }
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?=} targetPlayer
     * @return {?}
     */
    remove(element, animationName, targetPlayer = null) {
        const /** @type {?} */ playersByAnimation = this._map.get(element);
        if (playersByAnimation) {
            const /** @type {?} */ player = playersByAnimation[animationName];
            if (!targetPlayer || player === targetPlayer) {
                delete playersByAnimation[animationName];
                const /** @type {?} */ index = this._allPlayers.indexOf(player);
                this._allPlayers.splice(index, 1);
                if (Object.keys(playersByAnimation).length === 0) {
                    this._map.delete(element);
                }
            }
        }
    }
}

class AnimationViewContext {
    /**
     * @param {?} _animationQueue
     */
    constructor(_animationQueue) {
        this._animationQueue = _animationQueue;
        this._players = new ViewAnimationMap();
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onAllActiveAnimationsDone(callback) {
        const /** @type {?} */ activeAnimationPlayers = this._players.getAllPlayers();
        // we check for the length to avoid having GroupAnimationPlayer
        // issue an unnecessary microtask when zero players are passed in
        if (activeAnimationPlayers.length) {
            new AnimationGroupPlayer(activeAnimationPlayers).onDone(() => callback());
        }
        else {
            callback();
        }
    }
    /**
     * @param {?} element
     * @param {?} animationName
     * @param {?} player
     * @return {?}
     */
    queueAnimation(element, animationName, player) {
        this._animationQueue.enqueue(player);
        this._players.set(element, animationName, player);
        player.onDone(() => this._players.remove(element, animationName, player));
    }
    /**
     * @param {?} element
     * @param {?=} animationName
     * @return {?}
     */
    getAnimationPlayers(element, animationName = null) {
        const /** @type {?} */ players = [];
        if (animationName) {
            const /** @type {?} */ currentPlayer = this._players.find(element, animationName);
            if (currentPlayer) {
                _recursePlayers(currentPlayer, players);
            }
        }
        else {
            this._players.findAllPlayersByElement(element).forEach(player => _recursePlayers(player, players));
        }
        return players;
    }
}
/**
 * @param {?} player
 * @param {?} collectedPlayers
 * @return {?}
 */
function _recursePlayers(player, collectedPlayers) {
    if ((player instanceof AnimationGroupPlayer) || (player instanceof AnimationSequencePlayer)) {
        player.players.forEach(player => _recursePlayers(player, collectedPlayers));
    }
    else {
        collectedPlayers.push(player);
    }
}

class ElementInjector extends Injector {
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     */
    constructor(_view, _nodeIndex) {
        super();
        this._view = _view;
        this._nodeIndex = _nodeIndex;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        return this._view.injectorGet(token, this._nodeIndex, notFoundValue);
    }
}

const /** @type {?} */ _scope_check = wtfCreateScope(`AppView#check(ascii id)`);
/**
 * @experimental
 */
const /** @type {?} */ EMPTY_CONTEXT$1 = new Object();
const /** @type {?} */ UNDEFINED$1 = new Object();
/**
 * Cost of making objects: http://jsperf.com/instantiate-size-of-object
 *
 * @abstract
 */
class AppView {
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentView
     * @param {?} parentIndex
     * @param {?} parentElement
     * @param {?} cdMode
     * @param {?=} declaredViewContainer
     */
    constructor(clazz, componentType, type, viewUtils, parentView, parentIndex, parentElement, cdMode, declaredViewContainer = null) {
        this.clazz = clazz;
        this.componentType = componentType;
        this.type = type;
        this.viewUtils = viewUtils;
        this.parentView = parentView;
        this.parentIndex = parentIndex;
        this.parentElement = parentElement;
        this.cdMode = cdMode;
        this.declaredViewContainer = declaredViewContainer;
        this.numberOfChecks = 0;
        this.throwOnChange = false;
        this.ref = new ViewRef_(this, viewUtils.animationQueue);
        if (type === ViewType.COMPONENT || type === ViewType.HOST) {
            this.renderer = viewUtils.renderComponent(componentType);
        }
        else {
            this.renderer = parentView.renderer;
        }
        this._directRenderer = this.renderer.directRenderer;
    }
    /**
     * @return {?}
     */
    get animationContext() {
        if (!this._animationContext) {
            this._animationContext = new AnimationViewContext(this.viewUtils.animationQueue);
        }
        return this._animationContext;
    }
    /**
     * @return {?}
     */
    get destroyed() { return this.cdMode === ChangeDetectorStatus.Destroyed; }
    /**
     * @param {?} context
     * @return {?}
     */
    create(context) {
        this.context = context;
        return this.createInternal(null);
    }
    /**
     * @param {?} rootSelectorOrNode
     * @param {?} hostInjector
     * @param {?} projectableNodes
     * @return {?}
     */
    createHostView(rootSelectorOrNode, hostInjector, projectableNodes) {
        this.context = (EMPTY_CONTEXT$1);
        this._hasExternalHostElement = isPresent(rootSelectorOrNode);
        this._hostInjector = hostInjector;
        this._hostProjectableNodes = projectableNodes;
        return this.createInternal(rootSelectorOrNode);
    }
    /**
     * Overwritten by implementations.
     * Returns the ComponentRef for the host element for ViewType.HOST.
     * @param {?} rootSelectorOrNode
     * @return {?}
     */
    createInternal(rootSelectorOrNode) { return null; }
    /**
     * Overwritten by implementations.
     * @param {?} templateNodeIndex
     * @return {?}
     */
    createEmbeddedViewInternal(templateNodeIndex) { return null; }
    /**
     * @param {?} lastRootNode
     * @param {?} allNodes
     * @param {?} disposables
     * @return {?}
     */
    init(lastRootNode, allNodes, disposables) {
        this.lastRootNode = lastRootNode;
        this.allNodes = allNodes;
        this.disposables = disposables;
        if (this.type === ViewType.COMPONENT) {
            this.dirtyParentQueriesInternal();
        }
    }
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?=} notFoundValue
     * @return {?}
     */
    injectorGet(token, nodeIndex, notFoundValue = THROW_IF_NOT_FOUND) {
        let /** @type {?} */ result = UNDEFINED$1;
        let /** @type {?} */ view = this;
        while (result === UNDEFINED$1) {
            if (isPresent(nodeIndex)) {
                result = view.injectorGetInternal(token, nodeIndex, UNDEFINED$1);
            }
            if (result === UNDEFINED$1 && view.type === ViewType.HOST) {
                result = view._hostInjector.get(token, notFoundValue);
            }
            nodeIndex = view.parentIndex;
            view = view.parentView;
        }
        return result;
    }
    /**
     * Overwritten by implementations
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    injectorGetInternal(token, nodeIndex, notFoundResult) {
        return notFoundResult;
    }
    /**
     * @param {?} nodeIndex
     * @return {?}
     */
    injector(nodeIndex) { return new ElementInjector(this, nodeIndex); }
    /**
     * @return {?}
     */
    detachAndDestroy() {
        if (this.viewContainer) {
            this.viewContainer.detachView(this.viewContainer.nestedViews.indexOf(this));
        }
        else if (this.appRef) {
            this.appRef.detachView(this.ref);
        }
        else if (this._hasExternalHostElement) {
            this.detach();
        }
        this.destroy();
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
            return;
        }
        const /** @type {?} */ hostElement = this.type === ViewType.COMPONENT ? this.parentElement : null;
        if (this.disposables) {
            for (let /** @type {?} */ i = 0; i < this.disposables.length; i++) {
                this.disposables[i]();
            }
        }
        this.destroyInternal();
        this.dirtyParentQueriesInternal();
        if (this._animationContext) {
            this._animationContext.onAllActiveAnimationsDone(() => this.renderer.destroyView(hostElement, this.allNodes));
        }
        else {
            this.renderer.destroyView(hostElement, this.allNodes);
        }
        this.cdMode = ChangeDetectorStatus.Destroyed;
    }
    /**
     * Overwritten by implementations
     * @return {?}
     */
    destroyInternal() { }
    /**
     * Overwritten by implementations
     * @return {?}
     */
    detachInternal() { }
    /**
     * @return {?}
     */
    detach() {
        this.detachInternal();
        if (this._animationContext) {
            this._animationContext.onAllActiveAnimationsDone(() => this._renderDetach());
        }
        else {
            this._renderDetach();
        }
        if (this.declaredViewContainer && this.declaredViewContainer !== this.viewContainer &&
            this.declaredViewContainer.projectedViews) {
            const /** @type {?} */ projectedViews = this.declaredViewContainer.projectedViews;
            const /** @type {?} */ index = projectedViews.indexOf(this);
            // perf: pop is faster than splice!
            if (index >= projectedViews.length - 1) {
                projectedViews.pop();
            }
            else {
                projectedViews.splice(index, 1);
            }
        }
        this.appRef = null;
        this.viewContainer = null;
        this.dirtyParentQueriesInternal();
    }
    /**
     * @return {?}
     */
    _renderDetach() {
        if (this._directRenderer) {
            this.visitRootNodesInternal(this._directRenderer.remove, null);
        }
        else {
            this.renderer.detachView(this.flatRootNodes);
        }
    }
    /**
     * @param {?} appRef
     * @return {?}
     */
    attachToAppRef(appRef) {
        if (this.viewContainer) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this.appRef = appRef;
        this.dirtyParentQueriesInternal();
    }
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    attachAfter(viewContainer, prevView) {
        if (this.appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._renderAttach(viewContainer, prevView);
        this.viewContainer = viewContainer;
        if (this.declaredViewContainer && this.declaredViewContainer !== viewContainer) {
            if (!this.declaredViewContainer.projectedViews) {
                this.declaredViewContainer.projectedViews = [];
            }
            this.declaredViewContainer.projectedViews.push(this);
        }
        this.dirtyParentQueriesInternal();
    }
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    moveAfter(viewContainer, prevView) {
        this._renderAttach(viewContainer, prevView);
        this.dirtyParentQueriesInternal();
    }
    /**
     * @param {?} viewContainer
     * @param {?} prevView
     * @return {?}
     */
    _renderAttach(viewContainer, prevView) {
        const /** @type {?} */ prevNode = prevView ? prevView.lastRootNode : viewContainer.nativeElement;
        if (this._directRenderer) {
            const /** @type {?} */ nextSibling = this._directRenderer.nextSibling(prevNode);
            if (nextSibling) {
                this.visitRootNodesInternal(this._directRenderer.insertBefore, nextSibling);
            }
            else {
                const /** @type {?} */ parentElement = this._directRenderer.parentElement(prevNode);
                if (parentElement) {
                    this.visitRootNodesInternal(this._directRenderer.appendChild, parentElement);
                }
            }
        }
        else {
            this.renderer.attachViewAfter(prevNode, this.flatRootNodes);
        }
    }
    /**
     * @return {?}
     */
    get changeDetectorRef() { return this.ref; }
    /**
     * @return {?}
     */
    get flatRootNodes() {
        const /** @type {?} */ nodes = [];
        this.visitRootNodesInternal(addToArray, nodes);
        return nodes;
    }
    /**
     * @param {?} parentElement
     * @param {?} ngContentIndex
     * @return {?}
     */
    projectNodes(parentElement, ngContentIndex) {
        if (this._directRenderer) {
            this.visitProjectedNodes(ngContentIndex, this._directRenderer.appendChild, parentElement);
        }
        else {
            const /** @type {?} */ nodes = [];
            this.visitProjectedNodes(ngContentIndex, addToArray, nodes);
            this.renderer.projectNodes(parentElement, nodes);
        }
    }
    /**
     * @param {?} ngContentIndex
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    visitProjectedNodes(ngContentIndex, cb, c) {
        switch (this.type) {
            case ViewType.EMBEDDED:
                this.parentView.visitProjectedNodes(ngContentIndex, cb, c);
                break;
            case ViewType.COMPONENT:
                if (this.parentView.type === ViewType.HOST) {
                    const /** @type {?} */ nodes = this.parentView._hostProjectableNodes[ngContentIndex] || [];
                    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                        cb(nodes[i], c);
                    }
                }
                else {
                    this.parentView.visitProjectableNodesInternal(this.parentIndex, ngContentIndex, cb, c);
                }
                break;
        }
    }
    /**
     * Overwritten by implementations
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    visitRootNodesInternal(cb, c) { }
    /**
     * Overwritten by implementations
     * @param {?} nodeIndex
     * @param {?} ngContentIndex
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    visitProjectableNodesInternal(nodeIndex, ngContentIndex, cb, c) { }
    /**
     * Overwritten by implementations
     * @return {?}
     */
    dirtyParentQueriesInternal() { }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    internalDetectChanges(throwOnChange) {
        if (this.cdMode !== ChangeDetectorStatus.Detached) {
            this.detectChanges(throwOnChange);
        }
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChanges(throwOnChange) {
        const /** @type {?} */ s = _scope_check(this.clazz);
        if (this.cdMode === ChangeDetectorStatus.Checked ||
            this.cdMode === ChangeDetectorStatus.Errored)
            return;
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
            this.throwDestroyedError('detectChanges');
        }
        this.throwOnChange = throwOnChange;
        this.detectChangesInternal();
        if (this.cdMode === ChangeDetectorStatus.CheckOnce)
            this.cdMode = ChangeDetectorStatus.Checked;
        this.numberOfChecks++;
        wtfLeave(s);
    }
    /**
     * Overwritten by implementations
     * @return {?}
     */
    detectChangesInternal() { }
    /**
     * @return {?}
     */
    markAsCheckOnce() { this.cdMode = ChangeDetectorStatus.CheckOnce; }
    /**
     * @return {?}
     */
    markPathToRootAsCheckOnce() {
        let /** @type {?} */ c = this;
        while (isPresent(c) && c.cdMode !== ChangeDetectorStatus.Detached) {
            if (c.cdMode === ChangeDetectorStatus.Checked) {
                c.cdMode = ChangeDetectorStatus.CheckOnce;
            }
            if (c.type === ViewType.COMPONENT) {
                c = c.parentView;
            }
            else {
                c = c.viewContainer ? c.viewContainer.parentView : null;
            }
        }
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    eventHandler(cb) {
        return cb;
    }
    /**
     * @param {?} details
     * @return {?}
     */
    throwDestroyedError(details) { throw viewDestroyedError(details); }
}
class DebugAppView extends AppView {
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentView
     * @param {?} parentIndex
     * @param {?} parentNode
     * @param {?} cdMode
     * @param {?} staticNodeDebugInfos
     * @param {?=} declaredViewContainer
     */
    constructor(clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, staticNodeDebugInfos, declaredViewContainer = null) {
        super(clazz, componentType, type, viewUtils, parentView, parentIndex, parentNode, cdMode, declaredViewContainer);
        this.staticNodeDebugInfos = staticNodeDebugInfos;
        this._currentDebugContext = null;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    create(context) {
        this._resetDebug();
        try {
            return super.create(context);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @param {?} rootSelectorOrNode
     * @param {?} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createHostView(rootSelectorOrNode, injector, projectableNodes = null) {
        this._resetDebug();
        try {
            return super.createHostView(rootSelectorOrNode, injector, projectableNodes);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?=} notFoundResult
     * @return {?}
     */
    injectorGet(token, nodeIndex, notFoundResult) {
        this._resetDebug();
        try {
            return super.injectorGet(token, nodeIndex, notFoundResult);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @return {?}
     */
    detach() {
        this._resetDebug();
        try {
            super.detach();
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this._resetDebug();
        try {
            super.destroy();
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChanges(throwOnChange) {
        this._resetDebug();
        try {
            super.detectChanges(throwOnChange);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    }
    /**
     * @return {?}
     */
    _resetDebug() { this._currentDebugContext = null; }
    /**
     * @param {?} nodeIndex
     * @param {?} rowNum
     * @param {?} colNum
     * @return {?}
     */
    debug(nodeIndex, rowNum, colNum) {
        return this._currentDebugContext = new DebugContext$1(this, nodeIndex, rowNum, colNum);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _rethrowWithContext(e) {
        if (!(getType(e) == viewWrappedError)) {
            if (!(getType(e) == expressionChangedAfterItHasBeenCheckedError)) {
                this.cdMode = ChangeDetectorStatus.Errored;
            }
            if (isPresent(this._currentDebugContext)) {
                throw viewWrappedError(e, this._currentDebugContext);
            }
        }
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    eventHandler(cb) {
        const /** @type {?} */ superHandler = super.eventHandler(cb);
        return (eventName, event) => {
            this._resetDebug();
            try {
                return superHandler.call(this, eventName, event);
            }
            catch (e) {
                this._rethrowWithContext(e);
                throw e;
            }
        };
    }
}

/**
 * A ViewContainer is created for elements that have a ViewContainerRef
 * to keep track of the nested views.
 */
class ViewContainer {
    /**
     * @param {?} index
     * @param {?} parentIndex
     * @param {?} parentView
     * @param {?} nativeElement
     */
    constructor(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
    }
    /**
     * @return {?}
     */
    get elementRef() { return new ElementRef(this.nativeElement); }
    /**
     * @return {?}
     */
    get vcRef() { return new ViewContainerRef_(this); }
    /**
     * @return {?}
     */
    get parentInjector() { return this.parentView.injector(this.parentIndex); }
    /**
     * @return {?}
     */
    get injector() { return this.parentView.injector(this.index); }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChangesInNestedViews(throwOnChange) {
        if (this.nestedViews) {
            for (let /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].detectChanges(throwOnChange);
            }
        }
    }
    /**
     * @return {?}
     */
    destroyNestedViews() {
        if (this.nestedViews) {
            for (let /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].destroy();
            }
        }
    }
    /**
     * @param {?} cb
     * @param {?} c
     * @return {?}
     */
    visitNestedViewRootNodes(cb, c) {
        if (this.nestedViews) {
            for (let /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                this.nestedViews[i].visitRootNodesInternal(cb, c);
            }
        }
    }
    /**
     * @param {?} nestedViewClass
     * @param {?} callback
     * @return {?}
     */
    mapNestedViews(nestedViewClass, callback) {
        const /** @type {?} */ result = [];
        if (this.nestedViews) {
            for (let /** @type {?} */ i = 0; i < this.nestedViews.length; i++) {
                const /** @type {?} */ nestedView = this.nestedViews[i];
                if (nestedView.clazz === nestedViewClass) {
                    result.push(callback(nestedView));
                }
            }
        }
        if (this.projectedViews) {
            for (let /** @type {?} */ i = 0; i < this.projectedViews.length; i++) {
                const /** @type {?} */ projectedView = this.projectedViews[i];
                if (projectedView.clazz === nestedViewClass) {
                    result.push(callback(projectedView));
                }
            }
        }
        return result;
    }
    /**
     * @param {?} view
     * @param {?} toIndex
     * @return {?}
     */
    moveView(view, toIndex) {
        const /** @type {?} */ fromIndex = this.nestedViews.indexOf(view);
        if (view.type === ViewType.COMPONENT) {
            throw new Error(`Component views can't be moved!`);
        }
        let /** @type {?} */ nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        nestedViews.splice(fromIndex, 1);
        nestedViews.splice(toIndex, 0, view);
        const /** @type {?} */ prevView = toIndex > 0 ? nestedViews[toIndex - 1] : null;
        view.moveAfter(this, prevView);
    }
    /**
     * @param {?} view
     * @param {?} viewIndex
     * @return {?}
     */
    attachView(view, viewIndex) {
        if (view.type === ViewType.COMPONENT) {
            throw new Error(`Component views can't be moved!`);
        }
        let /** @type {?} */ nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        // perf: array.push is faster than array.splice!
        if (viewIndex >= nestedViews.length) {
            nestedViews.push(view);
        }
        else {
            nestedViews.splice(viewIndex, 0, view);
        }
        const /** @type {?} */ prevView = viewIndex > 0 ? nestedViews[viewIndex - 1] : null;
        view.attachAfter(this, prevView);
    }
    /**
     * @param {?} viewIndex
     * @return {?}
     */
    detachView(viewIndex) {
        const /** @type {?} */ view = this.nestedViews[viewIndex];
        // perf: array.pop is faster than array.splice!
        if (viewIndex >= this.nestedViews.length - 1) {
            this.nestedViews.pop();
        }
        else {
            this.nestedViews.splice(viewIndex, 1);
        }
        if (view.type === ViewType.COMPONENT) {
            throw new Error(`Component views can't be moved!`);
        }
        view.detach();
        return view;
    }
}

export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, enableProdMode, isDevMode, createPlatformFactory, NgProbeToken, APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ApplicationInitStatus, DebugElement, DebugNode, asNativeElements, getDebugNode, Testability, TestabilityRegistry, setTestabilityGetter, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy, ApplicationModule, wtfCreateScope, wtfLeave, wtfStartTimeRange, wtfEndTimeRange, Type, EventEmitter, ErrorHandler, AnimationTransitionEvent, AnimationPlayer, AnimationStyles, AnimationKeyframe, Sanitizer, SecurityContext, ANALYZE_FOR_ENTRY_COMPONENTS, Attribute, ContentChild, ContentChildren, Query, ViewChild, ViewChildren, Component, Directive, HostBinding, HostListener, Input, Output, Pipe, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, ViewEncapsulation, Version, VERSION, Class, forwardRef, resolveForwardRef, Injector, ReflectiveInjector, ResolvedReflectiveFactory, ReflectiveKey, InjectionToken, OpaqueToken, Inject, Optional, Injectable, Self, SkipSelf, Host, NgZone, RenderComponentType, RendererV1 as Renderer, RendererFactoryV2, RendererV2, RootRenderer, COMPILER_OPTIONS, Compiler, CompilerFactory, ModuleWithComponentFactories, ComponentFactory, ComponentRef, ComponentFactoryResolver, ElementRef, NgModuleFactory, NgModuleRef, NgModuleFactoryLoader, getModuleFactory, QueryList, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, TemplateRef, ViewContainerRef, EmbeddedViewRef, ViewRef, ChangeDetectionStrategy, ChangeDetectorRef, DefaultIterableDiffer, IterableDiffers, KeyValueDiffers, SimpleChange, WrappedValue, platformCore, ANY_STATE as ɵANY_STATE, DEFAULT_STATE as ɵDEFAULT_STATE, EMPTY_STATE as ɵEMPTY_STATE, FILL_STYLE_FLAG as ɵFILL_STYLE_FLAG, AnimationGroupPlayer as ɵAnimationGroupPlayer, AnimationKeyframe as ɵAnimationKeyframe, AnimationPlayer as ɵAnimationPlayer, NoOpAnimationPlayer as ɵNoOpAnimationPlayer, AnimationSequencePlayer as ɵAnimationSequencePlayer, balanceAnimationKeyframes as ɵbalanceAnimationKeyframes, clearStyles as ɵclearStyles, collectAndResolveStyles as ɵcollectAndResolveStyles, flattenStyles as ɵflattenStyles, prepareFinalAnimationStyles as ɵprepareFinalAnimationStyles, renderStyles as ɵrenderStyles, AnimationStyles as ɵAnimationStyles, AnimationTransition as ɵAnimationTransition, ALLOW_MULTIPLE_PLATFORMS as ɵALLOW_MULTIPLE_PLATFORMS, APP_ID_RANDOM_PROVIDER as ɵAPP_ID_RANDOM_PROVIDER, ValueUnwrapper as ɵValueUnwrapper, devModeEqual as ɵdevModeEqual, ChangeDetectorStatus as ɵChangeDetectorStatus, isDefaultChangeDetectionStrategy as ɵisDefaultChangeDetectionStrategy, Console as ɵConsole, DebugDomRootRenderer as ɵDebugDomRootRenderer, ERROR_COMPONENT_TYPE as ɵERROR_COMPONENT_TYPE, ComponentFactory as ɵComponentFactory, CodegenComponentFactoryResolver as ɵCodegenComponentFactoryResolver, DebugContext$1 as ɵDebugContext, StaticNodeDebugInfo as ɵStaticNodeDebugInfo, AppView as ɵAppView, DebugAppView as ɵDebugAppView, ViewContainer as ɵViewContainer, ViewType as ɵViewType, LIFECYCLE_HOOKS_VALUES as ɵLIFECYCLE_HOOKS_VALUES, LifecycleHooks as ɵLifecycleHooks, ViewMetadata as ɵViewMetadata, Reflector as ɵReflector, reflector as ɵreflector, ReflectionCapabilities as ɵReflectionCapabilities, ReflectorReader as ɵReflectorReader, RenderDebugInfo as ɵRenderDebugInfo, TransitionEngine as ɵTransitionEngine, makeDecorator as ɵmakeDecorator, isObservable as ɵisObservable, isPromise as ɵisPromise, AUTO_STYLE, AnimationEntryMetadata, AnimationStateMetadata, AnimationStateDeclarationMetadata, AnimationStateTransitionMetadata, AnimationMetadata, AnimationKeyframesSequenceMetadata, AnimationStyleMetadata, AnimationAnimateMetadata, AnimationWithStepsMetadata, AnimationSequenceMetadata, AnimationGroupMetadata, animate, group, sequence, style, state, keyframes, transition, trigger, ComponentRef_ as ɵComponentRef_, NgModuleInjector as ɵNgModuleInjector, registerModuleFactory as ɵregisterModuleFactory, TemplateRef_ as ɵTemplateRef_, EMPTY_ARRAY as ɵEMPTY_ARRAY, EMPTY_INLINE_ARRAY as ɵEMPTY_INLINE_ARRAY, EMPTY_MAP as ɵEMPTY_MAP, InlineArray16 as ɵInlineArray16, InlineArray2 as ɵInlineArray2, InlineArray4 as ɵInlineArray4, InlineArray8 as ɵInlineArray8, InlineArrayDynamic as ɵInlineArrayDynamic, ViewUtils as ɵViewUtils, castByValue as ɵcastByValue, checkBinding as ɵcheckBinding, checkBindingChange as ɵcheckBindingChange, checkRenderAttribute as ɵcheckRenderAttribute, checkRenderClass as ɵcheckRenderClass, checkRenderProperty as ɵcheckRenderProperty, checkRenderStyle as ɵcheckRenderStyle, checkRenderText as ɵcheckRenderText, createRenderComponentType as ɵcreateRenderComponentType, createRenderElement as ɵcreateRenderElement, getComponentFactoryViewClass as ɵgetComponentFactoryViewClass, inlineInterpolate as ɵinlineInterpolate, interpolate as ɵinterpolate, noop as ɵnoop, pureProxy1 as ɵpureProxy1, pureProxy10 as ɵpureProxy10, pureProxy2 as ɵpureProxy2, pureProxy3 as ɵpureProxy3, pureProxy4 as ɵpureProxy4, pureProxy5 as ɵpureProxy5, pureProxy6 as ɵpureProxy6, pureProxy7 as ɵpureProxy7, pureProxy8 as ɵpureProxy8, pureProxy9 as ɵpureProxy9, selectOrCreateRenderHostElement as ɵselectOrCreateRenderHostElement, setBindingDebugInfo as ɵsetBindingDebugInfo, setBindingDebugInfoForChanges as ɵsetBindingDebugInfoForChanges, subscribeToRenderElement as ɵsubscribeToRenderElement, ArgumentType as ɵArgumentType, BindingType as ɵBindingType, DepFlags as ɵDepFlags, NodeFlags as ɵNodeFlags, ProviderType as ɵProviderType, QueryBindingType as ɵQueryBindingType, QueryValueType as ɵQueryValueType, ViewFlags as ɵViewFlags, anchorDef as ɵanchorDef, createComponentFactory as ɵcreateComponentFactory, createRendererTypeV2 as ɵcreateRendererTypeV2, directiveDef as ɵdirectiveDef, elementDef as ɵelementDef, elementEventFullName as ɵelementEventFullName, ngContentDef as ɵngContentDef, nodeValue as ɵnodeValue, pipeDef as ɵpipeDef, providerDef as ɵproviderDef, pureArrayDef as ɵpureArrayDef, pureObjectDef as ɵpureObjectDef, purePipeDef as ɵpurePipeDef, queryDef as ɵqueryDef, textDef as ɵtextDef, unwrapValue as ɵunwrapValue, viewDef as ɵviewDef, AnimationQueue as ɵz, _initViewEngine as ɵp, _iterableDiffersFactory as ɵm, _keyValueDiffersFactory as ɵn, _localeFactory as ɵo, ApplicationRef_ as ɵf, _appIdRandomProviderFactory as ɵg, defaultIterableDiffers as ɵh, defaultKeyValueDiffers as ɵi, DefaultIterableDifferFactory as ɵk, DefaultKeyValueDifferFactory as ɵl, ReflectiveInjector_ as ɵc, ReflectiveDependency as ɵd, resolveReflectiveProviders as ɵe, isBlank as ɵj, wtfEnabled as ɵq, createScope as ɵs, detectWTF as ɵr, endTimeRange as ɵv, leave as ɵt, startTimeRange as ɵu, makeParamDecorator as ɵa, makePropDecorator as ɵb, _def as ɵx, NodeType as ɵy };