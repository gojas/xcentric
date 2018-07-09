import {User} from './user';
import {Injectable} from '@angular/core';
import {HttpRequest} from '@angular/common/http';

@Injectable()
export class UserModifier {

  public modifyRequest(entity: Object, request: HttpRequest<any>): HttpRequest<any>  {

    if (entity instanceof User && request.method === 'POST') {
      request = request.clone({
        url: 'smola'
      });
    }

    return request;
  }
}
