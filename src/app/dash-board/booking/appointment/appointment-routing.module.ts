import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { BookingentryComponent } from './bookingentry/bookingentry.component';
import { BookingmanagementComponent } from './bookingmanagement/bookingmanagement.component';
import { TimeComponent } from './time/time.component';

const routes: Routes = [
  {
    path: "",
    component: AppointmentComponent,
    children: [
      {
        path: 'app-bookingentry',
        component: BookingentryComponent,
      },
      {
        path: 'app-bookingmanagement',
        component: BookingmanagementComponent,
      },
      {
        path: 'app-time',
        component: TimeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
