import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Project[], searchBy:string, searchString:string): any {
    
    if(value==null)
    return null;

    let resultArray:Project[]=[];
    
    for(let item of value)
    {
      debugger;
      if(String(item[searchBy as keyof Project]).toLowerCase().indexOf(searchString.toLowerCase())>=0)
      {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
