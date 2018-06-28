import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AbstractComponent} from '../abstract.component';
import {ComponentRegistryConfiguration} from '../../service/component-registry';
import {ComponentConfiguration} from '../../service/component-configuration';
import {ComponentRendererService} from '../../service/renderer/component-renderer.service';
import {ComponentManagerService} from '../../service/component-manager.service';

@Component({
  selector: 'app-component-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends AbstractComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public constructor(
    private renderer: ComponentRendererService,
    private manager: ComponentManagerService
  ) {
    super();
  }

  public ngOnInit(): void {
  }

  public onDrop(content: any): void {
    if (content instanceof ComponentRegistryConfiguration) {
      const configuration = new ComponentConfiguration('1', 'New One', content.component, content.type);

      this.configuration.addChild(configuration);
      configuration.setParent(this.configuration);

      const component: AbstractComponent = this.renderer.renderComponent(configuration.component, this.container);
      component.configuration = configuration;
    }

    console.log(this.manager);
  }

}
