import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root' //globally available service
})
export class ProjectsService {

  constructor( private httpClient : HttpClient ) { 

  }

  getAllProjects():Observable<Project[]>{
    
    return this.httpClient.get<Project[]>('https://localhost:7015/api/Projects/get',{responseType:"json"});
  }

  postProjects(project:Project):Observable<Project>{
    return this.httpClient.post<Project>("https://localhost:7015/api/Projects/post",project,{responseType:"json"})
  }

  updateProjects(project:Project):Observable<Project>{
    return this.httpClient.put<Project>("https://localhost:7015/api/Projects/put", project, {responseType:"json"})
  }

  deleteProjects(projectId:number):Observable<string>{
    return this.httpClient.delete<string>(`https://localhost:7015/api/Projects/delete?id=${projectId}`)
  }
}
