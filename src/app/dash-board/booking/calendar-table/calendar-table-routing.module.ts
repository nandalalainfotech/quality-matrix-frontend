import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarTableComponent } from './calendar-table.component';

const routes: Routes = [
  {
    path: "",
    component: CalendarTableComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarTableRoutingModule { }
