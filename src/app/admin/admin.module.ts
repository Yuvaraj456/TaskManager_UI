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
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent } from './check-box-printer/check-box-printer.component';
import { NumberToWordsPipe } from '../pipes/number-to-words.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectidUniqueValidatorDirective,
    ProjectComponent,
    CheckBoxPrinterComponent,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ProjectDetailsComponent
  ],
  imports: [ //all imports are Module
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports:[ //all exports are component
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ClientLocationStatusValidatorDirective,
    TeamSizeValidatorDirective,
    ProjectidUniqueValidatorDirective,
    ProjectDetailsComponent
  ],
  providers:[DashboardService, ProjectsService, DatePipe]//for service import
})
export class AdminModule { }
