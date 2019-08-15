import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Http} from '../../helper/http';
import {IdParameterMissing} from '../../error/id-parameter-missing.error';
import {Meta} from '../meta/meta';
import {EntityManagerModifierService} from '../entity-manager-modifier.service';
import {EntityManagerMetaDataService} from '../meta/entity-manager-meta-data.service';
import {EntityManagerParserService} from '../parser/entity-manager-parser.service';
import {Builder} from '../builder/builder';
import {configuration, EntityManagerModuleConfiguration} from '../../entity-manager.module';

export interface EntityTypeAware {
    entityType: any;
}

@Injectable({
    providedIn: 'root'
})
export class EntityRepository implements EntityTypeAware {

    private configuration: EntityManagerModuleConfiguration;

    public entityType: any;

    public constructor(
      private connection: HttpClient,
      private meta: EntityManagerMetaDataService,
      private modifier: EntityManagerModifierService,
      private parser: EntityManagerParserService
    ) {
      this.configuration = configuration;
    }

    public find(id: number): Observable<any> {
        return this.doFind(this.entityType, id);
    }

    public findOne(params: any): Observable<any> {
        return this.doFindOne(this.entityType, params);
    }

    public findMore(params: any): Observable<any[]> {
        return this.doFindMore(this.entityType, params);
    }

    public getBuilder(): Builder {
      const builder = new Builder();

      builder.connection = this.connection;
      builder.parser = this.parser;
      builder.meta = this.meta;
      builder.entityType = this.entityType;
      builder.modifier = this.modifier;

      return builder;
    }

    private doFind(type: any, id: number): Observable<any> {
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
          return this.parser.getParser().parse(new type(), loadedEntity);
        }));
    }

    public doFindOne(type: any, params: any = {}): Observable<any> {
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
          return this.parser.getParser().parse(new type(), loadedEntity);
        }));
    }

    public doFindMore(type: typeof Object, params: any = {}): Observable<any[]> {
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
            const entity = this.parser.getParser().parse(new type(), loadedEntity);

            parsedEntities.push(entity);
          }

          return parsedEntities;
        }));
    }
}
