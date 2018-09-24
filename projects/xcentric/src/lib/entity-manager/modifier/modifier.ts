import {HttpRequest, HttpResponse} from '@angular/common/http';

export class Modifier {
  modifyRequest(entity: any, httpRequest: HttpRequest<any>) {}
  modifyResponse(entity: any, httpRequest: HttpResponse<any>) {}
}
