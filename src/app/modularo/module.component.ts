import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentRendererService} from './service/renderer/component-renderer.service';
import {ContextService} from './service/context/context.service';
import {ContextType} from './service/context/context-type';
import {ComponentManagerService} from './service/component-manager.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

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

}
