import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DatesSetArg, ViewApi } from '@fullcalendar/angular';
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { TaskService } from '../services/task.service';
import * as moment from 'moment';
import { columnsName, Task, TasksFilterData } from '../models/models';
import { BreadcrumbElement, BreadcrumbService } from '../services/breadcrumb.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarEvents: CalendarTaskModel[] = [];
  calendarOptions: CalendarOptions = {
     customButtons: {
      addNewTaskButton: {
        text: 'Add new task',
        click: this.addNewTask.bind(this)
      }
    },
    initialView: 'dayGridMonth',
    height: '100%',
    locales: [ enLocale, plLocale ],
    locale: 'en',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth listWeek addNewTaskButton'
    },
    buttonText: {
      listWeek: 'Task list'
    },
    datesSet: this.dateChanged.bind(this),
    eventOrderStrict: true,
    eventOrder: 'realization',
    windowResize: this.onWindowResize.bind(this),
    eventClick: this.showEventDetails.bind(this)
  };
  
  startDate: string = moment(Date.now()).add(2, "h").add(-1, 'M').toJSON().split('T')[0];
  endDate: string = moment(this.startDate).add(2, "h").add(2, 'M').toJSON().split('T')[0];

  filterData: TasksFilterData = {
    startDate: this.startDate,
    endDate: this.endDate,
    typeId: 0
  };
  constructor(private taskService: TaskService, 
    private breadcrumbService: BreadcrumbService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    var breadcrumb: BreadcrumbElement = { name: "Calendar", path: "/Calendar"}
    this.breadcrumbService.setBreadcrumb(breadcrumb);
   }

  dateChanged(arg: DatesSetArg): void {
   const start = arg.startStr.split('T')[0];
   const end = moment(start).add(2, "h").add(2, 'M').toJSON().split('T')[0];
   console.log(start, '\n', end);
   this.filterData.startDate = start;
   this.filterData.endDate = end;
  this.getCalendarTasks();
  }

  setEventColor(realization: number): string{
    if(realization > 0 && realization < 100 ){
      return '#9cc2ff'
    }
    else if(realization === 100){
      return '#7ecf9fcc'
    }
    else{
      return '#f59490'
    }
  }

  getCalendarTasks(): void{
    this.taskService.getData(this.filterData).subscribe((tasks) => {
      if(tasks && tasks.length > 0){
        this.calendarEvents = [];
        tasks.forEach((task) => {
          const calendarTask: CalendarTaskModel = {
            id: task.id.toString(),
            title: task.name,
            start: task.dateStart,
            end: task.dateEnd,
            color: this.setEventColor(task.realization)
          }
          this.calendarEvents.push(calendarTask);
        });   
        this.calendarOptions.events = this.calendarEvents;
      }
      else{
        console.log('no filetred data');
      }
     
    });
  }

  onWindowResize(view: ViewApi){
    if( window.screen.width <= 768){
      this.calendarOptions.headerToolbar = {
        left: 'title',
        center: 'prev,next today',
        right: 'dayGridMonth listWeek'
      }
    }
    else{
      this.calendarOptions.headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth listWeek'
      }
    }
  }

  showEventDetails(info: any){
    const eventId = +info.event.id;
    this.taskService.getTaskById(eventId).subscribe((taskData=>{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        task: taskData
      };
      const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((response) => {
        if(response){
          this.getCalendarTasks()
        }  
      });
    }))
  }

  addNewTask(): void{
    let newTask: Task = {
      id: 0,
      kanbanType: columnsName.todo,
      name: " ",
      description: " ",
      dateStart: moment(Date.now()).toJSON().split('T')[0],
      dateEnd: moment(Date.now()).add(2,"M").toJSON().split('T')[0],
      realization: 0,
      organizationType: ""
    } 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      task: newTask,
      newTask: true
    };
    const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      if(response){
        this.getCalendarTasks();
      }  
    });  
  }

}

interface CalendarTaskModel{
  id: string,
  title: string,
  end: string,
  start: string,
  color: string
}



