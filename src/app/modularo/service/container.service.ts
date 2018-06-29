import {Injectable} from '@angular/core';
import {ComponentFacadeService} from './component/component-facade.service';
import {ComponentManagerService} from './component-manager.service';
import {ComponentRendererService} from './renderer/component-renderer.service';
import {ContextService} from './context/context.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  public constructor(
    public facade: ComponentFacadeService,
    public manager: ComponentManagerService,
    public renderer: ComponentRendererService,
    public context: ContextService
  ) {

  }

}
