import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OrgnizationType, TasksFilterData } from '../models/models';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss']
})
export class TasksFilterComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<TasksFilterData>();
    
  selectedStart: moment.Moment = moment(Date.now());
  selectedEnd: moment.Moment = moment(this.selectedStart).add(2, 'M');
  
  dateStart = new FormControl(this.selectedStart);
  dateEnd = new FormControl(this.selectedEnd);
  organizationTypeId = new FormControl(0);

  filterFormData: FormGroup;

  organizationTypes: OrgnizationType[] = [];

  filterData: TasksFilterData;

  showFilters: boolean;
  
  constructor(private taskService: TaskService,
    private fb: FormBuilder) {
    this.taskService.getOrganizationTypes().subscribe((data) =>{
      for(var i in data){
        var orgType = new OrgnizationType();
        orgType.id = parseInt(i);
        orgType.name = data[i];
        this.organizationTypes.push(orgType);
      }
    });
   }

  ngOnInit(): void {
    this.filterFormData = this.fb.group({
      startDate: this.dateStart,
      endDate:  this.dateEnd,
      typeId: this.organizationTypeId,
    })
  }

  filter(): void{
    this.filterData = this.filterFormData.value;
    this.filterEvent.emit(this.filterData);
  }

}
