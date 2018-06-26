import { Entity } from '../service/entity';
import { Parser } from './parser';
import { EntityMetaHandler } from '../decorator/entity-meta-handler';
import { EntityMethodRequiredForProperty } from '../error/entity-method-for-property-required.error';
import { EntityPropertyNotArrayButSetAsAssociationMany } from '../error/entity-property-not-array-but-set-as-association-many.error';

export abstract class AbstractParser implements Parser {

  private static readonly SETTER_METHOD_PREFIX = 'set';
  private static readonly GETTER_METHOD_PREFIX = 'get';

  protected metaHandler: EntityMetaHandler = new EntityMetaHandler();

  public abstract parseEntity(instance: Entity, data: any);

  public parse(instance: Entity, data: any): Entity {
    const parsed = this.parseEntity(instance, data);

    for (const propertyName of this.getPropertyNames(instance)) {

      if (this.metaHandler.hasAssociation(instance, propertyName)) {
        this.createAssociation(instance, propertyName);
      }

      if (this.metaHandler.hasAssociationMany(instance, propertyName)) {
        this.createAssociationMany(instance, propertyName);
      }

      if (this.metaHandler.hasDate(instance, propertyName)) {
        this.reParseDate(instance, propertyName);
      }
    }

    return parsed;
  }

  public reParseDate(instance: Entity, propertyName: string) {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    this.validatePropertyNameMethods(instance, propertyName);

    instance[setterMethodName](new Date(instance[getterMethodName]()));
  }

  public parseArray(associationClass: typeof Entity, data: any[]): Entity[] {
    const parsed = [];

    for (const entity of data) {
      parsed.push(this.parse(this.getInstance(associationClass), entity));
    }

    return parsed;
  }

  protected createAssociation(instance: Entity, propertyName: string) {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    this.validatePropertyNameMethods(instance, propertyName);

    const associationClass = this.metaHandler.getAssociation(instance, propertyName);

    instance[setterMethodName](this.parse(this.getInstance(associationClass), instance[getterMethodName]()));
  }

  protected createAssociationMany(instance: Entity, propertyName: string) {
    const setterMethodName = this.getSetterMethodName(propertyName),
      getterMethodName = this.getGetterMethodName(propertyName);

    this.validatePropertyNameMethods(instance, propertyName);

    const associationClass = this.metaHandler.getAssociationMany(instance, propertyName);

    if (!(instance[getterMethodName]() instanceof Array)) {
      throw new EntityPropertyNotArrayButSetAsAssociationMany(instance, propertyName);
    }

    // now this is the thing, should we create collection or deal with simple array,
    // for now parseArray is called, but we can create parseCollection
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

  protected getPropertyNames(instance: Entity): string[] {
    return Object.getOwnPropertyNames(instance);
  }

  protected getInstance(toCreate: typeof Entity): Entity {
    return new toCreate();
  }

  private validatePropertyNameMethods(instance: Entity, propertyName: string): void {
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
