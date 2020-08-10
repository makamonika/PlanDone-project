import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KanbanDataService, KanbanTask } from '../kanban/kanban-data.service';


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss']
})
export class TaskCardDialogComponent implements OnInit {
  taskData: any;
  constructor(
    public dialogRef: MatDialogRef<TaskCardDialogComponent>, private kanbanService: KanbanDataService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.taskData = kanbanService.getKanbanDataById(data.id);
      console.log(this.taskData);
    }

  ngOnInit(): void {
  }

  save() {
   // this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

}
