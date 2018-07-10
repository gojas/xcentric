import {Injectable} from '@angular/core';
import {Meta} from './meta';
import {MetaPropertyNotDefined} from '../../decorator/error/meta-property-not-defined.error';

@Injectable()
export class EntityManagerMetaDataService {

  public createMetaData(instance: Object): EntityManagerMetaDataService {
    instance.constructor[Meta.META] = instance.constructor[Meta.META] || {};

    return this;
  }

  public hasMetaData(instance: Object): boolean {
    return instance.constructor[Meta.META];
  }

  public hasMetaDataProperty(instance: Object, metaProperty: string): boolean {
    if (!this.hasMetaData(instance)) {
      console.error(`No meta data for instance ${instance}`);
    }

    return this.isValueNotEmpty(instance.constructor[Meta.META][metaProperty]);
  }

  public getMetaDataProperty(instance: Object, metaProperty: string): any {

    if (!this.hasMetaDataProperty(instance, metaProperty)) {
      throw new MetaPropertyNotDefined(instance, metaProperty);
    }

    return instance.constructor[Meta.META][metaProperty];
  }

  public setMetaDataProperty(instance: Object, metaProperty: string, value: any): this {

    if (!this.hasMetaData(instance)) {
      console.error(`No meta data for instance ${instance}`);
    }

    instance.constructor[Meta.META][metaProperty] = value;

    return this;
  }

  private isValueNotEmpty(value: any): boolean {
    return typeof value !== 'undefined' && value !== null && value !== '';
  }

  public getAssociation(instance: Object, propertyKey: string): typeof Object {
    return instance.constructor[Meta.META][Meta.META_ASSOCIATIONS][propertyKey];
  }

  public getAssociationMany(instance: Object, propertyKey: string): typeof Object {
    return instance.constructor[Meta.META][Meta.META_ASSOCIATIONS_MANY][propertyKey];
  }

  public hasAssociation(instance: Object, propertyKey: string) {

    if (!this.hasMetaDataProperty(instance, Meta.META_ASSOCIATIONS)) {
      return false;
    }

    return instance.constructor[Meta.META][Meta.META_ASSOCIATIONS][propertyKey];
  }

  public hasAssociationMany(instance: Object, propertyKey: string) {

    if (!this.hasMetaDataProperty(instance, Meta.META_ASSOCIATIONS_MANY)) {
      return false;
    }

    return instance.constructor[Meta.META][Meta.META_ASSOCIATIONS_MANY][propertyKey];
  }
}
