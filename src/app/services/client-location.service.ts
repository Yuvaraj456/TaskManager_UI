import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {

  constructor(private httpClient:HttpClient) { 

  }

  getClientLocations():Observable<ClientLocation[]>
  {
    return this.httpClient.get<ClientLocation[]>(`https://localhost:7015/api/ClientLocation/get`,{responseType:'json'});
  }

  getClientLocationByClientLocationId(clientLocationId:number):Observable<ClientLocation>
  {
    return this.httpClient.get<ClientLocation>(`https://localhost:7015/api/ClientLocation/GetByClientLocationId/${clientLocationId}`,{responseType:'json'});
  }

  addClientLocation(clientLocation:ClientLocation):Observable<ClientLocation>
  {
    return this.httpClient.post<ClientLocation>(`https://localhost:7015/api/ClientLocation/AddClientLocation`,clientLocation,{responseType:'json'});
  }

  updateClientLocation(clientLocation:ClientLocation):Observable<ClientLocation>
  {
    return this.httpClient.put<ClientLocation>(`https://localhost:7015/api/ClientLocation/UpdateClientLocation`,clientLocation,{responseType:'json'});
  }

  deleteClientLocation(clientLocationId:number|null):Observable<string>
  {
    return this.httpClient.delete<string>(`https://localhost:7015/api/ClientLocation/DeleteClientLocation/${clientLocationId}`,{responseType:'json'});
  }






}
