import {NgModule} from '@angular/core';
import {EntityManagerService} from './service/entity-manager.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EntityManagerService
  ],
  declarations: [],
  exports: []
})
export class XcentricEntityManagerModule { }
