import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { TaskCardDialogComponent } from 'src/app/task-card-dialog/task-card-dialog.component';
import { KanbanDataService, KanbanTask } from '../kanban-data.service';
import { KanbanComponent } from '../kanban.component';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent implements OnInit {

  @Input() cardTask: KanbanTask;
  showMore = new Subject<boolean>();
  task: KanbanTask;
  constructor(private kanbanDataService: KanbanDataService,
    public dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.task = this.cardTask;
  }

  add(){
    if(this.task.realization<100){
      this.task.realization +=5;
      this.task.kanbanType = this.kanbanDataService.checkTaskType(this.task.kanbanType, this.task.realization);
      this.kanbanDataService.updateTaskData(this.task).subscribe(() => this.kanbanDataService.taskChanged());
     }
  }

  sub(){
    if(this.task.realization>0){
      this.task.realization -=5;
      this.task.kanbanType = this.kanbanDataService.checkTaskType(this.task.kanbanType, this.task.realization);
      this.kanbanDataService.updateTaskData(this.task).subscribe(() => this.kanbanDataService.taskChanged()); 
    }
  }
  showDescription(){
        this.showMore.next(true);
  }

  hideDescription(){
    this.showMore.next(false);
  }

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
      dialogRef.afterClosed().subscribe((response) => {
        if(response){
          this.kanbanDataService.taskChanged();
        }  
      })
      //TODO check if taskData has any changes, if yes send proper value
    }))
}
 

}
