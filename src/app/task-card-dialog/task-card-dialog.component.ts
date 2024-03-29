import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Task, OrgnizationType } from '../models/models';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardDialogComponent implements OnInit {
  taskData: Task;
  taskForm: FormGroup;
  organizationTypes: OrgnizationType[] = [];
  taskId;

  editMode: boolean = false;
  newTask: boolean = false;

  selectedStart:any;
  selectedEnd:any;
  

  constructor(
    public dialogRef: MatDialogRef<TaskCardDialogComponent>,
    private taskService: TaskService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) 
    {
      console.log(data);
      this.taskData = data.task;
      this.editMode = data.newTask != null;
      this.newTask = data.newTask != null
    }
      
  ngOnInit(): void {
    this.taskService.getOrganizationTypes().subscribe((data) =>{
      for(var i in data){
        var orgType = new OrgnizationType();
        orgType.id = parseInt(i);
        orgType.name = data[i];
        this.organizationTypes.push(orgType);
      }
    });

    this.taskForm = this.fb.group({
      id: [this.taskData.id],
      type: [this.taskData.kanbanType],
      name: [this.taskData.name],
      description: [this.taskData.description],
      dateStart: [this.taskData.dateStart],
      dateEnd: [this.taskData.dateEnd],
     // dateStart: [this.datePipe.transform(new Date(this.taskData.dateStart),"yyyy-MM-dd")],
     // dateEnd: [this.datePipe.transform(new Date(this.taskData.dateEnd),"yyyy-MM-dd")],
      realization: [this.taskData.realization],
      organizationType: [this.taskData.organizationType]
    });

    this.selectedStart = moment(this.taskForm.value.dateStart).add(1, "h").toJSON().split('T')[0];
    this.selectedEnd = moment(this.taskForm.value.dateEnd).add(1, "h").toJSON().split('T')[0];
    
  }

  private getTask() : void{
    this.taskService.getTaskById(this.taskId).subscribe((dataRes)=>{
      this.taskData = dataRes;
    })
  }

  add(): void{
    if(this.taskData.realization<100){
     this.taskData.realization +=5;
    }
  }

  sub(): void{
    if(this.taskData.realization>0){
      this.taskData.realization -=5;
    }
  }

  save() {
    var formData = this.taskForm.value;
   
    var newData: Task = {
      id: formData.id,
      kanbanType: this.taskService.checkTaskType(formData.type, this.taskData.realization),
      name: formData.name,
      description: formData.description,
      dateStart: this.selectedStart,
      dateEnd:  this.selectedEnd,
      realization: this.taskData.realization,
      organizationType: formData.organizationType
    }
    if(!this.newTask){
      this.taskService.updateTaskData(newData).subscribe(()=>this.dialogRef.close(true));
    }
    else{
      this.taskService.insertNewTask(newData).subscribe(() => this.dialogRef.close(true));
    }
  }

  close(): void{
      this.dialogRef.close();
  }

  dateStartSelected(): void{
    this.selectedStart = moment(this.taskForm.value.dateStart).add(1, "h").toJSON().split('T')[0];
  }

  dateEndSelected(): void{
    this.selectedEnd = moment(this.taskForm.value.dateEnd).add(1, "h").toJSON().split('T')[0];
  }
}
