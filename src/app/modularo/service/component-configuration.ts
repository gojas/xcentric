import {ComponentType} from './component-type';

export interface Tree {
  getChildren(): ComponentConfiguration[];
  getParent(): ComponentConfiguration;
}

export class ComponentConfiguration implements Tree {
  id: string;
  name: string;
  component: any;
  type: ComponentType;

  parent: ComponentConfiguration = null;
  children: ComponentConfiguration[] = [];

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

  public getChildren(): ComponentConfiguration[] {
    return this.children;
  }

  public getParent(): ComponentConfiguration {
    return this.parent;
  }

}
