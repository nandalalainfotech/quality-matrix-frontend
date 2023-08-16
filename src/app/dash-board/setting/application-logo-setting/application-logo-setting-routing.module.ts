import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationlogoSettingComponent } from './application-logo-setting.component';


const routes: Routes = [
  {
    path: '',
    component: ApplicationlogoSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class ApplicationlogoSettingRoutingModule { }
