import {Component, OnInit, Input, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {ContainerService} from '../../service/container.service';
import {AbstractComponent} from '../abstract.component';

@Component({
  selector: 'app-component-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  @Input() hostView: ViewRef = null;
  @Input() component: AbstractComponent = null;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public constructor(
    public viewContainerRef: ViewContainerRef,
    protected serviceContainer: ContainerService
  ) {
  }

  public ngOnInit(): void {
  }

  public onEditComponent(): void {

  }

  public onRemoveComponent(): void {
    this.serviceContainer.facade.remove(this.component);
  }
}
