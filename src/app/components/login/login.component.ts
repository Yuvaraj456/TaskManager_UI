import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginUserService } from '../../services/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
    loginViewModel:LoginViewModel = new LoginViewModel();
    loginError!:string;
    @ViewChild("loginId") loginId!:ElementRef;


  constructor(private loginService:LoginService,private router:Router){

  }
  
  ngOnInit(): void {

    this.loginId.nativeElement.focus();    
  }

  onLoginClick(event:any){
    console.log(this.loginViewModel);
    this.loginService.login(this.loginViewModel).subscribe({
      next:(response:any)=>{        
        sessionStorage.setItem("token",response.token);
        this.router.navigate(['/admin','dashboard']);

      },
      error:(err)=>{
        console.log(err);
        this.loginError = "Invalid UserName or Password"
      },
      complete:()=>{}


    });
  }



}
