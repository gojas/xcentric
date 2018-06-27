import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../abstract.component';

@Component({
  selector: 'app-component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends AbstractComponent implements OnInit {

  public ngOnInit(): void {
  }

}
