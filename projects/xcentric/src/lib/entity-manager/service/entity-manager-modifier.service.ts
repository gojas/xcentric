import {Injectable, Injector} from '@angular/core';
import {configuration, EntityManagerModuleConfiguration} from '../xcentric.entity-manager.module';
import {HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class EntityManagerModifierService {

  configuration: EntityManagerModuleConfiguration;

  public constructor(
    private injector: Injector
  ) {
    this.configuration = configuration;
  }

  public modifyRequest(entity: Object, request: HttpRequest<any>): HttpRequest<any> {
    const modifiersTypes = this.configuration.modifiers || [];

    for (const modifierType of modifiersTypes) {
      const modifier = this.injector.get(modifierType);

      if (typeof modifier.modifyRequest === 'function') {
        request = modifier.modifyRequest(entity, request);
      }
    }

    return request;
  }

  public modifyRequestWithModifiers(entity: Object, request: HttpRequest<any>, modifiers: any[]): HttpRequest<any> {
    const modifiersTypes = this.configuration.modifiers || [];

    for (const customModifier of modifiers) {
      modifiersTypes.push(customModifier);
    }

    for (const modifierType of modifiersTypes) {
      const modifier = this.injector.get(modifierType);

      if (typeof modifier.modifyRequest === 'function') {
        request = modifier.modifyRequest(entity, request);
      }
    }

    return request;
  }
}
