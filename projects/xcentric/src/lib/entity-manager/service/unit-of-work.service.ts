import {Injectable} from '@angular/core';
import {EntityManagerStateService, State} from './entity-manager-state.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {EntityIdMissing} from '../error/entity-id-missing.error';
import {configuration} from '../xcentric.entity-manager.module';
import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';
import {EntityManagerModifierService} from './entity-manager-modifier.service';
import {EntityManagerMetaDataService} from './meta/entity-manager-meta-data.service';
import {Meta} from './meta/meta';

@Injectable()
export class UnitOfWorkService {

  // create parser FACTORY!
  private parser: Parser = new JsonParser();

  public constructor(
    private connection: HttpClient,
    private state: EntityManagerStateService,
    private modifier: EntityManagerModifierService,
    private meta: EntityManagerMetaDataService
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
    const apiRoute = this.meta.getMetaDataProperty(toCreateEntity, Meta.META_ROUTE);

    return this.modifier.modifyRequest(toCreateEntity, new HttpRequest<any>('POST', configuration.urlPrefix + apiRoute, toCreateEntity));
  }

  private getPutRequest(toUpdateEntity: Object): HttpRequest<any> {
    const id = +toUpdateEntity['id'],
      apiRoute = this.meta.getMetaDataProperty(toUpdateEntity, Meta.META_ROUTE);

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
      apiRoute = this.meta.getMetaDataProperty(toDeleteEntity, Meta.META_ROUTE);

    if (!id) {
      throw new EntityIdMissing(toDeleteEntity);
    }

    return this.modifier.modifyRequest(
      toDeleteEntity,
      new HttpRequest<any>('DELETE', configuration.urlPrefix + apiRoute + '/' + toDeleteEntity['id'])
    );
  }

}
