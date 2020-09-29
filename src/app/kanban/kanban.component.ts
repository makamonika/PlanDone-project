import { Component, OnInit } from '@angular/core';
import { KanbanDataService , columnsName, KanbanTask} from './kanban-data.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';



@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})


export class KanbanComponent implements OnInit {
  
  columns = this.kanbanDataService.columnData;
  tasksDone = [];
  tasksInProgress = [];
  tasksToDo = [];
  columnsNames = columnsName;
  taskToDialog:KanbanTask;
  dateStart = new FormControl(moment());
  dateEnd = new FormControl(moment());

  constructor(private kanbanDataService: KanbanDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasksSelection();
  }

  private tasksSelection(){
    this.tasksToDo = [];
    this.tasksInProgress = [];
    this.tasksDone = [];

    this.kanbanDataService.getData().subscribe(
      (data)=> {
        console.log(data);
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
        
      })
    }

  //   private tasksReselection(taskType: string, taskId: number){
  //   switch (taskType){
  //     case columnsName.todo: {
  //       var idx = this.tasksToDo.indexOf(task => task.Id == taskId);
  //       this.tasksToDo[idx] = this.kanbanDataService.getTaskById(taskId)
  //       break;
  //     }
  //     // case columnsName.inprogress: {
  //     //   this.tasksInProgress.push(task);
  //     //   break;
  //     // }
  //     // case columnsName.done: {
  //     //   this.tasksDone.push(task);
  //     //   break;
  //     // }
  //     default: break;
  //   }
  //   console.log(this.tasksToDo)
  // }
    openDialog(id: number) {
      this.kanbanDataService.getTaskById(id).subscribe((taskData=>{
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.height= '85vh';
        dialogConfig.width= '60vw';
        dialogConfig.data = {
          task: taskData
        };
        const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          (res) => {
            if(res){
              this.tasksSelection();            
           }
          }
        );  
      }))
}

  
 

 
}
