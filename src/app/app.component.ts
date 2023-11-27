import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginUserService } from './services/login-user.service';
import { Subscription } from 'rxjs';

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
  constructor(public loginUserService:LoginUserService, private domSanitizer:DomSanitizer, public loginService:LoginService ){    

    console.log(this.loginUser);
  }
  ngOnInit(): void {

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
