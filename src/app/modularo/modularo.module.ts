import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {
  AccordionModule,
  InputTextModule,
  SpinnerModule,
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';

import {ModuleComponent} from './module.component';
import {WrapperComponent} from './component/wrapper/wrapper.component';
import {GridComponent} from './component/grid/grid.component';
import {PanelComponent} from './component/panel/panel.component';
import {ButtonComponent} from './component/button/button.component';
import {InputTextComponent} from './component/input-text/input-text.component';
import {DraggableDirective} from './directive/drag/draggable';
import {DraggableTargetDirective} from './directive/drag/draggable-target';
import {SidePanelComponent} from './admin/side-panel/side-panel.component';
import {EditComponentComponent} from './admin/edit/edit-component.component';
import {GridEditComponent} from './component/grid/edit/grid-edit.component';

@NgModule({
  declarations: [
    ModuleComponent,
    SidePanelComponent,
    EditComponentComponent,

    // generics
    WrapperComponent,
    GridComponent,
    GridEditComponent,
    PanelComponent,
    ButtonComponent,
    InputTextComponent,

    DraggableDirective,
    DraggableTargetDirective
  ],
  exports: [
    ModuleComponent,
    SidePanelComponent,
    EditComponentComponent,

    // generics
    WrapperComponent,
    GridComponent,
    GridEditComponent,
    PanelComponent,
    ButtonComponent,
    InputTextComponent,

    DraggableDirective,
    DraggableTargetDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    FormsModule,
    InputTextModule,
    AccordionModule,
    SpinnerModule
  ],
  entryComponents: [
    SidePanelComponent,
    WrapperComponent,
    GridComponent,
    GridEditComponent,
    PanelComponent,
    ButtonComponent,
    InputTextComponent
  ],
  providers: [

  ]
})
export class ModularoModule { }
