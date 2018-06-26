import {NgModule} from '@angular/core';
import {XcentricComponent} from './xcentric.component';
import {EntityManagerService} from './entity-manager/service/entity-manager.service';
import {ModuleComponent} from '../../../../src/app/modularo/module.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EntityManagerService
  ],
  declarations: [XcentricComponent, ModuleComponent],
  exports: [XcentricComponent, ModuleComponent]
})
export class XcentricModule { }
