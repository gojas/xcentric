import {Mapper} from '../../mapper/mapper';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Http} from '../../helper/http';
import {Meta} from '../meta/meta';
import {map} from 'rxjs/operators';
import {EntityManagerMetaDataService} from '../meta/entity-manager-meta-data.service';
import {EntityManagerModifierService} from '../entity-manager-modifier.service';
import {EntityManagerParserService} from '../parser/entity-manager-parser.service';
import {configuration} from '../../entity-manager.module';

export class BuilderResult {
  public entity: any = null;
  public entities: any[] = [];
  public body: any = null;

  public getEntity(): any {
    return this.entity;
  }

  public getEntities(): any[] {
    return this.entities;
  }

  public getBody(): any {
    return this.body;
  }
}

export class Builder {
  public entityType: any;
  public mapper = null;
  public httpParams: HttpParams = new HttpParams();

  public connection: HttpClient = null;
  public parser: EntityManagerParserService = null;
  public meta: EntityManagerMetaDataService = null;
  public modifier: EntityManagerModifierService = null;

  public setParams(params: any = {}): this {
    this.httpParams = Http.objectToHttpParams(params);
    return this;
  }

  public setMapper(mapper: Mapper): this {
    this.mapper = mapper;
    return this;
  }

  public getSingle(): Observable<BuilderResult> { // todo :: getSingle to return SingleBuilderResult
    const entityTypeInstance = new this.entityType();

    const request = this.getRequest(entityTypeInstance);

    return this.connection
      .get(request.url, {
        headers: request.headers,
        params: request.params
      })
      .pipe(map((data: any) => {
        return this.getSingleResult(entityTypeInstance, data);
      }));
  }

  public getMore(): Observable<BuilderResult> { // todo :: getMore to return MoreBuilderResult
    const entityTypeInstance = new this.entityType();

    const request = this.getRequest(entityTypeInstance);

    return this.connection
      .get(request.url, {
        headers: request.headers,
        params: request.params
      })
      .pipe(map((data: any) => {
        return this.getMoreResult(entityTypeInstance, data);
      }));
  }

  private getMoreResult(entityTypeInstance: any, data: any): BuilderResult {
    const result = new BuilderResult(),
      parsedEntities = [];

    let entities = data;

    if (this.mapper) {
      const mapper = new this.mapper();

      entities = mapper.map(data);
    }

    for (const loadedEntity of entities) {
      const parsedEntity = this.parser.getParser().parse(entityTypeInstance, loadedEntity);

      parsedEntities.push(parsedEntity);
    }

    result.entities = parsedEntities;
    result.body = data;

    return result;
  }

  private getSingleResult(entityTypeInstance: any, data: any): BuilderResult {
    const result = new BuilderResult();

    let entity = data;

    if (this.mapper) {
      const mapper = new this.mapper();

      entity = mapper.map(data);
    }

    result.entity = this.parser.getParser().parse(entityTypeInstance, entity);
    result.body = data;

    return result;
  }

  private getRequest(entityTypeInstance: any): HttpRequest<any> {
      const apiRoute = this.meta.getMetaDataProperty(entityTypeInstance, Meta.META_ROUTE);

      return this.modifier.modifyRequest(
        entityTypeInstance,
        new HttpRequest<any>('GET', configuration.urlPrefix + apiRoute, {
          params: this.httpParams
        })
      );
  }

}
