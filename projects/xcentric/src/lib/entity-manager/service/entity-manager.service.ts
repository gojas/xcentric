import {Injectable} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const environment = null;

import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';
import {EntityApiRouteNotFoundError} from '../error/entity-api-route-not-found.error';
import {EntityManagerState, State} from './entity-manager.state';
import {Paginated} from './paginated';
import {IdParameterMissing} from '../error/id-parameter-missing.error';
import {Observables} from './observables';
import {EntityMetaHandler} from '../decorator/entity-meta-handler';
import {EntityIdMissing} from '../error/entity-id-missing.error';


@Injectable()
export class EntityManagerService {

  private state: EntityManagerState = new EntityManagerState(this);
  private metaHandler: EntityMetaHandler = new EntityMetaHandler();
  private parser: Parser = new JsonParser();
  private observables: Observables = new Observables();

  public constructor(private adapter: HttpClient) {
  }

  public persist(entity: Object): EntityManagerService {
    this.state.persist(entity);

    return this;
  }

  public remove(entity: Object): EntityManagerService {
    this.state.remove(entity);

    return this;
  }

  public flush(): Observable<any> {
    const flush = [];

    for (const entity of this.state.getEntities(State.Create)) {
      flush.push(this.create(entity));
    }

    for (const entity of this.state.getEntities(State.Update)) {
      flush.push(this.update(entity));
    }

    for (const entity of this.state.getEntities(State.Delete)) {
      flush.push(this.delete(entity));
    }

    return Observable.create(observer => {

      forkJoin(flush)
        .subscribe(
          () => {
            this.state.clear();
            observer.next({});
            observer.complete();
          });
    });
  }

  public findOne(type: typeof Object, id: number, params: HttpParams = new HttpParams()): Observable<Object> {
    id = +id;
    if (!id) {
      throw new IdParameterMissing();
    }

    const apiRoute = this.getRoute(new type());

    return this.adapter
      .get(environment.ENTITY_MANAGER_URL_PREFIX + apiRoute + '/' + id, {
        params: params
      })
      .pipe(map((loadedEntity: any) => {
        return this.getParser().parse(new type(), loadedEntity);
      }));
  }

  public findBy(type: typeof Object, params: HttpParams = new HttpParams()): Observable<Object[]> {

    const apiRoute = this.getRoute(new type());

    return this.adapter
      .get(environment.ENTITY_MANAGER_URL_PREFIX + apiRoute, {
        params: params
      })
      .pipe(map((loadedEntities: any[]) => {
        const parsedEntities = [];

        for (const loadedEntity of loadedEntities) {
          const entity = this.getParser().parse(new type(), loadedEntity);

          parsedEntities.push(entity);
        }

        return parsedEntities;
      }));
  }

  public findPaginatedBy(type: typeof Object, params: HttpParams = new HttpParams()): Observable<Paginated> {

    const apiRoute = this.getRoute(new type());

    return this.adapter
      .get(environment.ENTITY_MANAGER_URL_PREFIX + apiRoute, {
        params: params
      })
      .pipe(map((loadedData: Paginated) => {
        const entities = loadedData.data,
          count = loadedData.total,
          parsedEntities = [];

        for (const loadedEntity of entities) {
          const entity = this.getParser().parse(new type(), loadedEntity);

          parsedEntities.push(entity);
        }

        return new Paginated(parsedEntities, count);
      }));
  }

  public create(toCreateEntity: Object, params: HttpParams = new HttpParams()): Observable<Object> {

    const apiRoute = this.getRoute(toCreateEntity);

    return this.adapter.post(
      environment.ENTITY_MANAGER_URL_PREFIX + apiRoute,
        toCreateEntity,
        {
          params: params
        }
      ).pipe(map((loadedEntity: any) => {
        return this.getParser().parse(toCreateEntity, loadedEntity);
      }));
  }

  public update(toUpdateEntity: Object, params: HttpParams = new HttpParams()): Observable<Object> {
    const id = +toUpdateEntity['id'],
      apiRoute = this.getRoute(toUpdateEntity);

    if (!id) {
      throw new EntityIdMissing(toUpdateEntity);
    }

    return this.adapter.put(
      environment.ENTITY_MANAGER_URL_PREFIX + apiRoute + '/' + id,
        toUpdateEntity,
        {
          params: params
        }
      ).pipe(map((loadedEntity: any) => {
        return this.getParser().parse(toUpdateEntity, loadedEntity);
      }));
  }

  public delete(toDeleteEntity: Object, params: HttpParams = new HttpParams()): Observable<any> {

    const apiRoute = this.getRoute(toDeleteEntity);

    return this.adapter.delete(
      environment.ENTITY_MANAGER_URL_PREFIX + apiRoute + '/' + toDeleteEntity['id'],
      {
        params: params
      }
    );
  }

  public add(observable: Observable<any>): EntityManagerService {
    this.observables.add(observable);

    return this;
  }

  public collect(): Observable<Observables> {

    return Observable.create(observer => {

      forkJoin(this.observables.getAll())
        .subscribe(
          (observables: Observable<any>[]) => {

            this.observables.clear();

            observer.next(new Observables(observables));
            observer.complete();
          });

      if (this.observables.count() === 0) {
        observer.next([]);
        observer.complete();
      }
    });
  }

  public getRoute(instance: Object): string {

    if (!this.metaHandler.hasMetaProperty(instance, EntityMetaHandler.META_ROUTE)) {
      throw new EntityApiRouteNotFoundError(instance);
    }

    return this.metaHandler.getMetaProperty(instance, EntityMetaHandler.META_ROUTE);
  }

  public setParser(parser: Parser): EntityManagerService {
    this.parser = parser;
    return this;
  }

  public getParser(): Parser {
    return this.parser;
  }
}
