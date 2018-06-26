import { EntityMetaHandler } from '../entity-meta-handler';

export function MinValue(minValue: number): Function {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        target.constructor[EntityMetaHandler.META] = target.constructor[EntityMetaHandler.META] || {};
        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS] = target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS] || {};


        if (!(target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] instanceof Array)) {
            target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] = [];
        }

        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] = [...target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey], {
            'key': 'MinValue', // for now string
            'value': minValue
        }];
    }
}
