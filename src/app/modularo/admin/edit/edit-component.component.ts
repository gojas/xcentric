import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ModuleComponent} from '../../module.component';
import {AbstractComponent} from '../../component/abstract.component';
import {ContainerService} from '../../service/container.service';

@Component({
  selector: 'app-admin-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit {

  @Input() mainComponent: ModuleComponent = null;
  @Input() editComponent: AbstractComponent = null;

  public constructor(
    private viewContainerRef: ViewContainerRef,
    private containerService: ContainerService
  ) { }

  public ngOnInit(): void {
    const componentRef = this.containerService
        .renderer
        .renderTo(this.editComponent.configuration.editComponent, this.viewContainerRef);

    const componentInstance = componentRef.instance;
    componentInstance.component = this.editComponent;
  }

}
