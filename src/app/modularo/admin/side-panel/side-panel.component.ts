import {Component, Input, OnInit} from '@angular/core';
import {ComponentRegistry, ComponentRegistryConfiguration} from '../../service/component-registry';
import {ComponentManagerService} from '../../service/component-manager.service';
import {ComponentConfiguration} from '../../service/component-configuration';
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

  public onComponentRegistryConfigurationClick(event: any, componentRegistryConfiguration: ComponentRegistryConfiguration): void {
    const configuration = new ComponentConfiguration('1', 'New One', componentRegistryConfiguration.component, componentRegistryConfiguration.type);

    this.manager.add(configuration);

    console.log(this.manager.getAll());

    this.renderer.renderComponent(configuration.component, this.mainComponent.container);
  }

}
