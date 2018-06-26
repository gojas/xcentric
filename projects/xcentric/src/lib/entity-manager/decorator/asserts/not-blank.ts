import { EntityMetaHandler } from '../entity-meta-handler';

export function NotBlank(): Function {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.constructor[EntityMetaHandler.META] = target.constructor[EntityMetaHandler.META] || {};
        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS] = target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS] || {};

        if (!(target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] instanceof Array)) {
            target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] = [];
        }

        target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey] = [...target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_VALIDATORS][propertyKey], {
            'key': 'NotBlank' // for now string
        }];
    }
}
