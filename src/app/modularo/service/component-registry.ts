import {ComponentType} from './component-type';
import {GridComponent} from '../component/grid/grid.component';
import {PanelComponent} from '../component/panel/panel.component';
import {ButtonComponent} from '../component/button/button.component';
import {InputTextComponent} from '../component/input-text/input-text.component';
import {GridEditComponent} from '../component/grid/edit/grid-edit.component';

export class ComponentRegistryConfiguration {
  component: any;
  type: ComponentType;
  name: string;
  editComponent: any;

  public constructor(
    component: any,
    type: ComponentType,
    name: string,
    editComponent: any
  ) {
    this.component = component;
    this.type = type;
    this.name = name;
    this.editComponent = editComponent;
  }
}

export class ComponentRegistry {
  public components: ComponentRegistryConfiguration[] = [
    new ComponentRegistryConfiguration(GridComponent, ComponentType.Grid, 'Grid', GridEditComponent),
    new ComponentRegistryConfiguration(PanelComponent, ComponentType.Panel, 'Panel', GridEditComponent), // change
    new ComponentRegistryConfiguration(ButtonComponent, ComponentType.Button, 'Button', GridEditComponent), // change
    new ComponentRegistryConfiguration(InputTextComponent, ComponentType.Input, 'Text', GridEditComponent) // change
  ];
}
