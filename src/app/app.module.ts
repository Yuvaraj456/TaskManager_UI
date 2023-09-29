import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [ //all component which is belongs to the current module
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule //child module
  ],
  providers: [],//for service import
  bootstrap: [AppComponent] //only root module only contain bootstrap
})
export class AppModule { } //root Module or parent module
