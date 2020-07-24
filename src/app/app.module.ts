import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { KanbanComponent } from './kanban/kanban.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
