import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ModuleComponent} from './modularo/module.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/primeng';
import {SidePanelComponent} from './modularo/admin/side-panel/side-panel.component';
import {GridComponent} from './modularo/component/grid/grid.component';
import {PanelComponent} from './modularo/component/panel/panel.component';
import {ButtonComponent} from './modularo/component/button/button.component';
import {InputTextComponent} from './modularo/component/input-text/input-text.component';
import {DraggableDirective} from './modularo/directive/drag/draggable';
import {DraggableTargetDirective} from './modularo/directive/drag/draggable-target';
import {XcentricEntityManagerModule} from 'xcentric';

@NgModule({
  declarations: [
    AppComponent,


    ModuleComponent,
    SidePanelComponent,

    // generics
    GridComponent,
    PanelComponent,
    ButtonComponent,
    InputTextComponent,

    DraggableDirective,
    DraggableTargetDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    XcentricEntityManagerModule,
    SidebarModule,
    ButtonModule,
    InputTextModule
  ],
  entryComponents: [
    GridComponent,
    PanelComponent,
    ButtonComponent,
    InputTextComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
