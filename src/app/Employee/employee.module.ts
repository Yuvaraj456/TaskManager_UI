import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ],
  exports:[
    TaskComponent
  ]
})
export class EmployeeModule { }
