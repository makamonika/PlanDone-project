import { Component, OnDestroy, OnInit } from '@angular/core';
import { KanbanDataService , columnsName, KanbanTask, OrgnizationType} from './kanban-data.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})


export class KanbanComponent implements OnInit, OnDestroy {
  
  columns = this.kanbanDataService.columnData;
  tasksDone = [];
  tasksInProgress = [];
  tasksToDo = [];
  columnsNames = columnsName;
  taskToDialog: KanbanTask;
  organizationTypes: OrgnizationType[] = [];
  
  
  selectedStart: moment.Moment = moment(Date.now());
  selectedEnd: moment.Moment = moment(this.selectedStart).add(2, 'M');
  dateStart = new FormControl(this.selectedStart);
  dateEnd = new FormControl(this.selectedEnd);
  organizationType = new FormControl();
  subscription: Subscription;

  
  constructor(private kanbanDataService: KanbanDataService,
    public dialog: MatDialog) { 
      this.kanbanDataService.getOrganizationTypes().subscribe((data) =>{
        for(var i in data){
          var orgType = new OrgnizationType();
          orgType.id = parseInt(i);
          orgType.name = data[i];
          this.organizationTypes.push(orgType);
        }
      });
    }

  ngOnInit(): void {

    this.subscription = this.kanbanDataService.taskDataChaned$.subscribe(()=>{
        this.tasksSelection();
        console.log('refreshed');
      });
    this.tasksSelection();
    
  }

  public dateStartSelected() {
     this.selectedStart = moment(this.dateStart.value.toJSON().split('T')[0]);
     this.tasksSelection();
  }
  public dateEndSelected() {
    this.selectedEnd = moment(this.dateEnd.value.toJSON().split('T')[0]);
    this.tasksSelection();
 }


  private tasksSelection(){
    this.tasksToDo = [];
    this.tasksInProgress = [];
    this.tasksDone = [];
    this.kanbanDataService.getData().subscribe(
      (data)=> {
        data.forEach(task => {
          if(moment(task.dateEnd).isBetween(this.selectedStart, this.selectedEnd)){
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

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

  
 

 
}
