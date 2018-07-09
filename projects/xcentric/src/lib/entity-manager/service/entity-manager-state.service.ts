import {Injectable} from '@angular/core';
import {EntityMetaHandler} from '../decorator/entity-meta-handler';

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
        const apiRoute = this.metaHandler.getRoute(entity);

        this.entities[state][apiRoute] = this.entities[state][apiRoute] || [];

        return this;
    }

    private addOrReplace(state: State, entity: Object): EntityManagerStateService {
        const apiRoute = this.metaHandler.getRoute(entity);

        if (this.exists(state, apiRoute, entity)) {
            this.replace(state, apiRoute, entity);
        } else {
            this.add(state, apiRoute, entity);
        }

        return this;
    }

    private add(state: State, apiRoute: string, entity: Object): EntityManagerStateService {
        this.entities[state][apiRoute].push(entity);

        return this;
    }

    private replace(state: State, apiRoute: string, entity: Object): EntityManagerStateService {

        return this;
    }

    private exists(state: State, apiRoute: string, entity: Object): boolean {
        const index = this.entities[state][apiRoute].findIndex(commitedEntity => commitedEntity['id'] === entity['id']);

        return index !== -1;
    }

    private init(): void {
        this.clear();
    }
}
