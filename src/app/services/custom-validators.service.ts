import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor(private loginService:LoginService) { }

  public minimumAgeValidator(minAge:number):ValidatorFn
  {
    return (control:AbstractControl):ValidationErrors|null=>{
      if(!control.value)
      {
        return null;
      }
       
      let today = new Date();

      let dateOfBirth = new Date(control.value);
      let diffMilliSeconds = Math.abs(today.getTime()-dateOfBirth.getTime());
      console.log()
      let diffYears = (diffMilliSeconds/(1000*60*60*24))/365.25;
      console.log(diffYears)
      if(diffYears >= 18)
      {
        return null;        
      }
      else
      {
        return {minAge:{valid:false}}
      }
    }
  }

  public compareValidator(controlToValidate:string,controlToCompare:string):ValidatorFn
  {
    return(formGroup:AbstractControl):ValidationErrors|null =>{

      if(!formGroup.get(controlToValidate)?.value)
      return null; //return, if confirm password is null

      if(formGroup.get(controlToValidate)?.value == formGroup.get(controlToCompare)?.value)
      {
        return null; //valid
      }
      else{
        formGroup.get(controlToValidate)?.setErrors({
          compareValidator:{valid:false} //when doing form level validation then we need to do like 
                                          //this for text box highlingting red
        });
        return {compareValidator:{valid:false}}; //invalid
      }
    }
  }

  public duplicateValidatorService():AsyncValidatorFn
  {
    return (control:AbstractControl) : Observable<ValidationErrors|null>=> 
   {
    console.log(control.value);
      return this.loginService.getUserByEmail(control.value).pipe(map((response:any)=>
      {
        if(response != null){
          control.setErrors({uniqueEmail:{valid:false}}); //here this is optional because of this is control level validation.  
          return {uniqueEmail:{valid:false}}; //invalid
        }
        else{
          return null;//valid
        }
      }));

    };
  }
}
