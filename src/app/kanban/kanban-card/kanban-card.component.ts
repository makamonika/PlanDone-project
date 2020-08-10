import { Component, OnInit, Input } from '@angular/core';
import { KanbanTask } from '../kanban-data.service';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent implements OnInit {

  @Input() cardTask: KanbanTask;
  constructor() { }

  ngOnInit(): void {
  }

}
