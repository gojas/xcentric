import {User} from './user';
import {Injectable} from '@angular/core';
import {HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class UserModifier {

  public modifyRequest(entity: Object, request: HttpRequest<any>): HttpRequest<any>  {

    if (entity instanceof User) {
      request = request.clone({
        headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MzQ3NDcyNjUsImV4cCI6MTUzNTc0NzI2NCwicm9sZXMiOlsiUk9MRV9TVVBFUkFETUlOIiwiUk9MRV9NQ1AiLCJST0xFX0FETUlOIiwiUk9MRV9SRUFEIiwiUk9MRV9XUklURSIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImRldkBoci1wdXp6bGUuZGV2IiwiaXAiOiIxMjcuMC4wLjEiLCJiYXNlX3BhdGgiOiIifQ.PaKCB1YcLvorlqwtLgVmjnZC0SiYZCNhwKiEV4I8kP04RXOnL_CaJDqqxIo6SHFQ8oT3Nn2BGvyWxxqyGsWHx6SNpjGi4qCuNLZWxuH8ep-hcw8EVa0jFhjYpFzDKNUT6M9AX4C-EE8dNft26zDPcRrqy3FNIriGR8l3hcl5gLz_mRh0DZE9fNLgEmQo2Y-cY89aQjks45wBbiJPL5JcOjqVO0W5ubTjr_HVu_8DjGNQMHYTPqqGhR27F4Ze__EnJHfs6kHxt8cVWUVv0vmCwuF8ToUQNfKg9IIe-chZXIkVGpenIjVBz600mULz924Hs2lKIHKr6KahPdGmUV3McnP4aL_OQd9xDlXtp3wKJ_jtzpSsyZ5FHbE8THjzuD41RlEyjiYx56Fjxjh-X7x_IG5sNMxOvEWr0rpFqAEnWDnF4RaziqcJjK73uAnrri4khv_bqxsEJgdzI7vGbB6GtDWCfYHxsiuGJsm_ZQI9NbMwoKzLcMSPyH_2GWnTxHG69og1th3EK9XQEPFTW4Dd8Ejp3CxoqIrmasQEjGUS_tvELs6wcSTR9hy-bFzVc2d8RLPa75bR1eNXrb_bjKN1UVDDpgRHqmTzykVv6Sm6v0minvAzD-gDjR5_enwv46uuV9zoTVU-jIh3hVy0A1LMgjy5SGsElYoQQlvHJNNCHtM')
          .set('Content-Type', 'application/json')
      });
    }

    return request;
  }
}
