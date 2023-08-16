import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: "",
    component: MastersComponent,
    children: [
      {
        path: 'app-machinemaster',
        loadChildren: () => import("./machinemaster/machinemaster.module").then(m => m.MachinemasterModule)
      },
      {
        path: 'app-doctorsmaster',
        loadChildren: () => import("./doctorsmaster/doctorsmaster.module").then(m => m.DoctorsmasterModule)
      },
      {
        path: 'app-employeemaster',
        loadChildren: () => import("./employeemaster/employeemaster.module").then(m => m.EmployeemasterModule)
      },
      {
        path: 'app-employeedetails',
        loadChildren: () => import("./employeedetails/employeedetails.module").then(m => m.EmployeedetailsModule)
      },
      {
        path: 'app-regionmaster',
        loadChildren: () => import("./regionmaster/regionmaster.module").then(m => m.RegionmasterModule)
      },
      {
        path: 'app-course',
        loadChildren: () => import("./course/course.module").then(m => m.CourseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
