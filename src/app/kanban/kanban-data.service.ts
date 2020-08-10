import { Injectable } from '@angular/core';
import * as moment from 'moment';

export enum columnsName {
  todo = 'TODO',
  inprogress = 'INPROGRESS',
  done = 'DONE'
};

export class KanbanTask {
  id: number;
  type: columnsName;
  name: string;
  description: string;
  dataStart: any;
  dataEnd: any;
  realization: number;
}

@Injectable({
  providedIn: 'root'
})

export class KanbanDataService {

  constructor() { }

  columnData: object[] = [{name:columnsName.todo}, {name:columnsName.inprogress},{name: columnsName.done}]; 
  tasks: KanbanTask[] =[
    {
        id: 1,
        type: columnsName.inprogress,
        name: 'Dodać tablicę kaban',
        description: 'Frontend, Backend, Baza danych',
        dataStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dataEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 20,
    },
    {
        id: 2,
        type: columnsName.todo,
        name: 'Zaimplementować kalendarz',
        description: 'Skorzystać z zewnętrznej biblioteki',
        dataStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dataEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 0,
    },
    {
        id: 3,
        type: columnsName.done,
        name: 'Stworzyć główny layout',
        description: 'Nawigacja, menu, stopka',
        dataStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dataEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 100,
    }];

    getKanbanData(): KanbanTask[]{
      return this.tasks;
    }

    getKanbanDataById(id: number): KanbanTask {
      var retTask: KanbanTask;
      this.tasks.forEach (task => 
        {
          if(task.id == id){
            retTask = task;
          }
        });
        return retTask;
    }
    updateTaskData(taskData: KanbanTask) {
      this.tasks.forEach(task =>
        {
          if(task.id == taskData.id) {
            task = taskData;
          };
        });
    }
}
