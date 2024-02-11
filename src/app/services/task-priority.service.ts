import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskPriority } from '../models/task-priority';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

  constructor(private httpClient:HttpClient) { }

  getTaskPriority():Observable<TaskPriority[]>
  {
    return this.httpClient.get<TaskPriority[]>(`https://localhost:7015/api/TaskPriorities/GetTaskPriorities`,{responseType:"json"});
  }

  getTaskPriorityById(taskPriorityId:number):Observable<TaskPriority>
  {
    return this.httpClient.get<TaskPriority>(`https://localhost:7015/api/TaskPriorities/GetByTaskPriorityId/${taskPriorityId}`,{responseType:"json"});
  }

  addTaskPriority(taskPriority:TaskPriority):Observable<TaskPriority>
  {
    return this.httpClient.post<TaskPriority>(`https://localhost:7015/api/TaskPriorities/AddTaskPriority`,taskPriority,{responseType:"json"});
  }

  updateTaskPriority(taskPriority:TaskPriority):Observable<TaskPriority>
  {
    return this.httpClient.put<TaskPriority>(`https://localhost:7015/api/TaskPriorities/UpdateTaskPriority`,taskPriority,{responseType:"json"});
  }

  deleteTaskPriority(taskPriorityId:number|null):Observable<string>
  {
    return this.httpClient.delete<string>(`https://localhost:7015/api/TaskPriorities/DeleteTaskPriority/${taskPriorityId}`,{responseType:"json"});
  }

}
