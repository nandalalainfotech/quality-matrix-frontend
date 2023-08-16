import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: "",
    component: BookingComponent,
    children: [
      {
        path: "app-appointment",
        loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentModule)
      },
      {
        path: "app-caseentry",
        loadChildren: () => import("./caseentry/caseentry.module").then(m => m.CaseentryModule)
      },
      {
        path: "app-calendar-table",
        loadChildren: () => import("./calendar-table/calendar-table.module").then(m => m.CalendarTableModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
