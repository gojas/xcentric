import { HttpParams } from '@angular/common/http';

export class Http {
    public static objectToHttpParams(params: any = {}): HttpParams {
        let httpParams = new HttpParams();

        for (const param in params) {
            const value = params[param];
            httpParams = httpParams.set(param, value);
        }

        return httpParams;
    }
  }
  