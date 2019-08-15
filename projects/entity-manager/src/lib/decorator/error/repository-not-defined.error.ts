export class RepositoryNotDefined extends Error {
    constructor(constructor: any) {
        super(`Repository not defined for class ${constructor.name}`);

        Object.setPrototypeOf(this, RepositoryNotDefined.prototype);
    }
}