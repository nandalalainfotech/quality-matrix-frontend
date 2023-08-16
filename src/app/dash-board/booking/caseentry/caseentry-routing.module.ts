import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseentryComponent } from './caseentry.component';
import { CaseentryyComponent } from './caseentryy/caseentryy.component';

const routes: Routes = [{
  path: "",
  component: CaseentryComponent,
  children: [
    {
      path: "app-caseentryy",
      component: CaseentryyComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseentryRoutingModule { }
