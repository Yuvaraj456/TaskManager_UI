import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginViewModel } from '../models/login-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
    loginViewModel:LoginViewModel = new LoginViewModel();
    loginError:string|null=null;


  constructor(private loginService:LoginService,private router:Router){

  }
  
  ngOnInit(): void {
    
  }

  onLoginClick(event:any){
    console.log(this.loginViewModel);
    this.loginService.login(this.loginViewModel).subscribe({
      next:(response:any)=>{
        
        this.router.navigateByUrl("/dashboard");
      },
      error:(err)=>{
        console.log(err);
        this.loginError = "Invalid UserName or Password"
      },
      complete:()=>{}


    });
  }

}
