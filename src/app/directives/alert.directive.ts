import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective implements OnInit{

  constructor(private elementRef:ElementRef, private renderer2:Renderer2) {
    
   }

   @Input('error') error!:string;
   @HostBinding('title') title!:string; 

   divElement:any;
   spanElement:any;
   spanText:any;

   ngOnInit():void
   {
    //Div tag
    this.divElement = this.renderer2.createElement('div'); //<div></div>
    this.renderer2.setAttribute(this.divElement,'role','alert'); //<div role='alert'></div>
    this.renderer2.setAttribute(this.divElement,'class','alert alert-danger fade show');//<div role='alert' class='alert alert-danger fade show'></div>
    this.renderer2.setStyle(this.divElement,'transition','transform 0.5s')//<div role='alert' style='transform 0.5s' class='alert alert-danger fade show'></div>
    
    //Span tag
    this.spanElement = this.renderer2.createElement('span');//<span></span>
    this.renderer2.setAttribute(this.spanElement,'class','message');//<span class='message'></span>
    
    //Spantest tag
    this.spanText = this.renderer2.createText(this.error);
    this.renderer2.appendChild(this.spanElement,this.spanText);//<span>${this.error}</span> 
    
    this.renderer2.appendChild(this.divElement,this.spanElement); //span -> Div

    this.elementRef.nativeElement.appendChild(this.divElement) //div -> Directive Element
      this.title = "Please try Again"
   }

   @HostListener('mouseenter',['$event'])
   onMouseEnter(event:any)
   {
    //this.elementRef.nativeElement.querySelector('.alert').style.transform = "scale(1.1)";
    this.renderer2.setStyle(this.divElement,'transform','scale(1.1)');
   }

   @HostListener('mouseleave',['$event'])
   onMouseLeave(event:any)
   {
    //this.elementRef.nativeElement.querySelector('.alert').style.transform = "scale(1)";
    this.renderer2.setStyle(this.divElement,'transform','scale(1)');
  }

}
