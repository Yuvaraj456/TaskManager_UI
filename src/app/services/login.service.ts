import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignupViewModel } from '../models/signup-view-model';
import { LoginUserService } from './login-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly BASE_URL:string ="https://localhost:7015/api/Account";
  


  constructor(private httpBackend:HttpBackend, private jwtHelperService:JwtHelperService, private httpClient: HttpClient) {
    


   }
  

   public login(loginViewModel:LoginViewModel):Observable<any>
   {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(`${this.BASE_URL}/authenticate`,loginViewModel,{responseType:'json'})
    .pipe(map(user=>{
      if(user){
        sessionStorage.setItem('currentUserName',user.email);        
      }      
      return user;
    }));
   }

   public logout()
   {
    sessionStorage.removeItem("token");   
    sessionStorage.removeItem('currentUserName');
   }

   public Register(signupViewModel:SignupViewModel):Observable<any>
   {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient?.post<any>(`${this.BASE_URL}/PostRegister`,signupViewModel,{responseType:'json'})
    .pipe(map(user=>{
      if(user){
        sessionStorage.setItem('currentUserName',user.email);        
      }      
      return user;
    }));;
   }

   public getUserByEmail(email:string):Observable<any>
   {
      return this.httpClient?.get<any>(`${this.BASE_URL}/GetUserByEmail/${email}`,{responseType:'json'});
   }

   public isAuthenticated() : boolean
   {

      if(this.jwtHelperService.isTokenExpired())
      {
        debugger;
        return false; //token is not valid
      }
      else{
        return true; //token is valid
      }
   }
}
