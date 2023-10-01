import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

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

   searchBy:string = "ProjectId";
   searchString:string = "";

  constructor(private projectService:ProjectsService){

  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (response:Project[])=> {this.projects = response}

    );
    
    

  }

  onSaveClick(){
    console.log("click event fired");
    this.projectService.postProjects(this.newProject).subscribe({
      next:(response)=>{
        var p:Project = new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        this.projects.push(p);

        //Clear New Project Dialog - TextBoxes
        this.newProject.projectId = null;
        this.newProject.projectName = "";
        this.newProject.dateOfStart = "";
        this.newProject.teamSize = null;

      },
      error:(error:any)=>{console.log(error);},
      complete:()=>{}
    }             
    );
  }

  onEditClick(event:any, index:number){
    this.editProject.projectId = this.projects[index].projectId;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editIndex = index;
  }

  onUpdateClick(){
    console.log("onUpdateClick")
    this.projectService.updateProjects(this.editProject).subscribe({
      next:(response:Project)=>{
        var p:Project = new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.dateOfStart = response.dateOfStart;
        p.teamSize = response.teamSize;
        this.projects[this.editIndex]=p;

        this.editProject.projectId = null;
        this.editProject.projectName = null
        this.editProject.dateOfStart = null
        this.editProject.teamSize = null;

      },
      error:(error:any)=>{ console.log(error)},
      complete:()=>{}
    })

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
