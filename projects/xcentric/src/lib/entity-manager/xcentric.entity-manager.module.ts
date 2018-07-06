import {ModuleWithProviders, NgModule} from '@angular/core';
import {EntityManagerService} from './service/entity-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {EntityManagerEventService} from './service/entity-manager-event.service';
import {UnitOfWorkService} from './service/unit-of-work.service';
import {EntityManagerStateService} from './service/entity-manager-state.service';

export interface EntityManagerModuleConfiguration {
  urlPrefix: string;
  preUpdate?: any[];
}

export let configuration;

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EntityManagerService,
    EntityManagerEventService,
    EntityManagerStateService,
    UnitOfWorkService
  ],
  declarations: [],
  exports: []
})
export class XcentricEntityManagerModule {

  static forRoot(entityManagerModuleConfiguration: EntityManagerModuleConfiguration): ModuleWithProviders {

    configuration = entityManagerModuleConfiguration;

    return {
      ngModule: XcentricEntityManagerModule,
      providers: []
    };
  }

}
