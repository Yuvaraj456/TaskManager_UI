import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus } from '../models/task-status';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor(private httpClient:HttpClient) { }

  getAllTaskStatus():Observable<TaskStatus[]>
  {
    return this.httpClient.get<TaskStatus[]>(`https://localhost:7015/api/TaskStatus/GetTaskStatus`,{responseType:"json"});
  }

  getTaskStatusById(taskStatusId:number):Observable<TaskStatus>
  {
    return this.httpClient.get<TaskStatus>(`https://localhost:7015/api/TaskStatus/GetByTaskStatusId/${taskStatusId}`,{responseType:"json"});
  }

  addTaskStatus(taskStatus:TaskStatus):Observable<TaskStatus>
  {
    return this.httpClient.post<TaskStatus>(`https://localhost:7015/api/TaskStatus/AddTaskStatus`,taskStatus,{responseType:"json"});
  }

  updateTaskStatus(taskStatus:TaskStatus):Observable<TaskStatus>
  {
    return this.httpClient.put<TaskStatus>(`https://localhost:7015/api/TaskStatus/UpdateTaskStatus`,taskStatus,{responseType:"json"});
  }

  deleteTaskStatus(taskStatusId:number|null):Observable<string>
  {
    return this.httpClient.delete<string>(`https://localhost:7015/api/TaskStatus/DeleteTaskStatus/${taskStatusId}`,{responseType:"json"});
  }

}
