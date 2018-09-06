import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ModuleComponent} from './modularo/module.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/primeng';
import {SidePanelComponent} from './modularo/admin/side-panel/side-panel.component';
import {WrapperComponent} from './modularo/component/wrapper/wrapper.component';
import {GridComponent} from './modularo/component/grid/grid.component';
import {PanelComponent} from './modularo/component/panel/panel.component';
import {ButtonComponent} from './modularo/component/button/button.component';
import {InputTextComponent} from './modularo/component/input-text/input-text.component';
import {DraggableDirective} from './modularo/directive/drag/draggable';
import {DraggableTargetDirective} from './modularo/directive/drag/draggable-target';
import {XcentricEntityManagerModule} from 'xcentric';
import {UserListener} from './entity-manager/user.listener';
import {UserModifier} from './entity-manager/user.modifier';
import {UserRepository} from 'src/app/entity-manager/user.repository';
import {CustomParser} from './entity-manager/custom.parser';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,


    ModuleComponent,
    SidePanelComponent,

    // generics
    WrapperComponent,
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
    XcentricEntityManagerModule.forRoot({
      urlPrefix: 'http://puzzle.local/api/',
      parser: CustomParser,
      listeners: [
        UserListener
      ],
      modifiers: [
        UserModifier
      ],
      repositories: [
        UserRepository
      ]
    }),
    SidebarModule,
    ButtonModule,
    TableModule,
    InputTextModule
  ],
  entryComponents: [
    WrapperComponent,
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
