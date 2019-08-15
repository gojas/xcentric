export class IdParameterMissing extends Error {
    constructor() {
        super(`ID parameter is empty!`);

        Object.setPrototypeOf(this, IdParameterMissing.prototype);
    }
}
