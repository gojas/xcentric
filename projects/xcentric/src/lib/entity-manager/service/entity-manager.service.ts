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
import {EntityMetaHandler} from '../decorator/entity-meta-handler';
import {configuration} from '../xcentric.entity-manager.module';
import {UnitOfWorkService} from './unit-of-work.service';

@Injectable()
export class EntityManagerService {

  private metaHandler: EntityMetaHandler = new EntityMetaHandler();
  private parser: Parser = new JsonParser();
  private observables: Observables = new Observables();

  public constructor(
    private adapter: HttpClient,
    private unitOfWorkService: UnitOfWorkService
  ) {
  }

  public persist(entity: Object): EntityManagerService {
    this.unitOfWorkService.persist(entity);

    return this;
  }

  public remove(entity: Object): EntityManagerService {
    this.unitOfWorkService.remove(entity);

    return this;
  }

  public flush(): Observable<any> {
    return this.unitOfWorkService.flush();
  }

  public findOne(type: typeof Object, id: number, params: HttpParams = new HttpParams()): Observable<Object> {
    id = +id;
    if (!id) {
      throw new IdParameterMissing();
    }

    const apiRoute = this.metaHandler.getRoute(new type());

    return this.adapter
      .get(configuration.urlPrefix + apiRoute + '/' + id, {
        params: params
      })
      .pipe(map((loadedEntity: any) => {
        return this.parser.parse(new type(), loadedEntity);
      }));
  }

  public findMore(type: typeof Object, params: HttpParams = new HttpParams()): Observable<Object[]> {

    const apiRoute = this.metaHandler.getRoute(new type());

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
