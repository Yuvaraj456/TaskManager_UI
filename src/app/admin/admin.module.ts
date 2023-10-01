import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsService } from '../services/projects.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent
  ],
  imports: [ //all imports are Module
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[ //all exports are component
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent
  ],
  providers:[DashboardService, ProjectsService, DatePipe]//for service import
})
export class AdminModule { }
