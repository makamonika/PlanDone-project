import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { columnsName, KanbanDataService, KanbanTask, OrgnizationType } from '../kanban/kanban-data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['../task-card-dialog/task-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewTaskComponent implements OnInit {
  taskData: KanbanTask;
  taskForm: FormGroup;
  organizationTypes: OrgnizationType[] = [];
  

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>, 
    private kanbanService: KanbanDataService,
    private fb: FormBuilder,
    private datePipe: DatePipe){}
      
  ngOnInit(): void {
    
    this.kanbanService.getOrganizationTypes().subscribe((data) =>{
      for(var i in data){
        var orgType = new OrgnizationType();
        orgType.id = parseInt(i);
        orgType.name = data[i];
        this.organizationTypes.push(orgType);
      }
    });
    this.taskData = new KanbanTask();
    this.taskData.realization = 0;
    this.taskForm = this.fb.group({
      id: "",
      type: columnsName.todo,
      organizationType: "",
      name: " ",
      description: " ",
      dateStart: this.datePipe.transform(Date.now(),"yyyy-MM-dd"),
      dateEnd:  this.datePipe.transform(Date.now(),"yyyy-MM-dd"),
      realization: this.taskData.realization,
    })
  }

  add(){
    if(this.taskData.realization<100){
     this.taskData.realization +=5;
    }
  }

  sub(){
   if(this.taskData.realization>0){
      this.taskData.realization -=5;
   }
  }

  save() {
    var formData = this.taskForm.value;
   
    var newData: KanbanTask = {
      id: 0,
      kanbanType: this.checkTaskType(this.taskData.realization),
      name: formData.name,
      description: formData.description,
      dateStart: formData.dateStart,
      dateEnd:  formData.dateEnd,
      realization: this.taskData.realization,
      organizationType: formData.organizationType
    }
    this.kanbanService.insertNewTask(newData);
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

  private checkTaskType(realization: number): columnsName{
    if(realization == 0){
      return columnsName.todo;
    }
    else if(realization == 100){
      return columnsName.done;
    }
    else
      return columnsName.inprogress;
    }
  }
