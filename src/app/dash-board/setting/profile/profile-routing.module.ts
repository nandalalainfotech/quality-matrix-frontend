import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: "app-registration",
        component: RegistrationComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class ProfileRoutingModule { }
