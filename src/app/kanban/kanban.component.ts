import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';
import * as moment from 'moment';

import { Subscription } from 'rxjs';
import { columnsName, Task, TasksFilterData } from '../models/models';
import { BreadcrumbElement, BreadcrumbService } from '../services/breadcrumb.service';
import { TaskService } from '../services/task.service';



@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})


export class KanbanComponent implements OnInit, OnDestroy {
  
  columns = this.taskService.columnData;
  tasksDone = [];
  tasksInProgress = [];
  tasksToDo = [];
  columnsNames = columnsName;
  taskToDialog: Task;

  startDate: string = moment(Date.now()).add(2, "h").toJSON().split('T')[0];
  endDate: string = moment(this.startDate).add(2, "h").add(2, 'M').toJSON().split('T')[0];

  filterData: TasksFilterData = {
    startDate: this.startDate,
    endDate: this.endDate,
    typeId: 0
  };


  subscription: Subscription;

  
  constructor(private taskService: TaskService,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog) { 
      
    }

  ngOnInit(): void {
    this.subscription = this.taskService.taskDataChaned$.subscribe(()=>{
        this.tasksSelection();
    });

    var breadcrumb: BreadcrumbElement = { name: "Kanban", path: "/Kanban"}
    this.breadcrumbService.setBreadcrumb(breadcrumb);

    this.tasksSelection();
    
  }


  private tasksSelection(): void{
    this.tasksToDo = [];
    this.tasksInProgress = [];
    this.tasksDone = [];
    this.taskService.getData(this.filterData).subscribe(
      (data)=> {
        if(data && data.length > 0){
          data.forEach(task => {
            switch (task.kanbanType){
              case columnsName.todo: {
                this.tasksToDo.push(task);
                break;
              }
              case columnsName.inprogress: {
                this.tasksInProgress.push(task);
                break;
              }
              case columnsName.done: {
                this.tasksDone.push(task);
                break;
              }
              default: break;
            }
          });
        }
        else {
          console.log("no filtered data");
        }
      })
    }

    openDialog(id: number) {
      this.taskService.getTaskById(id).subscribe((taskData=>{
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.data = {
          task: taskData
        };
        const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res) => {
            if(res){
              this.tasksSelection();            
           }
          }
        );  
      }))
    }

    ngOnDestroy(): void{
      if(this.subscription){
        this.subscription.unsubscribe();
      }      
    }

    onFilter(data: TasksFilterData){
      if(data) {
        this.filterData.startDate = data.startDate.add(2,"h").toJSON().split('T')[0];
        this.filterData.endDate = data.endDate.add(2,"h").toJSON().split('T')[0];
        this.filterData.typeId = data.typeId;
        this.tasksSelection();
      }
    }

  
 

 
}
