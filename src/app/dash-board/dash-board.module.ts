import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LineChartModule } from '@swimlane/ngx-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { GojsAngularModule } from 'gojs-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ApplanguagesettingManager } from '../shared/services/restcontroller/bizservice/applanguagesetting.service';
import { BookingentryManager } from '../shared/services/restcontroller/bizservice/bookingentry.service';
import { DoctormasterManager } from '../shared/services/restcontroller/bizservice/doctormaster.service';
import { MachinemasterManager } from '../shared/services/restcontroller/bizservice/machinemaster.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatTooltipModule } from '@angular/material/tooltip';

export const environment = {
  production: true,
  appRootPrefix: '/<>'
};
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({

  declarations: [
    DashBoardComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    LineChartModule,
    ChartsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    ProgressbarModule.forRoot(),
    RoundProgressModule,
    TranslateModule.forRoot(),
    GojsAngularModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    ColorPickerModule,
    DashboardRoutingModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatExpansionModule,
     MatTooltipModule,
    ColorPickerModule,
    DashboardRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
  ],
  providers: [DataSharedService, CdkColumnDef, UserManager, ApplanguagesettingManager, DoctormasterManager, MachinemasterManager, BookingentryManager, DatePipe
  ],
  exports: [NgbCollapseModule],
})
export class DashboardModule { }

