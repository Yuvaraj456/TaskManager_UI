import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { Project } from 'src/app/models/project';
import { ClientLocationService } from 'src/app/services/client-location.service';
import { ProjectsService } from 'src/app/services/projects.service';
import * as $ from 'jquery';
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
   clientLocation:ClientLocation[] =[];
   showLoading:boolean=true;

   searchBy:string = "ProjectId";
   searchString:string = "";

   @ViewChild("newForm") NewForm:NgForm|null=null; 
   @ViewChild("editForm") EditForm:NgForm|null=null; 


  constructor(private projectService:ProjectsService, private clientLocationService:ClientLocationService){

  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next:(response:Project[])=> {
        
        this.projects = response
        this.showLoading=false;
      },
      error:(error:any)=>{
        console.log(error);        
      }
  });
    
 this.clientLocationService.getClientLocations().subscribe({
  next:(response:ClientLocation[])=>{
    this.clientLocation = response;
  },
  error:(err)=>{console.log(err)},
  complete:()=>{},
 });


  }

  onNewClick(event:any)
  {
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
      },
      error:(error:any)=>{console.log(error);},
      complete:()=>{}
    }             
    );
      
  }
  }

  onEditClick(event:any, index:number){
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

  onDeleteClick(event:any,index:number)
  {
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
        this.deleteProject.projectName = null
        this.deleteProject.dateOfStart = null
        this.deleteProject.teamSize = null;
      },
      error:(error:any)=>{ console.log(error)},
      complete:()=>{}
    })
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

}
