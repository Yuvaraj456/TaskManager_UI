import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { LoginUserService } from './login-user.service';

@Injectable({
  providedIn: 'root'
})
export default class AllowAnonymousService implements CanActivate {

  constructor(private loginUserService:LoginUserService) { }

  canActivate(route:ActivatedRouteSnapshot): boolean {
    this.loginUserService.onUserChange();
    return true;
}

}