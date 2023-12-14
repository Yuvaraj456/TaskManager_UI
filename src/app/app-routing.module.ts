import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { LoginComponent } from './componets/login/login.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { SignupComponent } from './componets/signup/signup.component';
import { TaskComponent } from './Employee/task/task.component';
import AllowAnonymousService from './services/allow-anonymous.service';


const routes: Routes = [

  {path:"",redirectTo:"login",pathMatch:'full'}, 
  {path:"signup",component:SignupComponent, canActivate:[AllowAnonymousService]},
  {path:"about",component:AboutComponent, canActivate:[AllowAnonymousService]},
  {path:"login",component:LoginComponent, canActivate:[AllowAnonymousService]},

  {path:"employee",canActivate:[CanActivateGuardService],data:{expectedRole:["Admin","Employee"]},children:[
    {path:"tasks",component:TaskComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})], //enableTracing:true --> will shows route events in log
  exports: [RouterModule]
})
export class AppRoutingModule { }
