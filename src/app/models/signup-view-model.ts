export class SignupViewModel {

    personName:any;
    email:string|null;
    mobile:string|null;
    dateOfBirth:string|null;
    password:string|null;
    gender:string|null;
    countryId:number|null;
    receiveNewsLetters:boolean;
    skills:any;


    constructor(personName:any=null,email:string|null=null,mobile:string|null,
        dateOfBirth:string|null,password:string|null,gender:string|null,
        countryId:number|null,receiveNewsLetters:boolean,skills:any) {
       this.personName = personName;
       this.email = email;
       this.mobile = mobile;
       this.dateOfBirth = dateOfBirth;
       this.password = password;
       this.gender = gender;
       this.countryId = countryId;
       this.receiveNewsLetters = receiveNewsLetters;
       this.skills = skills;
    }

}
