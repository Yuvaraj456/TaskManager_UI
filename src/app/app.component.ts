import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "hello"
  //myProperty = this.domSanitizer.bypassSecurityTrustHtml("");
  //myProperty = this.domSanitizer.bypassSecurityTrustUrl("https://google.com");
  constructor(public loginService:LoginService, private domSanitizer:DomSanitizer){


  }
  

}
