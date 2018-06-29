import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../abstract.component';
import {ContainerService} from '../../service/container.service';

@Component({
  selector: 'app-component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends AbstractComponent implements OnInit {

  public constructor(
    protected serviceContainer: ContainerService
  ) {
    super(serviceContainer);
  }

  public ngOnInit(): void {
  }

  public onDrop(content: any): void {
    console.error('Cannot drop component to ' + this.constructor.name);
  }

}
