import { Component } from '@angular/core';
import {EntityManagerService} from 'xcentric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public constructor(
    private em: EntityManagerService
  ) {
    console.log(em);
  }
}
