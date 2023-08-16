import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { RegionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/regionmaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { DoctorsmasterRoutingModule } from './doctorsmaster-routing.module';
import { DoctorsmasterComponent } from './doctorsmaster.component';

@NgModule({
  declarations: [DoctorsmasterComponent],
  imports: [
    CommonModule,
    DoctorsmasterRoutingModule,
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
    DoctormasterManager,
    RegionmasterManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DoctorsmasterModule { }
