import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { LoginComponent } from './componets/login/login.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { SignupComponent } from './componets/signup/signup.component';
import { TaskComponent } from './Employee/task/task.component';
import AllowAnonymousService from './services/allow-anonymous.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';


const routes: Routes = [

  {path:"",redirectTo:"login",pathMatch:'full'}, 
  {path:"signup",component:SignupComponent, canActivate:[AllowAnonymousService],canDeactivate:[CanDeactivateGuardService], data:{linkIndex:3}},
  {path:"about",component:AboutComponent, canActivate:[AllowAnonymousService], data:{linkIndex:1}},
  {path:"login",component:LoginComponent, canActivate:[AllowAnonymousService],data:{linkIndex:2}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, enableTracing:false})], //enableTracing:true --> will shows route events in log
  exports: [RouterModule]
})
export class AppRoutingModule { }
