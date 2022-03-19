import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class BreadcrumbElement {
  name: string = "";
  path: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbElement$: Subject<BreadcrumbElement> = new Subject();
  constructor() { }

  getBreadcrumb(): Observable<BreadcrumbElement> {
    return this.breadcrumbElement$.asObservable();
  }

  setBreadcrumb(element: BreadcrumbElement){
    this.breadcrumbElement$.next(element);
  }
}
