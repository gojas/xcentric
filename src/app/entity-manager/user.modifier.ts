import {User} from './user';
import {Injectable} from '@angular/core';
import {HttpHeaders, HttpRequest} from '@angular/common/http';
import {Modifier} from 'xcentric';

@Injectable()
export class UserModifier extends Modifier {

  public modifyRequest(entity: Object, request: HttpRequest<any>): HttpRequest<any>  {

    if (entity instanceof User) {
      request = request.clone({
        headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1Mzc3NzE0NDMsImV4cCI6MTUzODc3MTQ0Miwicm9sZXMiOlsiUk9MRV9TVVBFUkFETUlOIiwiUk9MRV9NQ1AiLCJST0xFX0FETUlOIiwiUk9MRV9SRUFEIiwiUk9MRV9XUklURSIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRldkBoci1wdXp6bGUuZGV2IiwiaXAiOiIxMjcuMC4wLjEiLCJiYXNlX3BhdGgiOiIifQ.GSGJ2mxe5tK6vGIvvuLeGPhUSli1hPOyXmZgc23GxzylzeYMTNNOJbOq33Bv03FL6Rj99IwW81spn2vrIua_HqlvJY9Wr1Z68YGdIeEiGNItM0mJptJQV8oGBKv7EOJba1TGDfCo1SxV_Sz8Jelw_TDF_cf3zJ9bK4ZVl9Nyc8MbP5a4sNU6145M6v0j5IVKCwCAVpYVtxcqS2DuKUvKKcuwmz8d0b-_QjCnlfl6pT-fWseEs3_w_4l8_ggDyqKkkbyJ8B-nz7DEPjjO-zpY9rWCZSu1VxKeUUr0QzRSQr3Fb-m__8lvCRYijUR4JcxZszJthWLcFAW9aJmodtXB1yq6roiTyw7oePvJ-Fl0nVoyHfRkSD2tEFgqeLnjOUNL7mh6if3vIGhX6beeIWLhMwgdusnAV52g27Q7I-GybksH3vSXv4HcZcBXNr_P6xAT4uaymE7D_nAjRNVEnPSrHXj-5xKUHFNotSdD6nSgF5JjR0gHhBbjRwdSL4bFAcYKB4MrrSwnXHTJPqGhcpZFiXf_je6uRdf2kAemwXx8dVJNZjyEGlxf9hn4gKObyWT9rc2AW-rFFwc_NZH4UN3Umdao_2CccJW5ExLC31VgpBx0yf8l2rOnKYXtf0jH9Z9VoGXz-A_qRVbFXP2YLXIRTKsDaII3ymKg5uZlDTBnymE')
          .set('Content-Type', 'application/json')
      });
    }

    return request;
  }
}
