import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { MachinemasterRoutingModule } from './machinemaster-routing.module';
import { MachinemasterComponent } from './machinemaster.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MachinemasterComponent],
  imports: [
    CommonModule,
    MachinemasterRoutingModule,
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
    MachinemasterManager],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MachinemasterModule { }
