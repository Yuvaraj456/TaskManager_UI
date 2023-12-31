import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:TeamSizeValidatorDirective,multi:true}]
})
export class TeamSizeValidatorDirective implements Validator {

  constructor() { }
  @Input('appTeamSizeValidator') n:number = 0;
  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    let currentValue = control.value;
    
    let isValid = currentValue%this.n == 0;
    console.log(isValid);
    if(isValid)
    {
      return null; //valid
    }
    else
    {
      debugger;
      return {divisible:{valid:false}} //invalid
    }
    
  }


}
