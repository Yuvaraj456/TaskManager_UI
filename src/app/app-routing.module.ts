import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './Employee/components/task/task.component';
import AllowAnonymousService from './services/allow-anonymous.service';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';


const routes: Routes = [

  {path:"",redirectTo:"login",pathMatch:'full'}, 
  {path:"signup",title:"SignUp",component:SignupComponent, canActivate:[AllowAnonymousService],canDeactivate:[CanDeactivateGuardService], data:{linkIndex:3}},
  {path:"about",title:"About",component:AboutComponent, canActivate:[AllowAnonymousService], data:{linkIndex:1}},
  {path:"login",title:"Login",component:LoginComponent, canActivate:[AllowAnonymousService],data:{linkIndex:2}},
  {path:"admin",loadChildren:()=> import("./admin/admin.module").then(m=>m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, enableTracing:false, preloadingStrategy:PreloadAllModules})], //enableTracing:true --> will shows route events in log
  exports: [RouterModule] //preloadingStrategy is for lazy loading file loads when browser is idle or initial request is completed
})
export class AppRoutingModule { } //
