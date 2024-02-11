import { NgModule } from '@angular/core';
import {  DatePipe } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from '../components/about/about.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsService } from '../services/projects.service';
import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountriesComponent } from './components/countries/countries.component';
import { TaskPrioritiesComponent } from './components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { MastersComponent } from './components/masters/masters.component';
import { ClientLocationsComponent } from './components/client-locations/client-locations.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,    
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent,
    ClientLocationsComponent,
    
  ],
  imports: [ //all imports are Module
    SharedModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports:[ //all exports are component
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,  
    ProjectDetailsComponent
  ],
  providers:[DashboardService, ProjectsService, DatePipe],//for service import

})
export class AdminModule { }
