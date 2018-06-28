import {Component, Input, OnInit} from '@angular/core';
import {ComponentRegistry, ComponentRegistryConfiguration} from '../../service/component-registry';
import {ComponentManagerService} from '../../service/component-manager.service';
import {ComponentRendererService} from '../../service/renderer/component-renderer.service';
import {ModuleComponent} from '../../module.component';

@Component({
  selector: 'app-admin-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  @Input() mainComponent: ModuleComponent = null;

  public componentRegistryConfigurations: ComponentRegistryConfiguration[] = [];

  private componentRegistry = new ComponentRegistry();

  public constructor(
    private manager: ComponentManagerService,
    private renderer: ComponentRendererService
  ) { }

  public ngOnInit(): void {
    this.componentRegistryConfigurations = this.componentRegistry.components;
  }

  public onDragStarted($event): void {
    this.mainComponent.isSidePanelVisible = false;
  }

}
