import {Injectable} from '@angular/core';
import {EntityManagerStateService, State} from './entity-manager-state.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {EntityIdMissing} from '../error/entity-id-missing.error';
import {configuration} from '../xcentric.entity-manager.module';
import {EntityMetaHandler} from '../decorator/entity-meta-handler';
import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';
import {EntityManagerEventService, EventType} from './entity-manager-event.service';
import {EntityManagerModifierService} from './entity-manager-modifier.service';

@Injectable()
export class UnitOfWorkService {

  private metaHandler: EntityMetaHandler = new EntityMetaHandler();

  // create parser FACTORY!
  private parser: Parser = new JsonParser();

  public constructor(
    private connection: HttpClient,
    private state: EntityManagerStateService,
    private event: EntityManagerEventService,
    private modifier: EntityManagerModifierService
  ) {

  }

  public persist(entity: Object): UnitOfWorkService {
    this.event.run(entity, EventType.PrePersist);

    this.state.persist(entity);

    return this;
  }

  public remove(entity: Object): UnitOfWorkService {
    this.event.run(entity, EventType.PrePersist);

    this.state.remove(entity);

    return this;
  }

  public flush(): Observable<any> {
    const flush = [];

    for (const entity of this.state.getEntities(State.Create)) {
      this.event.run(entity, EventType.PrePost);
    }
    for (const entity of this.state.getEntities(State.Update)) {
      this.event.run(entity, EventType.PrePut);
    }
    for (const entity of this.state.getEntities(State.Delete)) {
      this.event.run(entity, EventType.PreDelete);
    }

    for (const entity of this.state.getEntities(State.Create)) {
      flush.push(this.post(entity));
    }

    for (const entity of this.state.getEntities(State.Update)) {
      flush.push(this.put(entity));
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

  private post(toCreateEntity: Object): Observable<Object> {
    const request = this.getPostRequest(toCreateEntity);

    return this.connection.post(
      request.url,
      request.body
    ).pipe(map((loadedEntity: any) => {
      return this.parser.parse(toCreateEntity, loadedEntity);
    }));
  }

  private put(toUpdateEntity: Object): Observable<Object> {
    const request = this.getPutRequest(toUpdateEntity);

    return this.connection.put(
      request.url,
      request.body
    ).pipe(map((loadedEntity: any) => {
      return this.parser.parse(toUpdateEntity, loadedEntity);
    }));
  }

  private delete(toDeleteEntity: Object): Observable<any> {
    const request = this.getDeleteRequest(toDeleteEntity);

    return this.connection.delete(
      request.url
    );
  }

  private getPostRequest(toCreateEntity: Object): HttpRequest<any> {
    const apiRoute = this.metaHandler.getRoute(toCreateEntity);

    return this.modifier.modifyRequest(toCreateEntity, new HttpRequest<any>('POST', configuration.urlPrefix + apiRoute, toCreateEntity));
  }

  private getPutRequest(toUpdateEntity: Object): HttpRequest<any> {
    const id = +toUpdateEntity['id'],
      apiRoute = this.metaHandler.getRoute(toUpdateEntity);

    if (!id) {
      throw new EntityIdMissing(toUpdateEntity);
    }

    return this.modifier.modifyRequest(
      toUpdateEntity,
      new HttpRequest<any>('PUT', configuration.urlPrefix + apiRoute + '/' + id, toUpdateEntity)
    );
  }

  private getDeleteRequest(toDeleteEntity: Object): HttpRequest<any> {
    const id = +toDeleteEntity['id'],
      apiRoute = this.metaHandler.getRoute(toDeleteEntity);

    if (!id) {
      throw new EntityIdMissing(toDeleteEntity);
    }

    return this.modifier.modifyRequest(
      toDeleteEntity,
      new HttpRequest<any>('DELETE', configuration.urlPrefix + apiRoute + '/' + toDeleteEntity['id'])
    );
  }

}
