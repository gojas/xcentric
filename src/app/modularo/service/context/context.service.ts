import {
  Injectable
} from '@angular/core';

import {ContextType} from './context-type';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private context: ContextType = ContextType.Normal;

  public setContext(context: ContextType): ContextService {
    this.context = context;
    return this;
  }

  public getContext(): ContextType {
    return this.context;
  }
}
