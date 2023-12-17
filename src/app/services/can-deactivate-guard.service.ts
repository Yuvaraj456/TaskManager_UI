import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivated
{
  canLeave:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivated> {

  constructor() { }
  canDeactivate(component: CanComponentDeactivated, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    debugger;
    if(component.canLeave == true)
    {
      return true;//user can leave the current route
    }
    else{
      return confirm("Do you want to discard changes?");
    }
  }
}
