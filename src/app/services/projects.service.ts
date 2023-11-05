import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root' //globally available service
})
export class ProjectsService {

  constructor( private httpClient : HttpClient, private datePipe:DatePipe ) { 

  }

  getAllProjects():Observable<Project[]>{ 
    // var header = new HttpHeaders();    
    // if(sessionStorage["token"] != null)
    // {
    //   header = header.append("Authorization","Bearer "+sessionStorage.getItem("token"));   
    // }
    return this.httpClient.get<Project[]>('https://localhost:7015/api/Projects/get',{ responseType:"json"},) //headers:header,
    .pipe(map((data:Project[]) => {
      // for(let i=0; i< data.length; i++)
      // {
      //   data[i].dateOfStart = (this.datePipe.transform(data[i].dateOfStart, "dd-MM-yyyy"));
      // }
      return data;
      }));
  }

  postProjects(project:Project):Observable<Project>{
    // let header = new HttpHeaders();
    // if(sessionStorage.getItem("token") != null)
    // {
    //   header = header.append("Authorization","Bearer "+sessionStorage.getItem("token"));   
    // }
    return this.httpClient.post<Project>("https://localhost:7015/api/Projects/post",project,{responseType:"json"})
  }

  updateProjects(project:Project):Observable<Project>{
    // let header = new HttpHeaders();
    // if(sessionStorage.getItem("token") != null)
    // {
    //   header = header.append("Authorization","Bearer "+sessionStorage.getItem("token"));   
    // }
    return this.httpClient.put<Project>("https://localhost:7015/api/Projects/put", project, {responseType:"json"})
  }

  deleteProjects(projectId:number | null):Observable<string>{
    // let header = new HttpHeaders();
    // if(sessionStorage.getItem("token") != null)
    // {
    //   header = header.append("Authorization","Bearer "+sessionStorage.getItem("token"));   
    // }
    return this.httpClient.delete<string>(`https://localhost:7015/api/Projects/delete?id=${projectId}`)
  }
  searchProjects(searchBy:string,searchSring:string):Observable<Project[]>{
    // let header = new HttpHeaders();
    // if(sessionStorage.getItem("token") != null)
    // {
    //   header = header.append("Authorization","Bearer "+sessionStorage.getItem("token"));   
    // }
    return this.httpClient.get<Project[]>(`https://localhost:7015/api/Projects/search/${searchBy}/${searchSring}`,{responseType:"json"})
  }
}