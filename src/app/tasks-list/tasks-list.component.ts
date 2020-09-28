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
        this.openDialog();
      }
    });
  }

  ngOnInit(): void {
    this.kanbanService.getData().subscribe(tasks => this.Tasks = tasks);
  }

  openDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.height= '90vh';
      dialogConfig.width= '60vw';
      const dialogRef = this.dialog.open(NewTaskComponent, dialogConfig);
      // dialogRef.afterClosed().subscribe(
      //   () => {
      //     this.tasksSelection();
      //   }
      // );  
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
