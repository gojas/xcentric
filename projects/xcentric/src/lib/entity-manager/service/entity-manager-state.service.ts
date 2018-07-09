import {Injectable} from '@angular/core';
import {EntityMetaHandler} from '../decorator/entity-meta-handler';
import {Guid} from '../helper/guid';

export enum State {
    Create = 1,
    Update = 2,
    Delete = 3
}

@Injectable()
export class EntityManagerStateService {

    private metaHandler: EntityMetaHandler = new EntityMetaHandler();

    public entities = {};

    public constructor(
    ) {
        this.init();
    }

    public getAll(): Object[] {
      return [].concat(
        this.getEntities(State.Create),
        this.getEntities(State.Update),
        this.getEntities(State.Delete)
      );
    }

    public getEntities(state: State): Object[] {
        const persisted = this.entities[state] || [],
            entities = [];

        for (const apiRoute in persisted) {
          if (persisted[apiRoute]) {
            for (const entity of persisted[apiRoute]) {
              entities.push(entity);
            }
          }
        }

        return entities;
    }

    public persist(entity: Object): EntityManagerStateService {
        const state = entity['id'] ? State.Update : State.Create;

        this.prepare(state, entity)
            .addOrReplace(state, entity);

        return this;
    }

    public remove(entity: Object): EntityManagerStateService {
        this.prepare(State.Delete, entity)
            .addOrReplace(State.Delete, entity);

        return this;
    }

    public clear(): void {
        this.entities[State.Create] = {};
        this.entities[State.Update] = {};
        this.entities[State.Delete] = {};
    }

    private prepare(state: State, entity: Object): EntityManagerStateService {
        this.entities[state][entity.constructor.name] = this.entities[state][entity.constructor.name] || [];

        return this;
    }

    private addOrReplace(state: State, entity: Object): EntityManagerStateService {
        if (this.exists(state, entity)) {
            this.replace(state, entity);
        } else {
            this.add(state,  entity);
        }

        return this;
    }

    private add(state: State, entity: Object): EntityManagerStateService {
        this.metaHandler.setMetaProperty(entity, EntityMetaHandler.META_UNIQUE_ID, Guid.guid());

        this.entities[state][entity.constructor.name].push(entity);

        return this;
    }

    private replace(state: State, entity: Object): EntityManagerStateService {
        const entities = this.entities[state][entity.constructor.name] || [];

        let stateEntity = this.find(state, entity);

        stateEntity = entity;

        return this;
    }

    private exists(state: State, entity: Object): boolean {
        return this.find(state, entity) !== null;
    }

    private find(state: State, entity: Object): Object|null {
      const entities = this.entities[state][entity.constructor.name] || [];

      let foundEntity = null;

      for (const stateEntity of entities) {
        if (this.metaHandler.hasMetaProperty(stateEntity, EntityMetaHandler.META_UNIQUE_ID) &&
          this.metaHandler.hasMetaProperty(entity, EntityMetaHandler.META_UNIQUE_ID) &&
          this.metaHandler.getMetaProperty(stateEntity, EntityMetaHandler.META_UNIQUE_ID) ===
          this.metaHandler.getMetaProperty(entity, EntityMetaHandler.META_UNIQUE_ID)
        ) {
          foundEntity = stateEntity;
        }
      }

      return foundEntity;
    }

    private init(): void {
        this.clear();
    }
}
