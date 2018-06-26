export class MetaPropertyNotDefined extends Error {
    constructor(constructor: any, propertyName: string) {
        super(`Meta property ${propertyName} not defined for class ${constructor.name}`);

        Object.setPrototypeOf(this, MetaPropertyNotDefined.prototype);
    }
}