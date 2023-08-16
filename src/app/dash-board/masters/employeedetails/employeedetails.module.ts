import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { CourseManager } from 'src/app/shared/services/restcontroller/bizservice/course.service';
import { EmployeedetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetails.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { EmployeedetailsRoutingModule } from './employeedetails-routing.module';
import { EmployeedetailsComponent } from './employeedetails.component';


@NgModule({
  declarations: [EmployeedetailsComponent],
  imports: [
    CommonModule,
    EmployeedetailsRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    EmployeedetailsManager,
    CourseManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EmployeedetailsModule { }
