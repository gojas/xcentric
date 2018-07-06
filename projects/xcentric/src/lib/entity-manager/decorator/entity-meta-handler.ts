import { MetaPropertyNotDefined } from './error/meta-property-not-defined.error';

export class EntityMetaHandler {

  public static META = 'meta';
  public static META_VALIDATORS = 'validators';
  public static META_ROUTE = 'route';
  public static META_ASSOCIATIONS = 'associations';
  public static META_ASSOCIATIONS_MANY = 'associationsMany';
  public static META_CONVERTES = 'converters';
  public static META_DATE = 'DateConversion';

  public getAssociation(instance: Object, propertyKey: string): typeof Object {
    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS][propertyKey];
  }

  public getAssociationMany(instance: Object, propertyKey: string): typeof Object {
    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS_MANY][propertyKey];
  }

  public hasAssociation(instance: Object, propertyKey: string) {

    if (!this.hasMetaProperty(instance, EntityMetaHandler.META_ASSOCIATIONS)) {
      return false;
    }

    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS][propertyKey];
  }

  public hasAssociationMany(instance: Object, propertyKey: string) {

    if (!this.hasMetaProperty(instance, EntityMetaHandler.META_ASSOCIATIONS_MANY)) {
      return false;
    }

    return instance.constructor[EntityMetaHandler.META][EntityMetaHandler.META_ASSOCIATIONS_MANY][propertyKey];
  }

  public hasDate(instance: Object, propertyKey: string) {

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

  public hasMetaProperty(instance: Object, metaProperty: string): boolean {

    if (!this.hasMeta(instance)) {
      return false;
    }

    return this.isValueNotEmpty(instance.constructor[EntityMetaHandler.META][metaProperty]);
  }

  public getMetaProperty(instance: Object, metaProperty: string): any {

    if (!this.hasMetaProperty(instance, metaProperty)) {
      throw new MetaPropertyNotDefined(instance, metaProperty);
    }

    return instance.constructor[EntityMetaHandler.META][metaProperty];
  }

  private hasMeta(instance: Object): boolean {
    return instance.constructor[EntityMetaHandler.META];
  }

  private isValueNotEmpty(value: any): boolean {
    return typeof value !== 'undefined' && value !== null && value !== '';
  }

}
