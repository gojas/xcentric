import { Entity } from '../service/entity';

export class EntityApiRouteNotFoundError extends Error {
    constructor(entity: Entity) {
        super(`Route of the entity ${entity.constructor.name} is empty, please use @Route() decorator!`);

        Object.setPrototypeOf(this, EntityApiRouteNotFoundError.prototype);
    }
}
