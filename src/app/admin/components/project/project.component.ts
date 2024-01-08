import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges,OnInit, DoCheck, AfterContentInit, AfterContentChecked
,AfterViewInit,AfterViewChecked, OnDestroy{

  @Input("eachProject") project!:Project; // value comes from parent component
  @Input("itemIndex") index!:number;

  @Output()  editClick = new EventEmitter<any>(); //event sent to paranet compoent @('Alias Name') not provided here if we want we can use 
  @Output()  deleteClick = new EventEmitter<any>();

  @ContentChild('selectBox') selectionBox!:CheckBoxPrinterComponent; //invokes grand child component

  hideDetails:boolean=false;

  mySubscription!:Subscription;

constructor(public projectsService:ProjectsService){

}
  ngAfterViewChecked(): void {
    console.info("................ngAfterViewChecked")
  }
  ngAfterViewInit(): void {
    console.info("................ngAfterViewInit")
  }
  ngAfterContentChecked(): void {
    console.info("................ngAfterContentChecked")
  }
  ngAfterContentInit(): void {
    console.info("................ngAfterContentInit")
    console.log(this.selectionBox)
  }
  ngDoCheck(): void {
    console.info("................DoCheck")
  }
  ngOnInit() {
    console.info("-------------------ngOnInit called");
    this.mySubscription=
    this.projectsService.mySubject.subscribe((hide)=>{
      this.hideDetails = hide;
    });
  }


  onEditClick(event:any,index:number)
  {
    this.editClick.emit({event,index})
  }

  onDeleteClick(event:any,index:number)
  {
    this.deleteClick.emit({event,index})
  }


  isAllCheckedChange(b:boolean)
  {
    
    if(b)
    {
      this.selectionBox.check();
    }
    else{
 
      this.selectionBox.unCheck();
    }
    

  }

  ngOnChanges(simpleChanges:SimpleChanges)
  {
    console.info("-------------------ngonChanges called");

    for(let propName in simpleChanges)
    {
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue=${cur},previousValue=${prev}`);

    }
    
    // if(simpleChanges['project'])
    // {
    //   this.project.teamSize! += 1;
    // }
  }

 ngOnDestroy()
 {
  console.info("-------------------ngOnDestroy called");

  this.mySubscription.unsubscribe();
 }

}
