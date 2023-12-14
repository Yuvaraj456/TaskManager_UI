import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  currentUserName:any=null;

  constructor(private httpClient:HttpClient, private httpBackend:HttpBackend) {

   }

   public log(logMsg:string):Observable<any>
   {
    
    let httpHeader = new HttpHeaders();
    httpHeader.append('content-type','text/plain');
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(`https://localhost:7015/api/RouterLogger/logger`,logMsg,{headers:httpHeader});
   }

}
