import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginUserService } from './services/login-user.service';
import { Subscription } from 'rxjs';
import { RouterLoggerService } from './services/router-logger.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "hello"
  
  mySubscription!:Subscription;
  loginUser:any=null;
  //myProperty = this.domSanitizer.bypassSecurityTrustHtml("");
  //myProperty = this.domSanitizer.bypassSecurityTrustUrl("https://google.com");
  constructor(public loginUserService:LoginUserService, private domSanitizer:DomSanitizer, 
    public loginService:LoginService, private routerLoggerService:RouterLoggerService,
     private router:Router){    

    console.log(this.loginUser);
  }
  ngOnInit(): void {

    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd)
      {
        let userName = (this.loginUser)?this.loginUser:"anonymousUser";

        let logMsg = new Date().toLocaleString()+" : "+userName+" navigates to "+event.url;

        this.routerLoggerService.log(logMsg).subscribe();
      }
    });


    this.mySubscription = 
    this.loginUserService.userSubject.subscribe((user:any)=>{
      this.loginUser = user;
    });
  }
  
onLogOutClick(event:any)
{
  this.loginService.logout()
}

ngOnDestroy()
{
  this.mySubscription.unsubscribe();
}

}
