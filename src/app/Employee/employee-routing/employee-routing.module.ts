import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateGuardService } from 'src/app/services/can-activate-guard.service';
import { TaskComponent } from '../task/task.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:"employee",canActivate:[CanActivateGuardService],data:{expectedRole:["Admin","Employee"]},children:[
    {path:"tasks",component:TaskComponent}
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
