import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentRendererService} from './service/renderer/component-renderer.service';
import {ContextService} from './service/context/context.service';
import {ContextType} from './service/context/context-type';
import {ComponentManagerService} from './service/component-manager.service';
import {ComponentRegistryConfiguration} from './service/component-registry';
import {ComponentFacadeService} from './service/component/component-facade.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  public isSidePanelVisible = false;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public constructor(
    private renderer: ComponentRendererService,
    private context: ContextService,
    private manager: ComponentManagerService,
    private facade: ComponentFacadeService
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
      this.facade.create(
        content,
        this.container
      );
    }

    this.isSidePanelVisible = true;
  }

}
