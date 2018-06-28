import {Injectable, ViewContainerRef} from '@angular/core';
import {ComponentManagerService} from '../component-manager.service';
import {ComponentRendererService} from '../renderer/component-renderer.service';
import {ComponentRegistryConfiguration} from '../component-registry';
import {AbstractComponent} from '../../component/abstract.component';
import {ComponentConfiguration} from '../component-configuration';

@Injectable({
  providedIn: 'root'
})
export class ComponentFacadeService {

  public constructor(
    private manager: ComponentManagerService,
    private renderer: ComponentRendererService
  ) {

  }

  public create(registryConfiguration: ComponentRegistryConfiguration,
                toContainer: ViewContainerRef,
                parent: AbstractComponent = null
  ): ComponentFacadeService {

    const configuration = this.createComponentConfiguration(registryConfiguration);
    const component = this.createComponent(configuration, toContainer, parent);

    if (parent === null) {
      this.manager.add(component);
    }

    return this;
  }

  private createComponentConfiguration(registryConfiguration: ComponentRegistryConfiguration): ComponentConfiguration {
    return new ComponentConfiguration(
      '1',
      'New One',
      registryConfiguration.component,
      registryConfiguration.type
    );
  }

  private createComponent(configuration: ComponentConfiguration, toContainer: ViewContainerRef,
                          parent: AbstractComponent): AbstractComponent {
    const component: AbstractComponent = this.renderer.renderComponent(configuration.component, toContainer);
    component.configuration = configuration;

    if (parent !== null) {
      parent.addChild(component);
      component.setParent(parent);
    }

    return component;
  }

}
