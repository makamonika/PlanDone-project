import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { pipe, Observable, Subject } from 'rxjs';
import { TaskCardDialogComponent } from '../task-card-dialog/task-card-dialog.component';

export enum columnsName {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
};

export class KanbanTask {
  id: number;
  kanbanType: columnsName;
  name: string;
  description: string;
  dateStart: any;
  dateEnd: any;
  realization: number;
  organizationType: string;
}

export class OrgnizationType{
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class KanbanDataService {

  columnData: object[] = [{name:columnsName.todo}, {name:columnsName.inprogress},{name: columnsName.done}]; 
  tasks: KanbanTask[] =[];
  private taskDataChanged = new Subject<boolean> ();
  taskDataChaned$ = this.taskDataChanged.asObservable();

  constructor( private http: HttpClient) { }

  
    // {
    //     id: 4,
    //     type: columnsName.inprogress,
    //     name: 'Dodać tablicę kaban',
    //     description: 'Frontend, Backend, Baza danych',
    //     dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     realization: 20,
    // },
    // {
    //     id:5,
    //     type: columnsName.todo,
    //     name: 'Zaimplementować kalendarz',
    //     description: 'Skorzystać z zewnętrznej biblioteki',
    //     dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     realization: 0,
    // },
    // {
    //     id: 6,
    //     type: columnsName.done,
    //     name: 'Stworzyć główny layout',
    //     description: 'Nawigacja, menu, stopka',
    //     dateStart: moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     dateEnd:  moment("2020/07/23", "YYYY/MM/DD").format("DD/MM/YYYY"),
    //     realization: 100,
    // }];

    taskChanged(){
      this.taskDataChanged.next(true);
    }
    getTaskById(id: number): Observable<KanbanTask> {
      let params = new HttpParams();
      params = params.append('id', id.toString());
      return this.http.get<KanbanTask>('https://localhost:44310/api/TaskData/task', {params: params});
    }

    updateTaskData(data: KanbanTask): Observable<any> {
      return this.http.post<KanbanTask>('https://localhost:44310/api/TaskData/updatePlanDoneTask', data);
    }

    getData(): Observable<KanbanTask[]> {
     return this.http.get<KanbanTask[]>('https://localhost:44310/api/TaskData/tasksList');
    }

    getOrganizationTypes(): Observable<Object>{
      return this.http.get<Object>('https://localhost:44310/api/TaskData/organizationTypesList');
    }

    insertNewTask(data: KanbanTask): Observable<any>{
      return this.http.post<KanbanTask>('https://localhost:44310/api/TaskData/addNewTask', data);
      
    }

    checkTaskType(type: columnsName, realization: number): columnsName{
      if(realization == 0 && type != columnsName.todo){
        return columnsName.todo;
      }
      else if(realization == 100 && type != columnsName.done){
        return columnsName.done;
      }
      else if(realization != 100 && realization !=0 && type != columnsName.inprogress){
        return columnsName.inprogress;
      }
      else{
          return type;
      } 
    }

}
