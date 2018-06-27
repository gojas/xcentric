import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../abstract.component';

@Component({
  selector: 'app-component-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends AbstractComponent implements OnInit {

  public ngOnInit(): void {
  }

}
