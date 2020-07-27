import { Injectable } from '@angular/core';

enum columnsName {
  todo = 'TODO',
  inprogress = 'INPROGRESS',
  done = 'DONE'
};

@Injectable({
  providedIn: 'root'
})
export class KanbanDataService {

  constructor() { }
  
  columnData: object[] = [{name: columnsName.done}, {name:columnsName.inprogress}, {name:columnsName.todo}]; 
  tasks: object[] =[
    {
        type: columnsName.inprogress,
        name: 'Dodać tablicę kaban',
        description: 'Frontend, Backend, Baza danych',
        dataStart: '27.07.2020',
        dataEnd: '30.07.2020',
        realization: 20,
    },
    {
        type: columnsName.todo,
        name: 'Zaimplementować kalendarz',
        description: 'Skorzystać z zewnętrznej biblioteki',
        dataStart: '31.07.2020',
        dataEnd: '10.08.2020',
        realization: 0,
    },
    {
        type: columnsName.done,
        name: 'Stworzyć główny layout',
        description: 'Nawigacja, menu, stopka',
        dataStart: '10.07.2020',
        dataEnd: '20.07.2020',
        realization: 100,
    }];
}
