import {Input} from '@angular/core';
import {ComponentConfiguration} from '../service/component-configuration';

export abstract class AbstractComponent {
  @Input() configuration: ComponentConfiguration = null;
}
