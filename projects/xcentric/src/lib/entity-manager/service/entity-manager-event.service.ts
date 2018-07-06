import {Injectable} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../xcentric.entity-manager.module';

export enum EventType {
  PreCreate = 1,
  PreUpdate = 2,
  PreRemove = 3,
  PrePersist = 4
}

@Injectable()
export class EntityManagerEventService {

  private eventMapping = {};

  configuration: EntityManagerModuleConfiguration;

  public constructor() {
    this.configuration = configuration;
    this.createMapping();
  }

  public runEvent(entity: Object, eventType: EventType) {
    const types = this.configuration[this.eventMapping[eventType]];

    if (typeof types !== 'undefined') {
      for (const type of types) {
        const preUpdateListener = new type();

        const methodName = this.createEventMethodName(eventType);

        if (typeof preUpdateListener[methodName] === 'function') {
          preUpdateListener[methodName](entity);
        }
      }
    }
  }

  private createMapping(): void {
    this.eventMapping[EventType.PreUpdate] = 'preUpdate';
    this.eventMapping[EventType.PreCreate] = 'preCreate';
    this.eventMapping[EventType.PreRemove] = 'preRemove';
    this.eventMapping[EventType.PrePersist] = 'prePersist';
  }

  private createEventMethodName(eventType: EventType): string {
    const methodPrefix = 'on',
      methodName = this.eventMapping[eventType];

    return methodPrefix + methodName[0].toUpperCase() + methodName.slice(1);
  }
}
