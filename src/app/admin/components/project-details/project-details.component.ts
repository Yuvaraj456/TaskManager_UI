import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit,OnDestroy{


mySubscribtion!:Subscription; 
project!:Project;


constructor(private activatedRoute:ActivatedRoute, private projectService:ProjectsService){
  this.project = new Project();//temporary initialize empty object
}
 
  ngOnInit(): void {


    this.mySubscribtion = 
    this.activatedRoute.params.subscribe((params:any)=>{
      
      //"projectid" params name must match with approute parameter name
     let pid =  params['projectid'];

     this.projectService.getProjectByProjectId(pid).subscribe(
      (project:Project)=>{
        this.project = project;
      }
     )
    });  
  }

  

  ngOnDestroy(): void {
    this.mySubscribtion.unsubscribe();
  }

}
