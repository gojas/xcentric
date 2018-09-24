import {Injectable} from '@angular/core';
import {HttpHeaders, HttpRequest} from '@angular/common/http';
import {Modifier} from 'xcentric';

@Injectable()
export class PaginatedModifier extends Modifier {

  public modifyRequest(entity: Object, request: HttpRequest<any>): HttpRequest<any>  {
    const params = request.params;

    if (params.has('offset') && params.has('limit')) {
      const offset = params.get('offset') || 0,
        limit = params.get('limit') || 30;

      const paginatedUrl = request.url + '/offset/' + offset + '/limit/' + limit + '/orderby/id/asc';

      request = request.clone({
        url: paginatedUrl
      });
    }

    return request;
  }
}
