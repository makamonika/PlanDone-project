import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { TaskCardDialogComponent } from 'src/app/task-card-dialog/task-card-dialog.component';
import { KanbanDataService, KanbanTask } from '../kanban-data.service';

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
      this.kanbanDataService.updateTaskData(this.task).subscribe(res => console.log(res));
     }
  }

  sub(){
    if(this.task.realization>0){
      this.task.realization -=5;
      this.kanbanDataService.updateTaskData(this.task).subscribe(res => console.log(res)); // date format problem
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
      dialogRef.afterClosed().subscribe(
        (res) => {
          if(res){
            //this.tasksSelection();            
         }
        }
      );  
  }))
}
 

}
