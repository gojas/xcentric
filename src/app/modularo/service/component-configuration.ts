import {ComponentType} from './component-type';

export class ComponentConfiguration {
  id: string;
  name: string;
  component: any;
  editComponent: any;
  type: ComponentType;
  style: any = {
    wrapperStyle: {}
  };

  public constructor(
    id: string,
    name: string,
    component: any,
    type: ComponentType,
    editComponent: any
  ) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.type = type;
    this.editComponent = editComponent;
  }

}
