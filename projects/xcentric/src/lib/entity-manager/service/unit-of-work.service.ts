import {Injectable} from '@angular/core';
import {EntityManagerStateService, State} from './entity-manager-state.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EntityIdMissing} from '../error/entity-id-missing.error';
import {configuration} from '../xcentric.entity-manager.module';
import {EntityMetaHandler} from '../decorator/entity-meta-handler';
import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';
import {EntityManagerEventService, EventType} from './entity-manager-event.service';

@Injectable()
export class UnitOfWorkService {

  private metaHandler: EntityMetaHandler = new EntityMetaHandler();

  // create parser FACTORY!
  private parser: Parser = new JsonParser();

  public constructor(
    private connection: HttpClient,
    private state: EntityManagerStateService,
    private event: EntityManagerEventService
  ) {

  }

  public persist(entity: Object): UnitOfWorkService {
    this.state.persist(entity);

    return this;
  }

  public remove(entity: Object): UnitOfWorkService {
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

  public create(toCreateEntity: Object, params: HttpParams = new HttpParams()): Observable<Object> {
    const apiRoute = this.metaHandler.getRoute(toCreateEntity);

    this.event.runEvent(toCreateEntity, EventType.PreCreate);
    this.event.runEvent(toCreateEntity, EventType.PrePersist);

    return this.connection.post(
      configuration.urlPrefix + apiRoute,
      toCreateEntity,
      {
        params: params
      }
    ).pipe(map((loadedEntity: any) => {
      return this.parser.parse(toCreateEntity, loadedEntity);
    }));
  }

  public update(toUpdateEntity: Object, params: HttpParams = new HttpParams()): Observable<Object> {
    const id = +toUpdateEntity['id'],
      apiRoute = this.metaHandler.getRoute(toUpdateEntity);

    if (!id) {
      throw new EntityIdMissing(toUpdateEntity);
    }

    this.event.runEvent(toUpdateEntity, EventType.PreUpdate);
    this.event.runEvent(toUpdateEntity, EventType.PrePersist);

    return this.connection.put(
      configuration.urlPrefix + apiRoute + '/' + id,
      toUpdateEntity,
      {
        params: params
      }
    ).pipe(map((loadedEntity: any) => {
      return this.parser.parse(toUpdateEntity, loadedEntity);
    }));
  }

  public delete(toDeleteEntity: Object, params: HttpParams = new HttpParams()): Observable<any> {

    const apiRoute = this.metaHandler.getRoute(toDeleteEntity);

    this.event.runEvent(toDeleteEntity, EventType.PreRemove);
    this.event.runEvent(toDeleteEntity, EventType.PrePersist);

    return this.connection.delete(
      configuration.urlPrefix + apiRoute + '/' + toDeleteEntity['id'],
      {
        params: params
      }
    );
  }

}
