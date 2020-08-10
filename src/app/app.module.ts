import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TaskCardDialogComponent } from './task-card-dialog/task-card-dialog.component';
import { KanbanCardComponent } from './kanban/kanban-card/kanban-card.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    KanbanComponent,
    KanbanCardComponent,
    TaskCardDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
