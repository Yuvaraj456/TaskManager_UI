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

  getCountryById(countryId:number):Observable<Country>
  {
    return this.httpClient.get<Country>(`https://localhost:7015/api/Countries/GetByCountryId/${countryId}`,{responseType:"json"});
  }

  addCountry(country:Country):Observable<Country>
  {
    return this.httpClient.post<Country>(`https://localhost:7015/api/Countries/AddCountry`,country,{responseType:"json"});
  }

  updateCountry(country:Country):Observable<Country>
  {
    return this.httpClient.put<Country>(`https://localhost:7015/api/Countries/UpdateCountry`,country,{responseType:"json"});
  }

  deleteCountry(countryId:number|null|undefined):Observable<boolean>
  {
    return this.httpClient.delete<boolean>(`https://localhost:7015/api/Countries/DeleteCountry/${countryId}`,{responseType:"json"});
  }
}
