import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpParams,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {configuration} from '../xcentric.entity-manager.module';
import {IdParameterMissing} from '../error/id-parameter-missing.error';
import {Http} from '../helper/http';
import {EntityManagerMetaDataService} from './meta/entity-manager-meta-data.service';
import {EntityManagerModifierService} from './entity-manager-modifier.service';
import {Meta} from './meta/meta';
import {Parser} from '../parser/parser';
import {JsonParser} from '../parser/json.parser';

@Injectable()
export class EntityManagerRepositoryService {

    private parser: Parser = new JsonParser();

    public constructor(
        private connection: HttpClient,
        private meta: EntityManagerMetaDataService,
        private modifier: EntityManagerModifierService
    ) {

    }

    public find(type: any, id: number): Observable<Object> {
      id = +id;
      if (!id) {
        throw new IdParameterMissing();
      }

      const apiRoute = this.meta.getMetaDataProperty(new type(), Meta.META_ROUTE),
          request = this.modifier.modifyRequest(
              new type(),
              new HttpRequest<any>('GET', configuration.urlPrefix + apiRoute + '/' + id)
          );

      return this.connection
          .get(request.url, {
              headers: request.headers,
              params: request.params
          })
          .pipe(map((loadedEntity: any) => {
              return this.parser.parse(new type(), loadedEntity);
          }));
    }

    public findOne(type: any, params: any = {}): Observable<Object> {
      const httpParams: HttpParams = Http.objectToHttpParams(params);

      const apiRoute = this.meta.getMetaDataProperty(new type(), Meta.META_ROUTE),
        request = this.modifier.modifyRequest(
            new type(),
            new HttpRequest<any>('GET', configuration.urlPrefix + apiRoute, {
              params: httpParams
            })
        );

      return this.connection
        .get(request.url, {
          headers: request.headers,
          params: request.params
        })
        .pipe(map((loadedEntity: any) => {
          return this.parser.parse(new type(), loadedEntity);
        }));
    }

    public findMore(type: typeof Object, params: any = {}): Observable<Object[]> {
      const httpParams: HttpParams = Http.objectToHttpParams(params);

      const apiRoute = this.meta.getMetaDataProperty(new type(), Meta.META_ROUTE),
        request = this.modifier.modifyRequest(
            new type(),
            new HttpRequest<any>('GET', configuration.urlPrefix + apiRoute, {
              params: httpParams
            })
        );

      return this.connection
        .get(request.url, {
          headers: request.headers,
          params: request.params
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

}
