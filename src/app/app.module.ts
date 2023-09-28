import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule //child module
  ],
  providers: [],
  bootstrap: [AppComponent] //only root module only contain bootstrap
})
export class AppModule { } //root Module or parent module
