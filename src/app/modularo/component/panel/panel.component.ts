import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../abstract.component';

@Component({
  selector: 'app-component-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends AbstractComponent implements OnInit {

  public ngOnInit(): void {
  }

}
