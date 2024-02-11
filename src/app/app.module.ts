import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SignupComponent } from './components/signup/signup.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterStructureDirective } from './directives/repeater-structure.directive';
import { EmployeeModule } from './Employee/employee.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './components/about/about.component';




@NgModule({
  declarations: [ //all component which is belongs to the current module
    AppComponent, LoginComponent, SignupComponent, AlertDirective, RepeaterStructureDirective,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    //AdminModule, //child module //lazy loaded that'snot needed in import of app module
    SharedModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return sessionStorage.getItem("token");
        }
       
      }
    }),
    EmployeeModule,
  BrowserAnimationsModule    
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
