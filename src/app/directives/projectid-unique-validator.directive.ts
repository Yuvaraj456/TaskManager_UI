import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { Observable,map } from 'rxjs';
import { Project } from '../models/project';

@Directive({
  selector: '[appProjectidUniqueValidator]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:ProjectidUniqueValidatorDirective,multi:true}]

})
export class ProjectidUniqueValidatorDirective implements AsyncValidator {

  constructor(private projectService:ProjectsService) { 

  }
 
  validate(control:AbstractControl<any,any>):Observable<ValidationErrors|null>
  {
    let projectId:number = control.value;
    return this.projectService.getProjectByProjectId(projectId).pipe(map((existingProject:Project)=>{
      if(existingProject != null)
      {
        return {existingProjectId:{valid:false}}
      }
      else{
        return null;
      }

    }))

  }


}
