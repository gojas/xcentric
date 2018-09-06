import {Injectable} from '@angular/core';
import {AbstractComponent} from '../component/abstract.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentManagerService {
  public collection: AbstractComponent[] = [];

  public add(component: AbstractComponent): this {
    this.collection.push(component);

    return this;
  }

  public remove(component: AbstractComponent): this {
    const id = component.configuration.id;

    const index = this.getAll().findIndex((aComponent: AbstractComponent) => {
      return aComponent.configuration.id === id;
    });

    this.getAll().splice(index, 1);

    return this;
  }

  public getAll(): AbstractComponent[] {
    return this.collection;
  }
}
