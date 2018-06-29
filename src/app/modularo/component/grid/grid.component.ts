import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../abstract.component';
import {ContainerService} from '../../service/container.service';

@Component({
  selector: 'app-component-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends AbstractComponent implements OnInit {

  public constructor(
    protected serviceContainer: ContainerService
  ) {
    super(serviceContainer);
  }

  public ngOnInit(): void {
  }

}
