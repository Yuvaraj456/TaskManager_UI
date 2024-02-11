import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';


@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchBy:string, searchString:string): any {
    
    if(value==null)
    return null;

    let resultArray:any[]=[];
    
    for(let item of value)
    {      
      if(String(item[searchBy as keyof Project]).toLowerCase().indexOf(searchString.toLowerCase())>=0)
      {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
