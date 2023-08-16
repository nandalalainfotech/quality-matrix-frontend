import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeemasterComponent } from './employeemaster.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeemasterComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemasterRoutingModule { }
