import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient:HttpClient) { }

  getCountries():Observable<Country[]>
  {
    return this.httpClient.get<Country[]>(`https://localhost:7015/api/Countries/GetCountries`,{responseType:"json"});
  }
}
