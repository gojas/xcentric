import {ModuleWithProviders, NgModule} from '@angular/core';
import {EntityManagerService} from './service/entity-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {EntityManagerEventService} from './service/entity-manager-event.service';
import {UnitOfWorkService} from './service/unit-of-work.service';
import {EntityManagerStateService} from './service/entity-manager-state.service';
import {EntityManagerModifierService} from './service/entity-manager-modifier.service';
import {EntityManagerMetaDataService} from './service/meta/entity-manager-meta-data.service';
import {EntityManagerRepositoryService} from './service/entity-manager-repository.service';

export interface EntityManagerModuleConfiguration {
  urlPrefix: string;
  listeners?: any[];
  modifiers?: any[];
  repositories?: any[];
}

export let configuration;

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    EntityManagerService,
    EntityManagerEventService,
    EntityManagerModifierService,
    EntityManagerStateService,
    EntityManagerMetaDataService,
    EntityManagerRepositoryService,
    UnitOfWorkService
  ],
  declarations: [],
  exports: []
})
export class XcentricEntityManagerModule {

  static forRoot(entityManagerModuleConfiguration: EntityManagerModuleConfiguration): ModuleWithProviders {

    configuration = entityManagerModuleConfiguration;

    const providers = [];

    for (const listener of configuration.listeners) {
      providers.push(listener);
    }

    for (const modifier of configuration.modifiers) {
      providers.push(modifier);
    }

    for (const repository of configuration.repositories) {
      providers.push(repository);
    }

    return {
      ngModule: XcentricEntityManagerModule,
      providers: providers
    };
  }

}