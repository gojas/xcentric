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

  public getAll(): AbstractComponent[] {
    return this.collection;
  }
}
