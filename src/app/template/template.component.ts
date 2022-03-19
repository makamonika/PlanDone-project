import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbElement, BreadcrumbService } from '../services/breadcrumb.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterContentChecked  {

  breadcrumb: BreadcrumbElement;
  constructor(private breadcrumbService: BreadcrumbService,
    private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.breadcrumb = {name: "", path: "#"};
    this.breadcrumbService.getBreadcrumb().subscribe((element) => {
      if(element){
       this.breadcrumb = element;
      }
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
