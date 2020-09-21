import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TaskCardDialogComponent } from './task-card-dialog/task-card-dialog.component';
import { KanbanCardComponent } from './kanban/kanban-card/kanban-card.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    KanbanComponent,
    KanbanCardComponent,
    TaskCardDialogComponent,
    TasksListComponent,
    
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
