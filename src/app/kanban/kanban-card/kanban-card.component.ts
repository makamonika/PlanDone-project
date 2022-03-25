import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { TaskCardDialogComponent } from 'src/app/task-card-dialog/task-card-dialog.component';
import { Task } from '../../models/models';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent implements OnInit {

  @Input() cardTask: Task;
  showMore = new Subject<boolean>();
  task: Task;
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.task = this.cardTask;
  }

  add(){
    if(this.task.realization<100){
      this.task.realization +=5;
      this.task.kanbanType = this.taskService.checkTaskType(this.task.kanbanType, this.task.realization);
      this.taskService.updateTaskData(this.task).subscribe(() => this.taskService.taskChanged());
     }
  }

  sub(){
    if(this.task.realization>0){
      this.task.realization -=5;
      this.task.kanbanType = this.taskService.checkTaskType(this.task.kanbanType, this.task.realization);
      this.taskService.updateTaskData(this.task).subscribe(() => this.taskService.taskChanged()); 
    }
  }
  showDescription(){
        this.showMore.next(true);
  }

  hideDescription(){
    this.showMore.next(false);
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
      dialogRef.afterClosed().subscribe((response) => {
        if(response){
          this.taskService.taskChanged();
        }  
      })
      //TODO check if taskData has any changes, if yes send proper value
    }))
}
 

}
