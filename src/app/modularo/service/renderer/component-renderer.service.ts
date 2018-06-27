import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {ModuleComponent} from '../../module.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentRendererService {

  private moduleComponent: ModuleComponent = null;
  private renderer: Renderer2;

  public constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public renderComponent(component: any, renderTo: ViewContainerRef) {

    const componentRef = this.renderTo(component, renderTo),
      componentInstance = componentRef.instance;
  }

  public removeComponents(): ComponentRendererService {
    this.getModuleComponent().container.clear();
    return this;
  }

  public removeComponent(index: number): ComponentRendererService {
    this.getModuleComponent().container.remove(index);

    return this;
  }

  public renderTo(component, renderTo: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return renderTo.createComponent(componentFactory);
  }

  public setModuleComponent(moduleComponent: ModuleComponent): ComponentRendererService {
    this.moduleComponent = moduleComponent;
    return this;
  }

  public getModuleComponent(): ModuleComponent {
    return this.moduleComponent;
  }
}
