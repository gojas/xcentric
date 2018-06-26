import { Entity } from '../service/entity';
import { MetaPropertyNotDefined } from './error/meta-property-not-defined.error';

export class EntityMetaHandler {

  public static META = 'meta';
  public static META_VALIDATORS = 'validators';
  public static META_ROUTE = 'route';
  public static META_ASSOCIATIONS = 'associations';
  public static META_ASSOCIATIONS_MANY = 'associationsMany';
  public static META_CONVERTES = 'converters';
  public static META_DATE = 'DateConversion';

  public getAssociation(instance: Entity, propertyKey: string): typeof Entity {
    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS][propertyKey];
  }

  public getAssociationMany(instance: Entity, propertyKey: string): typeof Entity {
    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS_MANY][propertyKey];
  }

  public hasAssociation(instance: Entity, propertyKey: string) {

    if (!this.hasMetaProperty(instance, EntityMetaHandler.META_ASSOCIATIONS)) {
      return false;
    }

    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS][propertyKey];
  }

  public hasAssociationMany(instance: Entity, propertyKey: string) {

    if (!this.hasMetaProperty(instance, EntityMetaHandler.META_ASSOCIATIONS_MANY)) {
      return false;
    }

    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS_MANY][propertyKey];
  }

  public hasDate(instance: Entity, propertyKey: string) {

    if (!this.hasMetaProperty(instance, EntityMetaHandler.META_CONVERTES)) {
      return false;
    }

    if (instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey] instanceof Array) {
      for (const anno of instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_CONVERTES][propertyKey]) {
        if (anno['key'] === EntityMetaHandler.META_DATE) {
          return true;
        }
      }
    }

    return false;
  }

  public hasMetaProperty(instance: Entity, metaProperty: string): boolean {

    if (!this.hasMeta(instance)) {
      return false;
    }

    return this.isValueNotEmpty(instance.constructor[EntityMetaHandler.META][metaProperty]);
  }

  public getMetaProperty(instance: Entity, metaProperty: string): any {

    if (!this.hasMetaProperty(instance, metaProperty)) {
      throw new MetaPropertyNotDefined(instance, metaProperty);
    }

    return instance.constructor[EntityMetaHandler.META][metaProperty];
  }

  private hasMeta(instance: Entity): boolean {
    return instance.constructor[EntityMetaHandler.META];
  }

  private isValueNotEmpty(value: any): boolean {
    return typeof value !== 'undefined' && value !== null && value !== '';
  }

}
