import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { KanbanDataService } from '../kanban/kanban-data.service';
import { OrgnizationType, TasksFilterData } from '../models/models';

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
  
  constructor(private kanbanDataService: KanbanDataService,
    private fb: FormBuilder) {
    this.kanbanDataService.getOrganizationTypes().subscribe((data) =>{
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

  dateStartSelected() {
    //this.selectedStart = moment(this.dateStart.value.toJSON().split('T')[0]);
    //this.selectedStart = this.dateStart.value;
  }
  dateEndSelected() {
   //this.selectedEnd = this.dateEnd.value;
  }

  filter(){
    // TODO data is not changed
    this.filterData = this.filterFormData.value;
    this.filterEvent.emit(this.filterData);
  }

}
