import { HostListener } from '@angular/core';

export abstract class AbstractComponent {

  @HostListener('click') onClick() {
    console.log(this);
  }

}
