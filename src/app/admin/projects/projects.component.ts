import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { Project } from 'src/app/models/project';
import { ClientLocationService } from 'src/app/services/client-location.service';
import { ProjectsService } from 'src/app/services/projects.service';
import * as $ from 'jquery';
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

   projects:Project[] = [];
   newProject:Project = new Project(); 
   editProject:Project = new Project();
   editIndex:any = null;
   deleteProject:Project = new Project();
   deleteIndex:any=null;
   clientLocationObservable!:Observable<ClientLocation[]>;
   showLoading:boolean=true;

   searchBy:string = "projectId";
   searchString:string = "";

   @ViewChild("newForm") NewForm:NgForm|null=null; //created instance of NgForm 
   @ViewChild("editForm") EditForm:NgForm|null=null; 


   currentPageIndex:number = 0;
   pages:any[]=[];
   pageSize:number=3;


  constructor(private projectService:ProjectsService, private clientLocationService:ClientLocationService){

  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next:(response:Project[])=> {
        
        this.projects = response
        this.showLoading=false;
        this.calculateNoOfPages();
      },
      error:(error:any)=>{
        console.log(error);        
      }
  });
    
  this.clientLocationObservable= this.clientLocationService.getClientLocations();


  }

  calculateNoOfPages()
  { 
    let filterPipe = new FilterPipe();
    let filteredPerson = filterPipe.transform(this.projects, this.searchBy, this.searchString);
    let noOfPages = Math.ceil(filteredPerson.length/this.pageSize);

    this.pages=[];
    for(let i=0;i<noOfPages;i++)
    {
      this.pages.push({pageIndex:i});
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(pageIndex:number)
  {
    this.currentPageIndex = pageIndex;
  }

  
  @ViewChild('newprjId') newprjId!:ElementRef;
  onNewClick(event:any)
  {
    setTimeout(()=>{
      this.newprjId.nativeElement.focus();
    },100)
    
    this.NewForm?.resetForm();
  }

  onSaveClick(){
    if(this.NewForm?.valid)
    {    
    console.log(this.onSaveClick);
    //this.newProject.clientLocation.clientLocationId = null;    
    this.projectService.postProjects(this.newProject).subscribe({
      next:(response)=>{
        var p:Project = new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.active = response.active;
        p.status = response.status;
        p.clientLocationId=response.clientLocationId;
        p.clientLocation=response.clientLocation;
        this.projects.push(p);

        //Clear New Project Dialog - TextBoxes
        this.newProject.projectId = null;
        this.newProject.projectName = null;
        this.newProject.dateOfStart = null;
        this.newProject.teamSize = null;
        this.newProject.active=null;
        this.newProject.status=null;
        this.newProject.clientLocationId=null;

        $('#newFormCancel').trigger('click')
        this.calculateNoOfPages();
      },
      error:(error:any)=>{console.log(error);},
      complete:()=>{}
    }             
    );
      
  }
  }

  onEditClick(event:any){
     let editEvent = event.event;
     let index = event.index;
    this.EditForm?.resetForm();
    setTimeout(()=>{
      this.editProject.projectId = this.projects[index].projectId;
      this.editProject.projectName = this.projects[index].projectName;
      this.editProject.dateOfStart = this.projects[index].dateOfStart;
      this.editProject.teamSize = this.projects[index].teamSize;
      this.editProject.status = this.projects[index].status;
      this.editProject.active = this.projects[index].active;
      this.editProject.clientLocationId = this.projects[index].clientLocationId;
      this.editProject.clientLocation = this.projects[index].clientLocation;
      this.editIndex = index;
    },100);
   
  }

  onUpdateClick(){
    if(this.EditForm?.valid)
    {
    this.projectService.updateProjects(this.editProject).subscribe({
      next:(response:Project)=>{
        var p:Project = new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        p.active = response.active;
        p.status = response.status;
        p.clientLocation = response.clientLocation;
        p.clientLocationId = response.clientLocationId;
        this.projects[this.editIndex]=p;

        this.editProject.projectId = null;
        this.editProject.projectName = null
        this.editProject.dateOfStart = null
        this.editProject.teamSize = null;
        this.editProject.status = null;
        this.editProject.active = null;
        this.editProject.clientLocationId = null;
        $('#editFormCancel').trigger('click');
       
      },
      error:(error:any)=>{ console.log(error)},
      complete:()=>{}
    })
      
  }
  }

  onDeleteClick(event:any)
  {
    let editEvent = event.event;
     let index = event.index;

    this.deleteProject.projectId=this.projects[index].projectId;
    this.deleteProject.projectName=this.projects[index].projectName;
    this.deleteProject.dateOfStart=this.projects[index].dateOfStart;
    this.deleteProject.teamSize=this.projects[index].teamSize;
    this.deleteIndex = index;
  }

  onDeleteConfirmClick()
  {
    this.projectService.deleteProjects(this.deleteProject.projectId).subscribe({
      next:(response:string)=>{
        this.projects.splice(this.deleteIndex,1);
        
        this.deleteProject.projectId = null;
        this.deleteProject.projectName = null;
        this.deleteProject.dateOfStart = null;
        this.deleteProject.teamSize = null;

        this.calculateNoOfPages();
      },
      error:(error:any)=>{ console.log(error)},
      complete:()=>{}
    })
  }

  onSearchTextKeyup(event:any)
  {

    this.calculateNoOfPages();

  }

  onSearchClick()
  {
    console.log("on search click")
    this.projectService.searchProjects(this.searchBy,this.searchString).subscribe({
      next:(response:Project[])=>{
        this.projects = response;
        
      },
      error:(error:any)=>{ console.log(error)},
      complete:()=>{}
    })
  }

  // //@ViewChild('prj') prj!:ProjectComponent; //Sigle instance only
  // @ViewChildren('prj') prj!:QueryList<ProjectComponent>; //Multiple instances
  // onHideShowDetails(event:any)
  // {
  //   let projects = this.prj.toArray();
  //   for(let i=0; i<projects.length;i++)
  //   {
  //     projects[i].toggleDetails();
  //   }

  // }

  onHideShowDetails(event:any)
  {
    this.projectService.toggleDetails();
  }



  
  isAllChecked:boolean = false;

  @ViewChildren('prj') childComponent!:QueryList<ProjectComponent>;

  isAllCheckedChange(event:any)
  {

    let child = this.childComponent.toArray();
    for(let i=0;i<child.length;i++)
    {
      child[i].isAllCheckedChange(this.isAllChecked);
    }
  }






}
