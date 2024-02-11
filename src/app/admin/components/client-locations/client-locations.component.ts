import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ClientLocationService } from 'src/app/services/client-location.service';

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss']
})
export class ClientLocationsComponent implements OnInit{
 
//Sorting
sortBy:string = 'clientLocationName';
sortOrder:string='ASC'; //ASC|DESC

//objects for holding model data
clientLocations:ClientLocation[]=[];
showLoading:boolean = false;

//objects for delete
deleteClientLocation:ClientLocation = new ClientLocation();
editIndex!:number;
deleteIndex!:number;

//properties for searching
searchBy:string = "clientLocationName";
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


constructor(private clientLocationService:ClientLocationService, private formBuilder:FormBuilder) {
 
}

  ngOnInit() {
    //Get All Countries from db
    this.clientLocationService.getClientLocations().subscribe({
      next:(res:ClientLocation[])=>{
        this.clientLocations = res;
        this.showLoading = false;
        this.calculateNoOfPages();
      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    });

    //Create ReactiveFrom NewForm
    this.newForm = this.formBuilder.group({
      clientLocationId:this.formBuilder.control(null),
      clientLocationName:this.formBuilder.control(null,[Validators.required])
    });

    //Create ReactiveFrom EditForm
    this.editForm = this.formBuilder.group({
      clientLocationId:this.formBuilder.control(null),
      clientLocationName:this.formBuilder.control(null,[Validators.required])
    });

    
  }
  
  calculateNoOfPages()
  { 
    //Get no. of Pages
  let filterPipe = new FilterPipe();
  let filteredPerson = filterPipe.transform(this.clientLocations, this.searchBy, this.searchText);
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
  //set currentPage index
  if(ind>=0 && ind<this.pages.length) 
  {
    this.currentPageIndex = ind;
  }
}

onNewClick(event:any)
{
    //reset the newForm
    this.newForm.reset({clientLocationId:0});
    setTimeout(()=>{
      //focus the ClientLocation textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    },100);
}

onEditClick(event:any,clientLocation:ClientLocation)
{   
  //reset the editform
  this.editForm.reset;

  setTimeout(()=>
  {
    //set data into editForm
  this.editForm.patchValue(clientLocation);
  this.editIndex = this.clientLocations.indexOf(clientLocation);

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
    this.clientLocationService.addClientLocation(this.newForm.value).subscribe({
      next:(response:ClientLocation)=>{
        let clientLocation:ClientLocation = new ClientLocation();
        clientLocation.clientLocationId = response.clientLocationId;
        clientLocation.clientLocationName = response.clientLocationName;        
        this.clientLocations.push(clientLocation);
      
        //Reset the newForm
        this.newForm.reset();
        $('#newClientLocationFormCancel').trigger('click');
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
    this.clientLocationService.updateClientLocation(this.editForm.value).subscribe({
      next:(response:ClientLocation)=>{

        let clientLocation:ClientLocation = new ClientLocation();
        clientLocation.clientLocationId = response.clientLocationId;
        clientLocation.clientLocationName = response.clientLocationName;
        
        //update the response in grid
        this.clientLocations[this.editIndex] = clientLocation;

        //reset the editform
        this.editForm.reset();
        $('#editClientLocationFormCancel').trigger('click');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}


onDeleteClick(event:any,country:ClientLocation)
{
  //set data into delete country
  this.deleteClientLocation.clientLocationId = country.clientLocationId;
  this.deleteClientLocation.clientLocationName = country.clientLocationName;
  this.deleteIndex = this.clientLocations.indexOf(country);
}

onDeleteConfirmClick()
{
  //Invoke the REST-API call
  this.clientLocationService.deleteClientLocation(this.deleteClientLocation.clientLocationId).subscribe({
    next:(response:string)=>{
      if(response)
      {
        this.clientLocations.splice(this.deleteIndex,1);

        //clear delete country object
        this.deleteClientLocation.clientLocationId = null;
        this.deleteClientLocation.clientLocationName = null;

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
