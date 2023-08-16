
import { CommonModule } from '@angular/common';
import { AppLanguageSettingRoutingModule } from './app-language-setting-routing.module';
import { AppLanguageSettingComponent } from './app-language-setting.component';
import { ApplanguagesettingManager } from 'src/app/shared/services/restcontroller/bizservice/applanguagesetting.service';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
export const environment = {
	production: true,
	appRootPrefix: '/<>'
	};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
  
@NgModule({
  declarations: [AppLanguageSettingComponent],
  imports: [
    CommonModule,
    AppLanguageSettingRoutingModule,
      BreadcrumbModule,
      FormsModule,
      ReactiveFormsModule,
      NgxFileDropModule,
      AgGridModule.withComponents([]),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
        },
        defaultLanguage: 'en-US',
      }),
  

  ],
  providers:[ApplanguagesettingManager],
  exports:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppLanguageSettingModule { }
