import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsmasterComponent } from './doctorsmaster.component';

const routes: Routes = [
  {
    path: "",
    component: DoctorsmasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsmasterRoutingModule { }
