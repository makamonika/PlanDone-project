import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';

export enum columnsName {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
};

export class KanbanTask {
  id: number;
  type: columnsName;
  name: string;
  description: string;
  dateStart: any;
  dateEnd: any;
  realization: number;
}

@Injectable({
  providedIn: 'root'
})

export class KanbanDataService {

  constructor( private http: HttpClient) { }

  columnData: object[] = [{name:columnsName.todo}, {name:columnsName.inprogress},{name: columnsName.done}]; 
  tasks: KanbanTask[] =[
    {
        id: 4,
        type: columnsName.inprogress,
        name: 'Dodać tablicę kaban',
        description: 'Frontend, Backend, Baza danych',
        dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 20,
    },
    {
        id:5,
        type: columnsName.todo,
        name: 'Zaimplementować kalendarz',
        description: 'Skorzystać z zewnętrznej biblioteki',
        dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 0,
    },
    {
        id: 6,
        type: columnsName.done,
        name: 'Stworzyć główny layout',
        description: 'Nawigacja, menu, stopka',
        dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
        realization: 100,
    }];

    
    getTaskById(id: number): Observable<KanbanTask> {
      let params = new HttpParams();
      params = params.append('id', id.toString());
      return this.http.get<KanbanTask>('https://localhost:44310/api/TaskData/task', {params: params});
    }

    updateTaskData(data: KanbanTask) {
      // var idx: number = this.tasks.findIndex(task => task.id == data.id);
      // if(JSON.stringify(data) !== JSON.stringify(this.tasks[idx])){
      //   this.tasks[idx]=data;
      // }]]
      this.http.post<KanbanTask>('https://localhost:44310/api/TaskData/updatePlanDoneTask', data).subscribe(res => console.log(res));
      return;
    }

    getData(): Observable<KanbanTask[]> {
     return this.http.get<KanbanTask[]>('https://localhost:44310/api/TaskData/tasksList');
    }


}
