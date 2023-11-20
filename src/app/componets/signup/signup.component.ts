import { Component, OnInit, booleanAttribute } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { LoginViewModel } from 'src/app/models/login-view-model';
import { SignupViewModel } from 'src/app/models/signup-view-model';
import { CountryService } from 'src/app/services/country.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm!:FormGroup;
  genders:string[]=['Male','Female'];
  countries:Country[]=[];
  isSignUpFormSubmitted:boolean = false;
  registerError:string="";
  constructor(private countryService:CountryService, private formBuilder:FormBuilder, 
    private customValidator:CustomValidatorsService, private loginService:LoginService,
    private router:Router){

  }

  ngOnInit(): void {

    this.countryService.getCountries().subscribe({
      next:(response:Country[])=>{
        this.countries = response;
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{}
      
    });
    this.signUpForm = this.formBuilder.group({
      //Nested formGroup
      personName:this.formBuilder.group({
        firstName: this.formBuilder.control(null,[Validators.required,Validators.minLength(2)]),
        lastName:this.formBuilder.control(null,[Validators.required,Validators.minLength(2)]),
      }),      
      email:this.formBuilder.control(null,{validators:[Validators.required,Validators.email],asyncValidators:[this.customValidator.duplicateValidatorService()],updateOn:'blur'}),
      mobile:this.formBuilder.control(null,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      dateOfBirth:this.formBuilder.control(null,[Validators.required, this.customValidator.minimumAgeValidator(18)]),
      gender:this.formBuilder.control(null,[Validators.required]),
      countryId:this.formBuilder.control(null,[Validators.required]), 
      receivesNewsLetter:this.formBuilder.control(false),
      password:this.formBuilder.control(null,[Validators.required]),
      confirmPassword:this.formBuilder.control(null,[Validators.required]),
      skills:this.formBuilder.array([
  
      ])    
    },{
      validators:[ //form level validations
        this.customValidator.compareValidator("confirmPassword","password")
      ]
    }
    );

    this.signUpForm.valueChanges.subscribe((value:any)=>
    {
      //console.log(value);
    });
  }

  get skillFormArray(){
    return this.signUpForm.get('skills') as FormArray;
  }

  get signUp_firstNameControl(){
    return this.signUpForm.get('personName.firstName');
  }

  get signUp_lastNameControl(){
    return this.signUpForm.get('personName.lastName');
  }

  get signUp_emailControl(){
    return this.signUpForm.controls['email']; 
  }

  get signUp_mobileControl(){
    return this.signUpForm.controls['mobile']; 
  }

  get signUp_dateOfBirthControl(){
    return this.signUpForm.controls['dateOfBirth']; 
  }

  get signUp_genderControl(){
    return this.signUpForm.controls['gender']; 
  }

  get signUp_countryIdControl(){
    return this.signUpForm.controls['countryId']; 
  }

  get signUp_passwordControl(){
    return this.signUpForm.controls['password']; 
  }

  get signUp_confirmPasswordControl(){
    return this.signUpForm.controls['confirmPassword']; 
  }


  onSubmitClick()
  {
    this.isSignUpFormSubmitted = true;
    
    if(this.signUpForm.valid)
    {
      let signupViewModel = this.signUpForm.value as SignupViewModel;

      this.loginService.Register(signupViewModel).subscribe({
        next:(response:any)=>{
          sessionStorage.setItem("token",response.token); 
          this.router.navigateByUrl('/tasks');
        },
        error:(err:any)=>{
          console.log(err);
          this.registerError = "Unable to submit";
        },
        complete:()=>{}
      });
    }

  } 
  
  onAddSkill(){
    
    let formGroup = this.formBuilder.group({
      skillName:this.formBuilder.control(null,[Validators.required]),
       skillLevel:this.formBuilder.control(null,[Validators.required])
    });

    (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }

  onRemoveClick(i:number){

    (<FormArray>this.signUpForm.get('skills')).removeAt(i);
  }



}
