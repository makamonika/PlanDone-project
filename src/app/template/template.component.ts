import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { columnsName, Task } from '../models/models';
import { BreadcrumbElement, BreadcrumbService } from '../services/breadcrumb.service';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterContentChecked  {

  breadcrumb: BreadcrumbElement;
  constructor(private breadcrumbService: BreadcrumbService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.breadcrumb = {name: "", path: "#"};
    this.breadcrumbService.getBreadcrumb().subscribe((element) => {
      if(element){
       this.breadcrumb = element;
      }
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  addTask(): void{
    let newTask: Task = {
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
        this.router.navigateByUrl(this.router.url);
      }  
    });  
  }

}
