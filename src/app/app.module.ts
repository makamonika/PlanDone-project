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
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {DatePipe} from '@angular/common';
import {MatSelectModule} from '@angular/material/select'; 
import { RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TasksFilterComponent } from './tasks-filter/tasks-filter.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { environment } from '../environments/environment.prod';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list'; // a plugin!

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L'
  },
};

const appRoutes: Routes = [
  {
    path: 'Calendar', 
    component: CalendarComponent,
  },
  {
    path: 'TasksList', 
    component: TasksListComponent,
  },
  {
    path: 'Kanban', 
    component: KanbanComponent,
  },
  {
    path: '',
    redirectTo: '/Kanban',
    pathMatch: 'full'
  }
]

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    KanbanComponent,
    KanbanCardComponent,
    TaskCardDialogComponent,
    TasksListComponent,
    TasksFilterComponent,
    CalendarComponent
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
    HttpClientModule,
    MatSelectModule,
    MatTooltipModule,
    FullCalendarModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    { provide: "BASE_API_URL", useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
