import {ComponentType} from './component-type';
import {GridComponent} from '../component/grid/grid.component';

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
    }
  ];
}
