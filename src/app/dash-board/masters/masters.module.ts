import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    NgxFileDropModule,
    BreadcrumbModule,
    FormsModule
  ]
})
export class MastersModule { }
