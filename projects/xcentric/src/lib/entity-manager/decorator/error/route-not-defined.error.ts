export class RouteNotDefined extends Error {
    constructor(constructor: any) {
        super(`Route not defined for class ${constructor.name}`);

        Object.setPrototypeOf(this, RouteNotDefined.prototype);
    }
}