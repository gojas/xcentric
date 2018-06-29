import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../abstract.component';
import {ContainerService} from '../../service/container.service';

@Component({
  selector: 'app-component-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends AbstractComponent  implements OnInit {

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
