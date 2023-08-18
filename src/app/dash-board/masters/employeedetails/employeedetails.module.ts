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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
	production: true,
	appRootPrefix: '/<>'
	};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

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
    TranslateModule.forRoot({
		  loader: {
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [HttpClient],
		  },
		  defaultLanguage: 'en-US',
		}),
    AgGridModule.withComponents([])
  ],
  providers: [
    EmployeedetailsManager,
    CourseManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EmployeedetailsModule { }
