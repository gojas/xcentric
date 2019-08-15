import {Injectable} from '@angular/core';
import {Guid} from '../helper/guid';
import {EntityManagerMetaDataService} from './meta/entity-manager-meta-data.service';
import {Meta} from './meta/meta';

export enum State {
    Create = 1,
    Update = 2,
    Delete = 3
}

@Injectable({
    providedIn: 'root'
})
export class EntityManagerStateService {

    public entities = {};

    public constructor(
      private meta: EntityManagerMetaDataService
    ) {
        this.init();
    }

    public getAll(): any[] {
      return [].concat(
        this.getEntities(State.Create),
        this.getEntities(State.Update),
        this.getEntities(State.Delete)
      );
    }

    public getEntities(state: State): any[] {
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

    public persist(entity: any): EntityManagerStateService {
        const state = entity.id ? State.Update : State.Create;

        this.prepare(state, entity)
            .addOrReplace(state, entity);

        return this;
    }

    public remove(entity: any): EntityManagerStateService {
        this.prepare(State.Delete, entity)
            .addOrReplace(State.Delete, entity);

        return this;
    }

    public clear(): void {
        this.entities[State.Create] = {};
        this.entities[State.Update] = {};
        this.entities[State.Delete] = {};
    }

    private prepare(state: State, entity: any): EntityManagerStateService {
        this.entities[state][entity.constructor.name] = this.entities[state][entity.constructor.name] || [];

        return this;
    }

    private addOrReplace(state: State, entity: any): EntityManagerStateService {
        if (this.exists(state, entity)) {
            this.replace(state, entity);
        } else {
            this.add(state,  entity);
        }

        return this;
    }

    private add(state: State, entity: any): EntityManagerStateService {
        this.meta.setMetaDataProperty(entity, Meta.META_UNIQUE_ID, Guid.guid());

        this.entities[state][entity.constructor.name].push(entity);

        return this;
    }

    private replace(state: State, entity: any): EntityManagerStateService {
        const entities = this.entities[state][entity.constructor.name] || [];

        let stateEntity = this.find(state, entity);

        stateEntity = entity;

        return this;
    }

    private exists(state: State, entity: any): boolean {
        return this.find(state, entity) !== null;
    }

    private find(state: State, entity: any): any|null {
      const entities = this.entities[state][entity.constructor.name] || [];

      let foundEntity = null;

      for (const stateEntity of entities) {
        if (this.meta.hasMetaDataProperty(stateEntity, Meta.META_UNIQUE_ID) &&
          this.meta.hasMetaDataProperty(entity, Meta.META_UNIQUE_ID) &&
          this.meta.getMetaDataProperty(stateEntity, Meta.META_UNIQUE_ID) ===
          this.meta.getMetaDataProperty(entity, Meta.META_UNIQUE_ID)
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
