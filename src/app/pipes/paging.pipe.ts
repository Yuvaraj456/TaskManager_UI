import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value: Project[], currentPageIndex:number,pageSize:number): any {

    if(value == null)
    return null;

    let resultArray:Project[]=[];

    for(let i=currentPageIndex*pageSize;i<(currentPageIndex+1)*pageSize;i++)
    {    
      if(value[i])
      {
        
        resultArray.push(value[i]); 
      }
      
    }

    return resultArray;
  }



}
