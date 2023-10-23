import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly BASE_URL:string ="https://localhost:7015/api/Account";
  currentUserName:string|null = null;
  constructor(private httpClient:HttpClient) {

   }

   public login(loginViewModel:LoginViewModel):Observable<any>
   {
    return this.httpClient.post<any>(`${this.BASE_URL}/authenticate`,loginViewModel,{responseType:'json'})
    .pipe(map(user=>{
      if(user){
        this.currentUserName = user.userName;        
      }      
      return user;
    }));
   }

   public logout()
   {
    this.currentUserName = null;
   }
}
