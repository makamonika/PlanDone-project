import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KanbanDataService, KanbanTask } from '../kanban/kanban-data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { parse } from 'querystring';


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardDialogComponent implements OnInit {
  taskData: KanbanTask;
  taskForm: FormGroup;
  taskId;
  taskDataRes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskCardDialogComponent>, 
    private kanbanService: KanbanDataService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) 
    {this.taskData = data.task}
      
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [this.taskData.id],
      type: [this.taskData.type],
      name: [this.taskData.name],
      description: [this.taskData.description],
      dateStart: [this.taskData.dateStart],
      dateEnd:  [this.taskData.dateEnd],
      realization: [this.taskData.realization],
    })
    
  }

  private getTask(){
    this.kanbanService.getTaskById(this.taskId).subscribe((dataRes)=>{
      this.taskData = dataRes;
      console.log(this.taskData);
    })
  }

  add(){
    this.taskForm.value.realization +=10;
  }

  sub(){
    this.taskForm.value.realization -=10;
  }

  save() {
    var formData = this.taskForm.value
    var newData: KanbanTask = {
      id: formData.id,
      type: formData.type,
      name: formData.name,
      description: formData.description,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      realization: formData.realization
    }
    this.kanbanService.updateTaskData(newData);
    this.dialogRef.close(newData);
  }

  close() {
      this.dialogRef.close();
  }

}
