import { Component, OnInit } from '@angular/core';
import { KanbanDataService, KanbanTask } from '../kanban/kanban-data.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  Tasks: KanbanTask[] = [];
  constructor(public kanbanService: KanbanDataService) { }

  ngOnInit(): void {
    this.kanbanService.getData().subscribe(tasks => this.Tasks = tasks);
  }

}
