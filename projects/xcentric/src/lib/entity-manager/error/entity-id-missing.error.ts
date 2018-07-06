export class EntityIdMissing extends Error {
    constructor(entity: Object) {
        super(`ID missing in entity ${entity}!`);

        Object.setPrototypeOf(this, EntityIdMissing.prototype);
    }
}
