import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { KanbanDataService, KanbanTask } from '../kanban/kanban-data.service';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  Tasks: KanbanTask[] = [];
  routeQueryParams$: Subscription;
  showMore = new Subject<boolean>();
  
  constructor(private kanbanService: KanbanDataService, 
    public dialog: MatDialog,
    private route: ActivatedRoute) {
    this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
      if (params['newTask']) {
        this.openNewTaskDialog();
      }
    });
  }

  ngOnInit(): void {
    this.kanbanService.getData().subscribe(tasks => this.Tasks = tasks);
  }

  openNewTaskDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      const dialogRef = this.dialog.open(NewTaskComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((response) => {
        console.log('dialog close', response);
        if(response){
          this.kanbanService.getData().subscribe(tasks => this.Tasks = tasks);
        }  
      });  
    }

    openTaskDialog(id: number){
        this.kanbanService.getTaskById(id).subscribe((taskData=>{
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = false;
           dialogConfig.autoFocus = false;
           dialogConfig.data = {
             task: taskData
           };
           const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
           dialogRef.afterClosed().subscribe((response) => {
             if(response){
              this.kanbanService.getData().subscribe(tasks => this.Tasks = tasks);
             }  
           })
           //TODO check if taskData has any changes, if yes send proper value
         }))
     }

    showDescription()
    {
      this.showMore.next(true);
    }

    hideDescription()
    {
      this.showMore.next(false);
    }


    ngOnDestroy() {
      this.routeQueryParams$.unsubscribe();
    }
}
