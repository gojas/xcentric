import 'reflect-metadata';
import {EntityMetaHandler} from '../entity-meta-handler';

export function DateConversion(): Function {

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target.constructor[EntityMetaHandler.META] = target.constructor[EntityMetaHandler.META] || {};
    target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES] =
      target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES] || {};

    if (!(target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey] instanceof Array)) {
      target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey] = [];
    }

    target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey] =
      [...target.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey], {
        'key': EntityMetaHandler.META_DATE // for now string
      }];
  };
}
