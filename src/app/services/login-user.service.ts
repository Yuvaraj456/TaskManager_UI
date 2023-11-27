import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService implements OnInit {

  userSubject:BehaviorSubject<any>;

  constructor(private jwtHelperService:JwtHelperService) {
    this.userSubject = new BehaviorSubject<any>(null);    
   }

   onUserChange()
   {
    debugger;
    if(!this.jwtHelperService.isTokenExpired())
    {
      this.userSubject.next(sessionStorage.getItem('currentUserName'));
    }
    
   }

  ngOnInit(): void {
    
  }

  

}
