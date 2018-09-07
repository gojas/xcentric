import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ModuleComponent} from './modularo/module.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/primeng';
import {XcentricEntityManagerModule} from 'xcentric';
import {UserListener} from './entity-manager/user.listener';
import {UserModifier} from './entity-manager/user.modifier';
import {UserRepository} from 'src/app/entity-manager/user.repository';
import {CustomParser} from './entity-manager/custom.parser';
import {TableModule} from 'primeng/table';
import {ModularoModule} from './modularo/modularo.module';

@NgModule({
  declarations: [
    AppComponent
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
    InputTextModule,
    ModularoModule
  ],
  entryComponents: [
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
