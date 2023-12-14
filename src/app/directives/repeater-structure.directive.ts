import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeaterStructure]'
})
export class RepeaterStructureDirective {

  constructor(private viewContainerRef:ViewContainerRef, private templateRef:TemplateRef<any>) {
    this.viewContainerRef.clear(); //clearing defaultly embedded view
   }


   ngOnInit()
   {
    for(let i=0;i<5;i++)
   {
    this.viewContainerRef.createEmbeddedView(this.templateRef,{$implicit:i});
   }
   }

}
