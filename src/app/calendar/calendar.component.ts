import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/angular';
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { TaskService } from '../services/task.service';
import * as moment from 'moment';
import { TasksFilterData } from '../models/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarEvents: CalendarTaskModel[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: '100%',
    locales: [ enLocale, plLocale ],
    locale: 'pl',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth listWeek'
    },
    buttonText: {
      listWeek: 'Lista zadań'
    },
    datesSet: this.dateChanged.bind(this)
  };
  
  startDate: string = moment(Date.now()).add(2, "h").add(-1, 'M').toJSON().split('T')[0];
  endDate: string = moment(this.startDate).add(2, "h").add(2, 'M').toJSON().split('T')[0];

  filterData: TasksFilterData = {
    startDate: this.startDate,
    endDate: this.endDate,
    typeId: 0
  };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   // this.getCalendarTasks(this.filterData);  
  }

  dateChanged(arg: DatesSetArg): void {
   const start = arg.startStr.split('T')[0];
   const end = moment(start).add(2, "h").add(2, 'M').toJSON().split('T')[0];
   console.log(start, '\n', end);
   const newFilterData: TasksFilterData = {
    startDate: start,
    endDate: end,
    typeId: 0 
    }
    this.getCalendarTasks(newFilterData);
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

  getCalendarTasks(filterData: TasksFilterData){
    this.taskService.getData(filterData).subscribe((tasks) => {
      if(tasks && tasks.length > 0){
        this.calendarEvents = [];
        tasks.forEach((task) => {
          const calendarTask: CalendarTaskModel = {
            title: task.name,
            start: task.dateStart,
            end: task.dateEnd,
            color: this.setEventColor(task.realization)
          }
          this.calendarEvents.push(calendarTask);
        });   
        console.log(this.calendarEvents); 
        this.calendarOptions.events = this.calendarEvents;
      }
      else{
        console.log('no filetred data');
      }
     
    });
  }

}

interface CalendarTaskModel{
  title: string,
  end: string,
  start: string,
  color: string
}



