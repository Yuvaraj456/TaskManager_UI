import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { LoginUserService } from '../services/login-user.service';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService:LoginService, private router:Router, private jwtHelperService:JwtHelperService, private loginUserService:LoginUserService) { }

  canActivate(route:ActivatedRouteSnapshot): boolean {

    let token:any = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null;
    console.log(this.router.url);
    let jwtRole:string = (this.jwtHelperService.decodeToken(token)).role;
    let authRole:Array<string> = route.data["expectedRole"];
    
    if(this.loginService.isAuthenticated() && authRole.includes(jwtRole))
    {

      this.loginUserService.onUserChange();
      return true; //the user can navigate to the particular route
    }
    else 
    {
     
      this.loginUserService.onUserChange();
      this.router.navigate(["/login"]);
      return false; //the user can't navigate to the particular route
    }
  }

}
