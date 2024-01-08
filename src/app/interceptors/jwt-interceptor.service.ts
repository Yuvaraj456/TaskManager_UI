import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var header;    
    if(sessionStorage["token"] != null)
    {
      header = sessionStorage["token"];   
    }
    request = request.clone({
      setHeaders:{
        Authorization:"Bearer "+header,
      }
    });

    return next.handle(request);

  }
}
