import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentRendererService} from './service/renderer/component-renderer.service';
import {ContextService} from './service/context/context.service';
import {ContextType} from './service/context/context-type';
import {ComponentManagerService} from './service/component-manager.service';
import {ComponentRegistryConfiguration} from './service/component-registry';
import {ComponentConfiguration} from './service/component-configuration';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  public isSidePanelVisible: boolean = false;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public constructor(
    private renderer: ComponentRendererService,
    private context: ContextService,
    private manager: ComponentManagerService
  ) { }

  public ngOnInit(): void {
  }

  public onChangeContext(event): void {
    this.context.setContext(ContextType.Admin);

    const components = this.manager.getAll();

    for (const component of components) {
      console.log(component);
    }

  }

  public onDrop(content: any): void {

    if (content instanceof ComponentRegistryConfiguration) {
      const configuration = new ComponentConfiguration('1', 'New One', content.component, content.type);

      const component = this.renderer.renderComponent(configuration.component, this.container);

      this.manager.add(component);
    }
  }

}
