import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'primeng/calendar';
import { CaseEntryManager } from 'src/app/shared/services/restcontroller/bizservice/case-entry.service';
import { CaseMachineManager } from 'src/app/shared/services/restcontroller/bizservice/cashmacine.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CaseentryRoutingModule } from './caseentry-routing.module';
import { CaseentryComponent } from './caseentry.component';
import { CaseentryyComponent } from './caseentryy/caseentryy.component';


@NgModule({
  declarations: [CaseentryComponent, CaseentryyComponent],
  imports: [
    CommonModule,
    CaseentryRoutingModule,
    FormsModule,
    BreadcrumbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [
    DatePipe,
    CaseEntryManager,
    CaseMachineManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CaseentryModule { }
