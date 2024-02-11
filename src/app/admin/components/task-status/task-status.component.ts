import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/models/task-status';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskStatusService } from 'src/app/services/task-status.service';


@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit{
  
//Sorting
sortBy:string = 'taskStatusName';
sortOrder:string='ASC'; //ASC|DESC

//objects for holding model data
taskStatus:TaskStatus[]=[];
showLoading:boolean = false;

//objects for delete
deleteTaskStatus:TaskStatus = new TaskStatus();
editIndex!:number;
deleteIndex!:number;

//properties for searching
searchBy:string = "taskStatusName";
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

  
  constructor(private taskStatusService:TaskStatusService, private formBuilder:FormBuilder) {
    
  }

  ngOnInit() {
    //Get All Task Status from db
    this.taskStatusService.getAllTaskStatus().subscribe({
      next:(res:TaskStatus[])=>{
        this.taskStatus = res;
        this.showLoading = false;
        this.calculateNoOfPages();
      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    });

    //Create ReactiveFrom NewForm
    this.newForm = this.formBuilder.group({
      taskStatusId:this.formBuilder.control(null),
      taskStatusName:this.formBuilder.control(null,[Validators.required])
    });

    //Create ReactiveFrom EditForm
    this.editForm = this.formBuilder.group({
      taskStatusId:this.formBuilder.control(null),
      taskStatusName:this.formBuilder.control(null,[Validators.required])
    });

    
  }
  
  calculateNoOfPages()
  { 
    //Get no. of Pages
  let filterPipe = new FilterPipe();
  let filteredPerson = filterPipe.transform(this.taskStatus, this.searchBy, this.searchText);
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
    this.newForm.reset({taskStatusId:0});
    setTimeout(()=>{
      //focus the TaskStatus textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    },100);
}

onEditClick(event:any,taskStatus:TaskStatus)
{   
  //reset the editform
  this.editForm.reset;

  setTimeout(()=>
  {
    //set data into editForm
  this.editForm.patchValue(taskStatus);
  this.editIndex = this.taskStatus.indexOf(taskStatus);

  //focus the TaskStatus textbox in editForm
  this.defaultTextBox_Edit.nativeElement.focus();

  },100)
  

}

onSaveClick()
{
  this.isFormSubmitted = true;
  if(this.newForm.valid)
  {
    //Invoke the REST-API call
    this.taskStatusService.addTaskStatus(this.newForm.value).subscribe({
      next:(response:TaskStatus)=>{
        let taskStatus:TaskStatus = new TaskStatus();
        taskStatus.taskStatusId = response.taskStatusId;
        taskStatus.taskStatusName = response.taskStatusName;        
        this.taskStatus.push(taskStatus);
      
        //Reset the newForm
        this.newForm.reset();
        $('#newTaskStatusFormCancel').trigger('click');
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
    this.taskStatusService.updateTaskStatus(this.editForm.value).subscribe({
      next:(response:TaskStatus)=>{

        let taskStatus:TaskStatus = new TaskStatus();
        taskStatus.taskStatusId = response.taskStatusId;
        taskStatus.taskStatusName = response.taskStatusName;
        
        //update the response in grid
        this.taskStatus[this.editIndex] = taskStatus;

        //reset the editform
        this.editForm.reset();
        $('#editTaskStatusFormCancel').trigger('click');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}


onDeleteClick(event:any,taskStatus:TaskStatus)
{
  //set data into delete country
  this.deleteTaskStatus.taskStatusId = taskStatus.taskStatusId;
  this.deleteTaskStatus.taskStatusName = taskStatus.taskStatusName;
  this.deleteIndex = this.taskStatus.indexOf(taskStatus);
}

onDeleteConfirmClick()
{
  //Invoke the REST-API call
  this.taskStatusService.deleteTaskStatus(this.deleteTaskStatus.taskStatusId).subscribe({
    next:(response:string)=>{
      if(response)
      {
        this.taskStatus.splice(this.deleteIndex,1);

        //clear delete country object
        this.deleteTaskStatus.taskStatusId = null;
        this.deleteTaskStatus.taskStatusName = null;

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
