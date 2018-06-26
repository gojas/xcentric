import { Injectable } from '@angular/core';
import {ComponentConfiguration} from './component-configuration';

@Injectable({
  providedIn: 'root'
})
export class ComponentManagerService {
  public collection: ComponentConfiguration[] = [];

  public add(componentConfiguration: ComponentConfiguration): this {
    this.collection.push(componentConfiguration);

    return this;
  }

  public getAll(): ComponentConfiguration[] {
    return this.collection;
  }
}
