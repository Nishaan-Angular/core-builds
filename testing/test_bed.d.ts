/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgModuleFactory, PlatformRef, Provider, SchemaMetadata, Type } from '../index';
/**
 * @experimental
 */
export declare class TestBed implements Injector {
    private _instantiated;
    private _compiler;
    private _moduleRef;
    private _ngModuleFactory;
    private _compilerOptions;
    private _providers;
    private _declarations;
    private _imports;
    private _entryComponents;
    private _schemas;
    reset(): void;
    platform: PlatformRef;
    ngModule: Type;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureModule(moduleDef: {
        providers?: any[];
        declarations?: any[];
        imports?: any[];
        entryComponents?: any[];
        schemas?: Array<SchemaMetadata | any>;
    }): void;
    createModuleFactory(): Promise<NgModuleFactory<any>>;
    initTestModule(): void;
    private _createCompilerAndModule();
    private _createFromModuleFactory(ngModuleFactory);
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function): any;
}
/**
 * @experimental
 */
export declare function getTestBed(): TestBed;
/**
 * @deprecated use getTestBed instead.
 */
export declare function getTestInjector(): TestBed;
/**
 * Set the providers that the test injector should use. These should be providers
 * common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on the current platform. If you absolutely need to change the providers,
 * first use `resetBaseTestProviders`.
 *
 * Test modules and platforms for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 *
 * @deprecated Use initTestEnvironment instead
 */
export declare function setBaseTestProviders(platformProviders: Array<Type | Provider | any[]>, applicationProviders: Array<Type | Provider | any[]>): void;
/**
 * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
 * angular module. These are common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on the current platform. If you absolutely need to change the providers,
 * first use `resetTestEnvironment`.
 *
 * Test modules and platforms for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 *
 * @experimental
 */
export declare function initTestEnvironment(ngModule: Type, platform: PlatformRef): Injector;
/**
 * Reset the providers for the test injector.
 *
 * @deprecated Use resetTestEnvironment instead.
 */
export declare function resetBaseTestProviders(): void;
/**
 * Reset the providers for the test injector.
 *
 * @experimental
 */
export declare function resetTestEnvironment(): void;
/**
 * Compile entryComponents with a `templateUrl` for the test's NgModule.
 * It is necessary to call this function
 * as fetching urls is asynchronous.
 *
 * @experimental
 */
export declare function doAsyncEntryPointCompilation(): Promise<any>;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @stable
 */
export declare function inject(tokens: any[], fn: Function): () => any;
/**
 * @experimental
 */
export declare class InjectSetupWrapper {
    private _moduleDef;
    constructor(_moduleDef: () => {
        providers?: any[];
        declarations?: any[];
        imports?: any[];
        entryComponents?: any[];
    });
    private _addModule();
    inject(tokens: any[], fn: Function): () => any;
}
/**
 * @experimental
 */
export declare function withProviders(providers: () => any): InjectSetupWrapper;
/**
 * @experimental
 */
export declare function withModule(moduleDef: () => {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    entryComponents?: any[];
    schemas?: Array<SchemaMetadata | any[]>;
}): InjectSetupWrapper;