import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppLanguageSettingComponent } from './app-language-setting.component';

const routes: Routes = [
  {
    path: '',
    component: AppLanguageSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class AppLanguageSettingRoutingModule { }
