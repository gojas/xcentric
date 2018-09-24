import {Injectable, Injector} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../xcentric.entity-manager.module';
import {EntityManagerStateService, State} from './entity-manager-state.service';

export enum EventType {
  PreCreate = 1,
  PreUpdate = 2,
  PreDelete = 3,

  PreRemove = 4,
  PrePersist = 5
}

@Injectable()
export class EntityManagerEventService {

  configuration: EntityManagerModuleConfiguration;

  private eventMapping: Object = {};

  public constructor(
    private injector: Injector,
    private state: EntityManagerStateService
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

  public runPreFlush(): EntityManagerEventService {

    for (const entity of this.state.getEntities(State.Create)) {
      this.run(entity, EventType.PreCreate);
    }

    for (const entity of this.state.getEntities(State.Update)) {
      this.run(entity, EventType.PreUpdate);
    }

    for (const entity of this.state.getEntities(State.Delete)) {
      this.run(entity, EventType.PreDelete);
    }

    return this;
  }

  private createMapping(): void {
    this.eventMapping[EventType.PreCreate] = 'prePost';
    this.eventMapping[EventType.PreUpdate] = 'prePut';
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
