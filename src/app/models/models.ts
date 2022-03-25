export enum columnsName {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
};
export class Task {
  id: number;
  kanbanType: columnsName;
  name: string;
  description: string;
  dateStart: any;
  dateEnd: any;
  realization: number;
  organizationType: string;
}

export class TasksFilterData{
  startDate: any;
  endDate: any;
  typeId: number; 
}

export class OrgnizationType{
  id: number;
  name: string;
}