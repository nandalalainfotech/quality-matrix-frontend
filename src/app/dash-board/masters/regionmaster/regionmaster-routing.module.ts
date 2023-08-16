import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionmasterComponent } from './regionmaster.component';

const routes: Routes = [
  {
    path: "",
    component: RegionmasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionmasterRoutingModule { }
