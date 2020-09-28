import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { columnsName, KanbanDataService, KanbanTask, OrgnizationType } from '../kanban/kanban-data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';  
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select'; 
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardDialogComponent implements OnInit {
  taskData: KanbanTask;
  taskForm: FormGroup;
  organizationTypes: OrgnizationType[] = [];
  taskId;
  

  constructor(
    public dialogRef: MatDialogRef<TaskCardDialogComponent>, 
    private kanbanService: KanbanDataService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) 
    {this.taskData = data.task}
      
  ngOnInit(): void {
    this.kanbanService.getOrganizationTypes().subscribe((data) =>{
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
    })
    
  }

  private getTask(){
    this.kanbanService.getTaskById(this.taskId).subscribe((dataRes)=>{
      this.taskData = dataRes;
      console.log(this.taskData);
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
      id: formData.id,
      kanbanType: this.checkTaskType(formData.type, this.taskData.realization),
      name: formData.name,
      description: formData.description,
      dateStart: formData.dateStart,
      dateEnd:  formData.dateEnd,
      realization: this.taskData.realization,
      organizationType: formData.organizationType
    }
    this.kanbanService.updateTaskData(newData).subscribe(()=>this.dialogRef.close(true));
    
  }

  close() {
      this.dialogRef.close();
  }

  private checkTaskType(type: columnsName, realization: number): columnsName{
    if(realization == 0 && type != columnsName.todo){
      return columnsName.todo;
    }
    else if(realization == 100 && type != columnsName.done){
      return columnsName.done;
    }
    else if( type != columnsName.inprogress){
      return columnsName.inprogress;
    }
    else{
        return type;
      } 
  }
}
