import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { TaskComponent } from '../components/task/task.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:"employee",canActivate:[CanActivateGuardService],data:{expectedRole:["Admin","Employee"]},children:[
    {path:"tasks",component:TaskComponent, data:{linkIndex:1}}
  ]}
  
  
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
