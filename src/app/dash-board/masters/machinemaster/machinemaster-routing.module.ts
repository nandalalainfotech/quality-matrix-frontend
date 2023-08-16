import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachinemasterComponent } from './machinemaster.component';

const routes: Routes = [
  {
    path: "",
    component: MachinemasterComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinemasterRoutingModule { }
