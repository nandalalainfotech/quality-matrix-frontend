import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { RegionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/regionmaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { RegionmasterRoutingModule } from './regionmaster-routing.module';
import { RegionmasterComponent } from './regionmaster.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [RegionmasterComponent],
  imports: [
    CommonModule,
    RegionmasterRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],

  providers: [
    RegionmasterManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RegionmasterModule { }
