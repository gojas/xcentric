import {ModuleWithProviders, NgModule} from '@angular/core';
import {EntityManagerService} from './service/entity-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {EntityManagerEventService} from './service/entity-manager-event.service';
import {EntityManagerParserService} from './service/parser/entity-manager-parser.service';
import {UnitOfWorkService} from './service/unit-of-work.service';
import {EntityManagerStateService} from './service/entity-manager-state.service';
import {EntityManagerModifierService} from './service/entity-manager-modifier.service';
import {EntityManagerMetaDataService} from './service/meta/entity-manager-meta-data.service';
import {EntityRepository} from './service/repository/entity-repository';
import {EntityManagerRepositoryFactoryService} from './service/repository/entity-manager-repository-factory.service';

export interface EntityManagerModuleConfiguration {
  urlPrefix: string;
  parser?: any;
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
    EntityManagerParserService,
    EntityManagerModifierService,
    EntityManagerStateService,
    EntityManagerMetaDataService,
    EntityRepository,
    EntityManagerRepositoryFactoryService,
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
