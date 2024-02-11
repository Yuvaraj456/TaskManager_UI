import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  exports:[
    TaskComponent
  ]
})
export class EmployeeModule { }
