import {Injectable, Injector} from '@angular/core';
import {HttpRequest} from '@angular/common/http';
import {configuration, EntityManagerModuleConfiguration} from '../entity-manager.module';

@Injectable({
  providedIn: 'root'
})
export class EntityManagerModifierService {

  configuration: EntityManagerModuleConfiguration;

  public constructor(
    private injector: Injector
  ) {
    this.configuration = configuration;
  }

  public modifyRequest(entity: any, request: HttpRequest<any>): HttpRequest<any> {
    const modifiersTypes = this.configuration.modifiers || [];

    for (const modifierType of modifiersTypes) {
      const modifier = this.injector.get(modifierType);

      if (typeof modifier.modifyRequest === 'function') {
        request = modifier.modifyRequest(entity, request);
      }
    }

    return request;
  }

  public modifyRequestWithModifiers(entity: any, request: HttpRequest<any>, modifiers: any[]): HttpRequest<any> {
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
