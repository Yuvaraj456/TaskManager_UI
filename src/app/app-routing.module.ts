import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './Employee/components/task/task.component';
import AllowAnonymousService from './services/allow-anonymous.service';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';


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
