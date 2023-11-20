import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { SignupComponent } from './componets/signup/signup.component';
import { TaskComponent } from './componets/task/task.component';

const routes: Routes = [
  {path:"projects",component:ProjectsComponent,canActivate:[CanActivateGuardService],data:{expectedRole:["Admin"]}},
  {path:"dashboard",component:DashboardComponent, canActivate:[CanActivateGuardService], data:{expectedRole:["Admin","Employee"]} },
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"login",pathMatch:'full'}, 
  {path:"signup",component:SignupComponent},
  {path:"tasks",component:TaskComponent, canActivate:[CanActivateGuardService],data:{expectedRole:["Admin","Employee"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
