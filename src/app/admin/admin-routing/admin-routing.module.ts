import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateGuardService } from 'src/app/services/can-activate-guard.service';
import { ProjectsComponent } from '../projects/projects.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:"admin",canActivate:[CanActivateGuardService],data:{expectedRole:["Admin"]},children:[
    {path:"projects",component:ProjectsComponent},
    {path:"dashboard",component:DashboardComponent},
    {path:"projects/view/:projectid",component:ProjectDetailsComponent}
  ]},  
  
];

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
