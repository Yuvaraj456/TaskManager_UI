import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtUnAuthorizedInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      (event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse)
        {
          //do some with response
        }
      },
      (error:any)=>{
        if(error instanceof HttpErrorResponse)
        {
          if(error.status == 401)
          {
            console.log(error);
            alert("401 UnAuthorized");
          }
          else if(error.status == 500)
          {
            console.log(error);
            alert("500 Internal Server Error");
          }
        }
      }
    ));
  }
}
