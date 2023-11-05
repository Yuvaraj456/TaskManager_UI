import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService:LoginService, private route:Router) { }

  canActivate(router:ActivatedRouteSnapshot): boolean {
    
    console.log(this.route.url);
    if(this.loginService.isAuthenticated())
    {
      return true; //the user can navigate to the particular route
    }
    else
    {
      this.route.navigate(["/login"]);
      return false; //the user can't navigate to the particular route
    }
  }

}
