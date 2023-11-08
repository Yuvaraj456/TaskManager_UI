import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly BASE_URL:string ="https://localhost:7015/api/Account";
  currentUserName:string|null = null;
  private httpClient: HttpClient|null = null;
  constructor(private httpBackend:HttpBackend, private jwtHelperService:JwtHelperService) {
     
   }

   public login(loginViewModel:LoginViewModel):Observable<any>
   {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(`${this.BASE_URL}/authenticate`,loginViewModel,{responseType:'json'})
    .pipe(map(user=>{
      if(user){
        this.currentUserName = user.email;        
      }      
      return user;
    }));
   }

   public logout()
   {
    sessionStorage.removeItem("token");   
    this.currentUserName = null;
   }

   public isAuthenticated() : boolean
   {

      if(this.jwtHelperService.isTokenExpired())
      {
        return false; //token is not valid
      }
      else{
        return true; //token is valid
      }
   }
}
