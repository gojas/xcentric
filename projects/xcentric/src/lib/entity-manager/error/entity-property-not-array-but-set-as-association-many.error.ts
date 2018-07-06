export class EntityPropertyNotArrayButSetAsAssociationMany extends Error {
    constructor(entity: Object, propertyName: string) {
        super(`Property ${propertyName} of entity ${entity} set as AssociationMany but not array passed!`);

        Object.setPrototypeOf(this, EntityPropertyNotArrayButSetAsAssociationMany.prototype);
    }
}
