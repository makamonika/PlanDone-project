import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { columnsName, Task, TasksFilterData } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  columnData: object[] = [{name:columnsName.todo}, {name:columnsName.inprogress},{name: columnsName.done}]; 
  tasks: Task[] =[];
  private taskDataChanged = new Subject<boolean> ();
  taskDataChaned$ = this.taskDataChanged.asObservable();

  constructor( private http: HttpClient) { }
//   const request = new HttpRequest(
//     "POST", "/api/test-request", {}, 
//      {reportProgress: true});

// this.http.request(request)
//     .subscribe(


    taskChanged(){
      this.taskDataChanged.next(true);
    }
    getTaskById(id: number): Observable<Task> {
      let params = new HttpParams();
      params = params.append('id', id.toString());
      return this.http.get<Task>('https://localhost:44310/api/TaskData/task', {params: params});
    }

    updateTaskData(data: Task): Observable<any> {
      return this.http.post<Task>('https://localhost:44310/api/TaskData/updatePlanDoneTask', data);
    }

    getData(filterData: TasksFilterData): Observable<Task[]> {
      let params = new HttpParams();
      Object.keys(filterData).forEach( (key) => {
        params = params.append(key, filterData[key]);
    });
     return this.http.get<Task[]>('https://localhost:44310/api/TaskData/tasksList', {params: params});
    }

    getOrganizationTypes(): Observable<Object>{
      return this.http.get<Object>('https://localhost:44310/api/TaskData/organizationTypesList');
    }

    insertNewTask(data: Task): Observable<any>{
      return this.http.post<Task>('https://localhost:44310/api/TaskData/addNewTask', data);
      
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
