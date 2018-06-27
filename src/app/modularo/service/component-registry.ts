import {ComponentType} from './component-type';
import {GridComponent} from '../component/grid/grid.component';
import {PanelComponent} from '../component/panel/panel.component';
import {ButtonComponent} from '../component/button/button.component';
import {InputTextComponent} from '../component/input-text/input-text.component';

export interface ComponentRegistryConfiguration {
  component: any;
  type: ComponentType;
  name: string;
}

export class ComponentRegistry {
  public components: ComponentRegistryConfiguration[] = [
    {
      component: GridComponent,
      type: ComponentType.Grid,
      name: 'Grid'
    },
    {
      component: PanelComponent,
      type: ComponentType.Panel,
      name: 'Panel'
    },
    {
      component: ButtonComponent,
      type: ComponentType.Button,
      name: 'Button'
    },
    {
      component: InputTextComponent,
      type: ComponentType.Input,
      name: 'Text'
    }
  ];
}
