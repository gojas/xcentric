import {Component, OnInit, Input} from '@angular/core';
import {ContainerService} from '../../../service/container.service';
import {AbstractComponent} from '../../abstract.component';

@Component({
  selector: 'app-component-grid-edit',
  templateUrl: './grid-edit.component.html',
  styleUrls: ['./grid-edit.component.scss']
})
export class GridEditComponent implements OnInit {

  @Input() component: AbstractComponent = null;

  public constructor(
    protected serviceContainer: ContainerService
  ) {

  }

  public ngOnInit(): void {
  }

}
