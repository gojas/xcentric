import {ComponentType} from './component-type';
import {GridComponent} from '../component/grid/grid.component';
import {PanelComponent} from '../component/panel/panel.component';
import {ButtonComponent} from '../component/button/button.component';
import {InputTextComponent} from '../component/input-text/input-text.component';

export class ComponentRegistryConfiguration {
  component: any;
  type: ComponentType;
  name: string;

  public constructor(
    component: any,
    type: ComponentType,
    name: string
  ) {
    this.component = component;
    this.type = type;
    this.name = name;
  }
}

export class ComponentRegistry {
  public components: ComponentRegistryConfiguration[] = [
    new ComponentRegistryConfiguration(GridComponent, ComponentType.Grid, 'Grid'),
    new ComponentRegistryConfiguration(PanelComponent, ComponentType.Panel, 'Panel'),
    new ComponentRegistryConfiguration(ButtonComponent, ComponentType.Button, 'Button'),
    new ComponentRegistryConfiguration(InputTextComponent, ComponentType.Input, 'Text')
  ];
}
