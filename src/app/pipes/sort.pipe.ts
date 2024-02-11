import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortBy:string,sortOrder:string): any {
    
    if(value==null)
     {
      return null;
     }
     
     value.sort((a,b)=>{
      //less than 0 :a comes before b
      //greater than 0 :b comes before a
      //equal to 0 :a and b are left unchanged
      if(a[sortBy] && b[sortBy])
      {
        return a[sortBy].toString().toLowerCase()[0] - b[sortBy].toString().toLowerCase()[0];
        //ex:
        //a=cat ->ascii value -> 99
        //b=dog ->ascii value ->100
        //99-100 = -1 --> less than 0 -> a comes before b

        //a=elephant ->ascii value -> 101
        //b=dog ->ascii value ->100
        //101-100 = 1 --> grater than 0 -> b comes before a
      }
      else{
        return 0;
      }
        
     });

     if(sortOrder == "DESC")
     {
        value.reverse();
     }
     return value;
  }

}
