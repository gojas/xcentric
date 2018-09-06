import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {AbstractComponent} from '../../component/abstract.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentRendererService {

  public mainContainer: ViewContainerRef = null;

  private renderer: Renderer2;

  public constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public renderComponent(component: any, renderTo: ViewContainerRef): AbstractComponent {
    const componentRef = this.renderTo(component, renderTo);

    componentRef.instance.hostView = componentRef;

    return componentRef.instance;
  }

  public removeComponents(): ComponentRendererService {
    // todo
    return this;
  }

  public removeComponent(component: AbstractComponent): ComponentRendererService {
    const wrapperComponent = component.wrapperComponent;

    wrapperComponent.viewContainerRef.clear();

    const index = this.mainContainer.indexOf(wrapperComponent.hostView);
    this.mainContainer.remove(index);

    return this;
  }

  public renderTo(component, renderTo: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return renderTo.createComponent(componentFactory);
  }
}
