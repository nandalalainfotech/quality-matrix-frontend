import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: 'app-masters',
        loadChildren: () => import("./masters/masters.module").then(m => m.MastersModule)
      },
      {
        path: 'app-booking',
        loadChildren: () => import("./booking/booking.module").then(m => m.BookingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class DashboardRoutingModule { }
