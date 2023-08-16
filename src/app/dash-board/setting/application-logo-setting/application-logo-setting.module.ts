import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { applogoSettingManager } from 'src/app/shared/services/restcontroller/bizservice/app-logo-settings.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ApplicationlogoSettingRoutingModule } from './application-logo-setting-routing.module';
import { ApplicationlogoSettingComponent } from './application-logo-setting.component';

export const environment = {
	production: true,
	appRootPrefix: '/<>'
	};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [ApplicationlogoSettingComponent],
    imports: [
        CommonModule,
        ApplicationlogoSettingRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFileDropModule,
        AgGridModule.withComponents([]),
        // TranslateModule.forRoot({
        //     loader: {
        //       provide: TranslateLoader,
        //       useFactory: (createTranslateLoader),
        //       deps: [HttpClient],
        //     },
        //     defaultLanguage: 'en-US',
        //   }),
    ],
    providers: [
        applogoSettingManager

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ApplicationlogoSettingModule { }
