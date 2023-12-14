import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './componets/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './services/jwt-un-authorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SignupComponent } from './componets/signup/signup.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterStructureDirective } from './directives/repeater-structure.directive';
import { EmployeeModule } from './Employee/employee.module';



@NgModule({
  declarations: [ //all component which is belongs to the current module
    AppComponent, LoginComponent, SignupComponent, AlertDirective, RepeaterStructureDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule, //child module
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return sessionStorage.getItem("token");
        }
       
      }
    }),
    EmployeeModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, //first execute while request, execute second while response
      useClass:JwtInterceptorService,
      multi:true //in order to create multiple object for jwt interceptor service
    },
    {
      provide:HTTP_INTERCEPTORS, //second execute while request, execute first while response
      useClass:JwtUnAuthorizedInterceptorService,
      multi:true
    }
    

    
  ],//for service import
  bootstrap: [AppComponent] //only root module only contain bootstrap
})
export class AppModule { } //root Module or parent module
