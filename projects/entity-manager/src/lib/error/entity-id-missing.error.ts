export class EntityIdMissing extends Error {
    constructor(entity: any) {
        super(`ID missing in entity ${entity}!`);

        Object.setPrototypeOf(this, EntityIdMissing.prototype);
    }
}
