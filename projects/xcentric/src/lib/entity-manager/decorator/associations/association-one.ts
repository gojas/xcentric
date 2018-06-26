import 'reflect-metadata';
import { EntityMetaHandler } from '../entity-meta-handler';

export function AssociationOne(associatedEntity: Object): Function {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.constructor[EntityMetaHandler.META] = target.constructor[EntityMetaHandler.META] || {};
        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS] = target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS] || {};

        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS][propertyKey] = associatedEntity;
    }
}
