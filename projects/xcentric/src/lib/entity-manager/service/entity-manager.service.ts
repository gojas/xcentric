import {Injectable} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';
import {IdParameterMissing} from '../error/id-parameter-missing.error';
import {Observables} from './observables';
import {configuration} from '../xcentric.entity-manager.module';
import {UnitOfWorkService} from './unit-of-work.service';
import {EntityManagerMetaDataService} from './meta/entity-manager-meta-data.service';
import {Meta} from './meta/meta';
import {EntityManagerEventService, EventType} from './entity-manager-event.service';

@Injectable()
export class EntityManagerService {

  private parser: Parser = new JsonParser();
  private observables: Observables = new Observables();

  public constructor(
    private adapter: HttpClient,
    private meta: EntityManagerMetaDataService,
    private unitOfWorkService: UnitOfWorkService,
    private event: EntityManagerEventService
  ) {
  }

  public persist(entity: Object): EntityManagerService {
    this.event.run(entity, EventType.PrePersist);

    this.unitOfWorkService.persist(entity);

    return this;
  }

  public remove(entity: Object): EntityManagerService {
    this.event.run(entity, EventType.PreRemove);

    this.unitOfWorkService.remove(entity);

    return this;
  }

  public flush(): Observable<any> {
    this.event.runPreFlush();

    return this.unitOfWorkService.flush();
  }

  public findOne(type: typeof Object, params: any = {}): Observable<Object> {
    const id = +params.id;
    if (!id) {
      throw new IdParameterMissing();
    }
    
    const httpParams: HttpParams = Http.objectToHttpParams(params);
    const apiRoute = this.meta.getMetaDataProperty(new type(), Meta.META_ROUTE);

    return this.adapter
      .get(configuration.urlPrefix + apiRoute + '/' + id, {
        params: params
      })
      .pipe(map((loadedEntity: any) => {
        return this.parser.parse(new type(), loadedEntity);
      }));
  }

  public findMore(type: typeof Object, params: HttpParams = new HttpParams()): Observable<Object[]> {

    const apiRoute = this.meta.getMetaDataProperty(new type(), Meta.META_ROUTE);

    return this.adapter
      .get(configuration.urlPrefix + apiRoute, {
        params: params
      })
      .pipe(map((loadedEntities: any[]) => {
        const parsedEntities = [];

        for (const loadedEntity of loadedEntities) {
          const entity = this.parser.parse(new type(), loadedEntity);

          parsedEntities.push(entity);
        }

        return parsedEntities;
      }));
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
}
