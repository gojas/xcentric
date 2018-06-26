import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentRendererService} from './service/renderer/component-renderer.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public constructor(
    private renderer: ComponentRendererService
  ) { }

  public ngOnInit(): void {
  }

}
