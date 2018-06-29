import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../abstract.component';
import {ContainerService} from '../../service/container.service';

@Component({
  selector: 'app-component-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends AbstractComponent implements OnInit {

  public constructor(
    protected serviceContainer: ContainerService
  ) {
    super(serviceContainer);
  }

  public ngOnInit(): void {
  }



}
