import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KanbanDataService, KanbanTask } from '../kanban/kanban-data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-task-card-dialog',
  templateUrl: './task-card-dialog.component.html',
  styleUrls: ['./task-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardDialogComponent implements OnInit {
  taskData: KanbanTask;
  taskForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<TaskCardDialogComponent>, 
    private kanbanService: KanbanDataService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
      this.taskData = kanbanService.getKanbanDataById(data.id);
      this.taskForm = fb.group({
        name: [this.taskData.name],
        description: [this.taskData.description],
        dataStart: [this.taskData.dataStart],
        dataEnd:  [this.taskData.dataEnd],
        realization: [this.taskData.realization],
      })
    }

  ngOnInit(): void {
  }

  save() {
    var formData = this.taskForm.value;
    var newData: KanbanTask = {
      id: this.taskData.id,
      type: this.taskData.type,
      name: formData.name,
      description: formData.description,
      dataStart: formData.dataStart,
      dataEnd: formData.dataEnd,
      realization: formData.realization
    }
    this.dialogRef.close(newData);
  }

  close() {
      this.dialogRef.close();
  }

}
