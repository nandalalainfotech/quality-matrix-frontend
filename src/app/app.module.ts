import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { AgGridModule } from 'ag-grid-angular';
import { GojsAngularModule } from 'gojs-angular';
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuditComponent } from './shared/audit/audit.component';
import { PopupComponent } from './shared/popup/popup.component';
import { CalloutComponent } from './shared/services/callout/callout.component';
import { IconRendererComponent } from './shared/services/renderercomponent/icon-renderer-component';
import { applogoSettingManager } from './shared/services/restcontroller/bizservice/app-logo-settings.service';
import { AuthManager } from './shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from './shared/services/restcontroller/bizservice/user.service';
import { BaseService } from './shared/services/services/base.service';
import { CalloutService } from './shared/services/services/callout.service';
import { DataSharedService } from './shared/services/services/datashared.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordModule } from './change-password/change-password.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export const environment = {
	production: true,
	appRootPrefix: '/<>'
};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		CalloutComponent,
		PopupComponent,
		ResetPasswordComponent,
		AuditComponent,
		UserRegistrationComponent,
		IconRendererComponent,
		ChangePasswordComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		ChangePasswordModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		ScheduleAllModule,
		BrowserAnimationsModule,
		AppRoutingModule,
	MatSelectModule,
		NgbModule,
		AgGridModule.withComponents([]),
		NgbCollapseModule,
		UserRegistrationModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatTableModule,
		MatIconModule,
		GojsAngularModule,
			MatDatepickerModule,
		MatNativeDateModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient],
			},
			defaultLanguage: 'en-US',
		}),
	],
	exports: [PopupComponent, NgbCollapseModule, IconRendererComponent],
	providers: [AuthManager, CalloutService, DataSharedService, UserManager, BaseService,
		applogoSettingManager, UserManager,
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
	bootstrap: [AppComponent],
	entryComponents: [ResetPasswordComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
