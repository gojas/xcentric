import { Injectable, Injector } from '@angular/core';
import {
    HttpClient,
    HttpParams,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {configuration, EntityManagerModuleConfiguration} from '../xcentric.entity-manager.module';
import {IdParameterMissing} from '../error/id-parameter-missing.error';
import {Http} from '../helper/http';
import {EntityManagerMetaDataService} from './meta/entity-manager-meta-data.service';
import {EntityManagerModifierService} from './entity-manager-modifier.service';
import {EntityManagerParserService} from './parser/entity-manager-parser.service';
import {Meta} from './meta/meta';
import {EntityRepository} from './repository/entity-repository';
import {RepositoryMustDeriveFromEntityRepository} from '../error/repository-must-derive-from-entity-repository.error';

@Injectable()
export class EntityManagerRepositoryService {

    private configuration: EntityManagerModuleConfiguration;

    public constructor(
        private connection: HttpClient,
        private meta: EntityManagerMetaDataService,
        private modifier: EntityManagerModifierService,
        private injector: Injector,
        private parser: EntityManagerParserService
    ) {
      this.configuration = configuration;
    }

    public createRepository(entityType: any): EntityManagerRepositoryService {
      const repositoriesTypes = this.configuration.repositories || [];

      let repository = this;

      for (const repositoryType of repositoriesTypes) {
        if (entityType.constructor.name === repositoryType.constructor.name) {
          repository = this.injector.get(repositoryType);

          if (repository instanceof EntityRepository) {
            repository.repository = this;
            repository.entityType = entityType;
          } else {
            throw new RepositoryMustDeriveFromEntityRepository(repository);
          }
        }
      }

      return repository;
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
              return this.parser.getParser().parse(new type(), loadedEntity);
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
          return this.parser.getParser().parse(new type(), loadedEntity);
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
            const entity = this.parser.getParser().parse(new type(), loadedEntity);

            parsedEntities.push(entity);
          }

          return parsedEntities;
        }));
    }

}
