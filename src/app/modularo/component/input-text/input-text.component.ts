import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../abstract.component';

@Component({
  selector: 'app-component-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends AbstractComponent  implements OnInit {

  public ngOnInit(): void {
  }

}
