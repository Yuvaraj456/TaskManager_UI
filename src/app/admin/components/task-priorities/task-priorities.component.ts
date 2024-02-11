import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/models/task-priority';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskPriorityService } from 'src/app/services/task-priority.service';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {

  
//Sorting
sortBy:string = 'taskPriorityName';
sortOrder:string='ASC'; //ASC|DESC

//objects for holding model data
taskPriorities:TaskPriority[]=[];
showLoading:boolean = false;

//objects for delete
deleteTaskPriority:TaskPriority = new TaskPriority();
editIndex!:number;
deleteIndex!:number;

//properties for searching
searchBy:string = "taskPriorityName";
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

  
  constructor(private taskPriorityService:TaskPriorityService, private formBuilder:FormBuilder) {
    
  }

  ngOnInit() {
    //Get All Task Priorities from db
    this.taskPriorityService.getTaskPriority().subscribe({
      next:(res:TaskPriority[])=>{
        this.taskPriorities = res;
        this.showLoading = false;
        this.calculateNoOfPages();
      },
      error:(err)=>{console.log(err)},
      complete:()=>{}
    });

    //Create ReactiveFrom NewForm
    this.newForm = this.formBuilder.group({
      taskPriorityId:this.formBuilder.control(null),
      taskPriorityName:this.formBuilder.control(null,[Validators.required])
    });

    //Create ReactiveFrom EditForm
    this.editForm = this.formBuilder.group({
      taskPriorityId:this.formBuilder.control(null),
      taskPriorityName:this.formBuilder.control(null,[Validators.required])
    });

    
  }
  
  calculateNoOfPages()
  { 
    //Get no. of Pages
  let filterPipe = new FilterPipe();
  let filteredPerson = filterPipe.transform(this.taskPriorities, this.searchBy, this.searchText);
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
    this.newForm.reset({taskPriorityId:0});
    setTimeout(()=>{
      //focus the TaskPriority textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    },100);
}

onEditClick(event:any,taskPriority:TaskPriority)
{   
  //reset the editform
  this.editForm.reset;

  setTimeout(()=>
  {
    //set data into editForm
  this.editForm.patchValue(taskPriority);
  this.editIndex = this.taskPriorities.indexOf(taskPriority);

  //focus the TaskPriority textbox in editForm
  this.defaultTextBox_Edit.nativeElement.focus();

  },100)
  

}

onSaveClick()
{
  this.isFormSubmitted = true;
  if(this.newForm.valid)
  {
    //Invoke the REST-API call
    this.taskPriorityService.addTaskPriority(this.newForm.value).subscribe({
      next:(response:TaskPriority)=>{
        let taskPriority:TaskPriority = new TaskPriority();
        taskPriority.taskPriorityId = response.taskPriorityId;
        taskPriority.taskPriorityName = response.taskPriorityName;        
        this.taskPriorities.push(taskPriority);
      
        //Reset the newForm
        this.newForm.reset();
        $('#newTaskPriorityFormCancel').trigger('click');
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
    this.taskPriorityService.updateTaskPriority(this.editForm.value).subscribe({
      next:(response:TaskPriority)=>{

        let taskPriority:TaskPriority = new TaskPriority();
        taskPriority.taskPriorityId = response.taskPriorityId;
        taskPriority.taskPriorityName = response.taskPriorityName;
        
        //update the response in grid
        this.taskPriorities[this.editIndex] = taskPriority;

        //reset the editform
        this.editForm.reset();
        $('#editTaskPriorityFormCancel').trigger('click');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}


onDeleteClick(event:any,taskPriority:TaskPriority)
{
  //set data into delete country
  this.deleteTaskPriority.taskPriorityId = taskPriority.taskPriorityId;
  this.deleteTaskPriority.taskPriorityName = taskPriority.taskPriorityName;
  this.deleteIndex = this.taskPriorities.indexOf(taskPriority);
}

onDeleteConfirmClick()
{
  //Invoke the REST-API call
  this.taskPriorityService.deleteTaskPriority(this.deleteTaskPriority.taskPriorityId).subscribe({
    next:(response:string)=>{
      if(response)
      {
        this.taskPriorities.splice(this.deleteIndex,1);

        //clear delete country object
        this.deleteTaskPriority.taskPriorityId = null;
        this.deleteTaskPriority.taskPriorityName = null;

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
