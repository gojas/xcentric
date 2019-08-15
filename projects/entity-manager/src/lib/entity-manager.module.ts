import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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

  ],
  declarations: [],
  exports: []
})
export class EntityManagerModule {

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
      ngModule: EntityManagerModule,
      providers
    };
  }

}
