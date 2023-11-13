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
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { ProjectidUniqueValidatorDirective } from '../directives/projectid-unique-validator.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectidUniqueValidatorDirective
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
    ProjectsComponent,
    ClientLocationStatusValidatorDirective,
    TeamSizeValidatorDirective,
    ProjectidUniqueValidatorDirective
  ],
  providers:[DashboardService, ProjectsService, DatePipe]//for service import
})
export class AdminModule { }
