import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { KanbanDataService } from '../kanban/kanban-data.service';
import { columnsName, KanbanTask, TasksFilterData } from '../models/models';
import { BreadcrumbElement, BreadcrumbService } from '../services/breadcrumb.service';
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

  startDate: string = moment(Date.now()).add(2, "h").toJSON().split('T')[0];
  endDate: string = moment(this.startDate).add(2, "h").add(2, 'M').toJSON().split('T')[0];

  filterData: TasksFilterData = {
    startDate: this.startDate,
    endDate: this.endDate,
    typeId: 0
  };
  
  constructor(private kanbanService: KanbanDataService, 
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService) {
    this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
      if (params['newTask']) {
        this.openNewTaskDialog();
      }
    });
  }

  ngOnInit(): void {
    var breadcrumb: BreadcrumbElement = { name: "Lista zadań", path: "/TasksList"}
    this.breadcrumbService.setBreadcrumb(breadcrumb);
    this.tasksSelection();
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  openNewTaskDialog() {
      let newTask: KanbanTask = {
        id: 0,
        kanbanType: columnsName.todo,
        name: " ",
        description: " ",
        dateStart: moment(Date.now()).toJSON().split('T')[0],
        dateEnd: moment(Date.now()).add(2,"M").toJSON().split('T')[0],
        realization: 0,
        organizationType: ""
      } 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        task: newTask,
        newTask: true
      };
      const dialogRef = this.dialog.open(TaskCardDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((response) => {
        if(response){
          this.tasksSelection();
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
              this.tasksSelection();
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

    onFilter(data: TasksFilterData){
      if(data) {
        this.filterData.startDate = data.startDate.add(2,"h").toJSON().split('T')[0];
        this.filterData.endDate = data.endDate.add(2,"h").toJSON().split('T')[0];
        this.filterData.typeId = data.typeId;
        this.tasksSelection();
      }
    }

    onSort(sortByKey: string){
      if(sortByKey === "name"){
        this.Tasks.sort((a, b) => (a[sortByKey].toLocaleLowerCase() > b[sortByKey].toLocaleLowerCase()) ? 1 : ((b[sortByKey].toLowerCase() > a[sortByKey].toLowerCase()) ? -1 : 0));
      }
      else{
        this.Tasks.sort((a, b) => (a[sortByKey] > b[sortByKey]) ? 1 : ((b[sortByKey] > a[sortByKey]) ? -1 : 0));
      }
    }

    private tasksSelection(){
      this.kanbanService.getData(this.filterData).subscribe((tasks) => {
        if(tasks && tasks.length > 0){
          this.Tasks = tasks;
        }
        else{
          console.log('no filetred data'); //todo add to UI
        }
       
      });
    }
}
