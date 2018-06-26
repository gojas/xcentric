import { EntityManagerService } from './entity-manager.service';
import { Entity } from './entity';

export enum State {
    Create = 1,
    Update = 2,
    Delete = 3
}

export class EntityManagerState {

    public entities = {};

    public constructor(
        private entityManager: EntityManagerService
    ) {
        this.init();
    }

    public getEntities(state: State): Entity[] {
        const persisted = this.entities[state],
            entities = [];

        for (const apiRoute in persisted) {
            for (const entity of persisted[apiRoute]) {
                entities.push(entity);
            }
        }

        return entities;
    }

    public persist(entity: Entity): EntityManagerState {
        const state = entity['id'] ? State.Update : State.Create;

        this.prepare(state, entity)
            .addOrReplace(state, entity);

        return this;
    }

    public remove(entity: Entity): EntityManagerState {
        this.prepare(State.Delete, entity)
            .addOrReplace(State.Delete, entity);

        return this;
    }

    public flush(): EntityManagerState {



        return this;
    }

    public clear(): void {
        this.entities[State.Create] = {};
        this.entities[State.Update] = {};
        this.entities[State.Delete] = {};
    }

    private prepare(state: State, entity: Entity): EntityManagerState {
        const apiRoute = this.entityManager.getRoute(entity);

        this.entities[state][apiRoute] = this.entities[state][apiRoute] || [];

        return this;
    }

    private addOrReplace(state: State, entity: Entity): EntityManagerState {
        const apiRoute = this.entityManager.getRoute(entity);

        if (this.exists(state, apiRoute, entity)) {
            this.replace(state, apiRoute, entity);
        } else {
            this.add(state, apiRoute, entity);
        }

        return this;
    }

    private add(state: State, apiRoute: string, entity: Entity): EntityManagerState {
        this.entities[state][apiRoute].push(entity);

        return this;
    }

    private replace(state: State, apiRoute: string, entity: Entity): EntityManagerState {

        return this;
    }

    private exists(state: State, apiRoute: string, entity: Entity): boolean {
        const index = this.entities[state][apiRoute].findIndex(commitedEntity => commitedEntity['id'] === entity['id']);

        return index !== -1;
    }

    private init(): void {
        this.clear();
    }
}
