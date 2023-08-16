import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserThemeRoutingModule } from './user-theme-routing.module';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { UserThemeComponent } from './user-theme.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
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
  declarations: [
    UserThemeComponent
  ],
  imports: [
    CommonModule,
    UserThemeRoutingModule,
    BreadcrumbModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
    
  
  ]
})
export class UserThemeModule { }
