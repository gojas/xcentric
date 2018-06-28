import {ViewChild, ViewContainerRef, HostListener} from '@angular/core';
import {ComponentConfiguration} from '../service/component-configuration';
import {ComponentRegistryConfiguration} from '../service/component-registry';
import {ContainerService} from '../service/container.service';

export interface Tree {
  getChildren(): AbstractComponent[];
  getParent(): AbstractComponent;
}

export abstract class AbstractComponent implements Tree {

  public configuration: ComponentConfiguration = null;

  parent: AbstractComponent = null;
  children: AbstractComponent[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  @HostListener('mousedown') onClick() {
    console.log(this);
  }

  protected constructor(
    protected serviceContainer: ContainerService
  ) {

  }

  public onDrop(content: any): void {
    if (content instanceof ComponentRegistryConfiguration) {
      this.serviceContainer.facade.create(
        content,
        this.container,
        this
      );
    }
  }

  public getChildren(): AbstractComponent[] {
    return this.children;
  }

  public addChild(child: AbstractComponent): this {
    this.children.push(child);
    return this;
  }

  public getParent(): AbstractComponent {
    return this.parent;
  }

  public setParent(parent: AbstractComponent): this {
    this.parent = parent;
    return this;
  }
}