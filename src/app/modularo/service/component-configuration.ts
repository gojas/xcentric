import {ComponentType} from './component-type';

export class ComponentConfiguration {
  id: string;
  name: string;
  component: any;
  type: ComponentType;

  public constructor(
    id: string,
    name: string,
    component: any,
    type: ComponentType
  ) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.type = type;
  }

}
