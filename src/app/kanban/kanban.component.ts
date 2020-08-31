import { Component, OnInit } from '@angular/core';
import { KanbanDataService , columnsName} from './kanban-data.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  constructor(private kanbanDataService: KanbanDataService,
    public dialog: MatDialog) { }
  columns = this.kanbanDataService.columnData;
  tasksDone = [];
  tasksInProgress = [];
  tasksToDo = [];
  columnsNames = columnsName;

  ngOnInit(): void {
    this.taskSelection();
  }

  private taskSelection(){
    this.kanbanDataService.getData().subscribe(
      (data)=> {
        data.forEach(task => {
          switch (task.type){
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
      })}
  
    openDialog(taskId: number) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.height= '85vh';
      dialogConfig.width= '60vw';
      dialogConfig.data = {
        id: taskId
      };

   
    const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data){
          //console.log("Dialog output:", data);
          this.kanbanDataService.updateTaskData(data);
        }
      }
  );  
}

  
 

 
}
