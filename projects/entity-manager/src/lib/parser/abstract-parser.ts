import { Parser } from './parser';
import { EntityMethodRequiredForProperty } from '../error/entity-method-for-property-required.error';
import { EntityPropertyNotArrayButSetAsAssociationMany } from '../error/entity-property-not-array-but-set-as-association-many.error';
import {EntityManagerMetaDataService} from '../service/meta/entity-manager-meta-data.service';

export abstract class AbstractParser implements Parser {

  private static readonly SETTER_METHOD_PREFIX = 'set';
  private static readonly GETTER_METHOD_PREFIX = 'get';

  protected meta: EntityManagerMetaDataService = new EntityManagerMetaDataService();

  public abstract parseEntity(instance: any, data: any);

  public parse(instance: any, data: any): any {
    const parsed = this.parseEntity(instance, data);

    for (const propertyName of this.getPropertyNames(instance)) {

      if (this.meta.hasAssociation(instance, propertyName)) {
        this.createAssociation(instance, propertyName);
      }

      if (this.meta.hasAssociationMany(instance, propertyName)) {
        this.createAssociationMany(instance, propertyName);
      }
    }

    return parsed;
  }

  public parseArray(associationClass: typeof Object, data: any[]): any[] {
    const parsed = [];

    for (const entity of data) {
      parsed.push(this.parse(this.getInstance(associationClass), entity));
    }

    return parsed;
  }

  protected createAssociation(instance: any, propertyName: string) {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    this.validatePropertyNameMethods(instance, propertyName);

    const associationClass = this.meta.getAssociation(instance, propertyName);

    instance[setterMethodName](this.parse(this.getInstance(associationClass), instance[getterMethodName]()));
  }

  protected createAssociationMany(instance: any, propertyName: string) {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    this.validatePropertyNameMethods(instance, propertyName);

    const associationClass = this.meta.getAssociationMany(instance, propertyName);

    if (!(instance[getterMethodName]() instanceof Array)) {
      throw new EntityPropertyNotArrayButSetAsAssociationMany(instance, propertyName);
    }

    instance[setterMethodName](this.parseArray(associationClass, instance[getterMethodName]()));
  }

  protected getSetterMethodName(propertyName): string {
    propertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

    return `${AbstractParser.SETTER_METHOD_PREFIX}${propertyName}`;
  }

  protected getGetterMethodName(propertyName): string {
    propertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

    return `${AbstractParser.GETTER_METHOD_PREFIX}${propertyName}`;
  }

  protected getPropertyNames(instance: any): string[] {
    return Object.getOwnPropertyNames(instance);
  }

  protected getInstance(toCreate: typeof Object): any {
    return new toCreate();
  }

  private validatePropertyNameMethods(instance: any, propertyName: string): void {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    if (typeof instance[setterMethodName] !== 'function') {
      throw new EntityMethodRequiredForProperty(instance, propertyName, setterMethodName);
    }

    if (typeof instance[getterMethodName] !== 'function') {
      throw new EntityMethodRequiredForProperty(instance, propertyName, getterMethodName);
    }
  }

}
