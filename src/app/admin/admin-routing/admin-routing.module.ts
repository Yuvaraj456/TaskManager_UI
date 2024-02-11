import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { ProjectsComponent } from '../components/projects/projects.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from '../components/masters/masters.component';
import { ClientLocationsComponent } from '../components/client-locations/client-locations.component';
import { CountriesComponent } from '../components/countries/countries.component';
import { TaskPrioritiesComponent } from '../components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../components/task-status/task-status.component';

const routes: Routes = [

  {path:"",canActivate:[CanActivateGuardService],data:{expectedRole:["Admin"]},children:[
    {path:"projects",component:ProjectsComponent, data:{linkIndex:2}},
    {path:"dashboard",component:DashboardComponent, data:{linkIndex:0}},
    {path:"projects/view/:projectid",component:ProjectDetailsComponent,data:{linkIndex:3}},
    {path:"masters",component:MastersComponent,data:{linkIndex:4}},
    {path:"clientlocation",component:ClientLocationsComponent,data:{linkIndex:5}},
    {path:"countries",component:CountriesComponent,data:{linkIndex:6}},
    {path:"taskpriorities",component:TaskPrioritiesComponent,data:{linkIndex:7}},
    {path:"taskstatus",component:TaskStatusComponent,data:{linkIndex:8}}

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
