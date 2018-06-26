import { Entity } from '../service/entity';

export class EntityIdMissing extends Error {
    constructor(entity: Entity) {
        super(`ID missing in entity ${entity}!`);

        Object.setPrototypeOf(this, EntityIdMissing.prototype);
    }
}
