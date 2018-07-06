export class EntityMethodRequiredForProperty extends Error {
    constructor(entity: Object, propertyName: string, methodName: string) {
        super(`Method of name ${methodName} not found or not public in entity
          ${entity.constructor.name}, but property name ${propertyName} is defined!`);

        Object.setPrototypeOf(this, EntityMethodRequiredForProperty.prototype);
    }
}
