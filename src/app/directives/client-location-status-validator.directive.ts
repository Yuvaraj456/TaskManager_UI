import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:ClientLocationStatusValidatorDirective,multi:true}]
})
export class ClientLocationStatusValidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let isValid = true;
    if(control.value.clientLocationId == 6 && control.value.status == "Support")
    {
      isValid = false; //indicate invalid
    }

    if(isValid)
    {
      return null; //indicates valid
    }
    else{
      return {clientLocationStatus:{valid:false}};
    }
  }


}
