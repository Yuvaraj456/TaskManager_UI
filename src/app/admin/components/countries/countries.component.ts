import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit{

//Sorting
sortBy:string = 'countryName';
sortOrder:string='ASC'; //ASC|DESC

//objects for holding model data
countries:Country[]=[];
showLoading:boolean = false;

//objects for delete
deleteCountry:Country = new Country();
editIndex!:number;
deleteIndex!:number;

//properties for searching
searchBy:string = "countryName";
searchText:string = "";

//Properties for paging
currentPageIndex:number=0;
pages:any[] = [];
pageSize:number =7;

//Reactive Forms
newForm!:FormGroup;
editForm!:FormGroup;

isFormSubmitted:boolean = false;

@ViewChild("defaultTextBox_New") defaultTextBox_New!:ElementRef;
@ViewChild("defaultTextBox_Edit") defaultTextBox_Edit!:ElementRef;


constructor(private countriesService:CountryService, private formBuilder:FormBuilder) {
 
}

  ngOnInit() {
    //Get All Countries from db
    this.countriesService.getCountries().subscribe({
      next:(res:Country[])=>{
        this.countries = res;
        this.showLoading = false;
        this.calculateNoOfPages();
      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    });

    //Create ReactiveFrom NewForm
    this.newForm = this.formBuilder.group({
      countryId:this.formBuilder.control(null),
      countryName:this.formBuilder.control(null,[Validators.required])
    });

    //Create ReactiveFrom EditForm
    this.editForm = this.formBuilder.group({
      countryId:this.formBuilder.control(null),
      countryName:this.formBuilder.control(null,[Validators.required])
    });

    
  }
  
  calculateNoOfPages()
  { 
    //Get no. of Pages
  let filterPipe = new FilterPipe();
  let filteredPerson = filterPipe.transform(this.countries, this.searchBy, this.searchText);
  let noOfPages = Math.ceil(filteredPerson.length/this.pageSize);

  this.pages=[];
  //Generate pages
  for(let i=0;i<noOfPages;i++)
  {
    this.pages.push({pageIndex:i});
  }

  this.currentPageIndex = 0;
}

onPageIndexClicked(ind:number)
{
  if(ind>=0 && ind<this.pages.length) 
  {
    this.currentPageIndex = ind;
  }
}

onNewClick(event:any)
{
    //reset the newForm
    this.newForm.reset({countryId:0});
    setTimeout(()=>{
      //focus the ClientLocation textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    },100);
}

onEditClick(event:any,country:Country)
{   
  //reset the editform
  this.editForm.reset;

  setTimeout(()=>
  {
    //set data into editForm
  this.editForm.patchValue(country);
  this.editIndex = this.countries.indexOf(country);

  //focus the ClientLocation textbox in editForm
  this.defaultTextBox_Edit.nativeElement.focus();

  },100)
  

}

onSaveClick()
{
  this.isFormSubmitted = true;
  if(this.newForm.valid)
  {
    //Invoke the REST-API call
    this.countriesService.addCountry(this.newForm.value).subscribe({
      next:(response:Country)=>{
        let country:Country = new Country();
        country.countryId = response.countryId;
        country.countryName = response.countryName;        
        this.countries.push(country);
      
        //Reset the newForm
        this.newForm.reset();
        $('#newCountryFormCancel').trigger('click');
        this.calculateNoOfPages()
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }
}

onUpdateClick()
{
  if(this.editForm.valid)
  {
    //invoke the REST-API call
    this.countriesService.updateCountry(this.editForm.value).subscribe({
      next:(response:Country)=>{

        let country:Country = new Country();
        country.countryId = response.countryId;
        country.countryName = response.countryName;
        
        //update the response in grid
        this.countries[this.editIndex] = country;

        //reset the editform
        this.editForm.reset();
        $('#editCountryFormCancel').trigger('click');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}


onDeleteClick(event:any,country:Country)
{
  //set data into delete country
  this.deleteCountry.countryId = country.countryId;
  this.deleteCountry.countryName = country.countryName;
  this.deleteIndex = this.countries.indexOf(country);
}

onDeleteConfirmClick()
{
  //Invoke the REST-API call
  this.countriesService.deleteCountry(this.deleteCountry.countryId).subscribe({
    next:(response:boolean)=>{
      if(response)
      {
        this.countries.splice(this.deleteIndex,1);

        //clear delete country object
        this.deleteCountry.countryId = null;
        this.deleteCountry.countryName = null;

        this.calculateNoOfPages();
      }
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

onSearchTextChange(event:any)
{
  //recell the calculateNoOfPages, due to text change
  this.calculateNoOfPages();
}

}
