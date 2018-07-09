import {Injectable, Injector} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../xcentric.entity-manager.module';

export enum EventType {
  PrePost = 1,
  PrePut = 2,
  PreDelete = 3,

  PreRemove = 4,
  PrePersist = 5
}

@Injectable()
export class EntityManagerEventService {

  configuration: EntityManagerModuleConfiguration;

  private eventMapping: Object = {};

  public constructor(
    private injector: Injector
  ) {
    this.configuration = configuration;
    this.createMapping();
  }

  public run(entity: Object, eventType: EventType) {
    const listenersTypes = this.configuration.listeners || [];

    for (const listenerType of listenersTypes) {
      const listener = this.injector.get(listenerType);

      const methodName = this.createEventMethodName(eventType);

      if (typeof listener[methodName] === 'function') {
        listener[methodName](entity);
      }
    }
  }

  private createMapping(): void {
    this.eventMapping[EventType.PrePost] = 'prePost';
    this.eventMapping[EventType.PrePut] = 'prePut';
    this.eventMapping[EventType.PreDelete] = 'preDelete';
    this.eventMapping[EventType.PreRemove] = 'preRemove';
    this.eventMapping[EventType.PrePersist] = 'prePersist';
  }

  private createEventMethodName(eventType: EventType): string {
    const methodPrefix = 'on',
      methodName = this.eventMapping[eventType];

    return methodPrefix + methodName[0].toUpperCase() + methodName.slice(1);
  }
}
