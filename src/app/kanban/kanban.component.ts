import { Component, OnInit } from '@angular/core';
import { KanbanDataService } from './kanban-data.service';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  constructor(private kanbanDataService: KanbanDataService) { }
  columns = this.kanbanDataService.columnData;
  ngOnInit(): void {
  }
 
}
