import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/directives/component-loader.directive';
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocation } from 'src/app/models/client-location';
import { TaskComponent } from 'src/app/Employee/components/task/task.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

masterMenuItems:any[] = [
  {itemName:'Countries',displayName:'Countries',component:CountriesComponent},
  {itemName:'ClientLocations',displayName:'Client Locations',component:ClientLocationsComponent},
  {itemName:'TaskPriorities',displayName:'Task Priorities',component:TaskPrioritiesComponent},
  {itemName:'TaskStatus',displayName:'Task Status',component:TaskStatusComponent}
];

activeItem!:string;
tabs:any[]=[];
@ViewChildren(ComponentLoaderDirective) componentLoader!:QueryList<ComponentLoaderDirective>;

  constructor(private componentFactoryResolver:ComponentFactoryResolver) {

    
  }

  ngOnInit(): void {
    
  }

  menuItemClick(menuItem:any)
  {

    this.activeItem= menuItem.itemName;
    if(!this.tabs.find(x=>x.itemName == menuItem.itemName))
    {
      this.tabs.push(
        {
          tabIndex:this.tabs.length,
          itemName:menuItem.itemName,
          displayName:menuItem.displayName
        }
      );

      setTimeout(()=>{
    
        let componentLoadersArray=this.componentLoader.toArray();
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(menuItem.component);
        let viewContainer = componentLoadersArray[this.tabs.length-1].viewContainerRef;
        let componentRef =  viewContainer.createComponent(componentFactory);

        this.tabs[this.tabs.length-1].viewContainerRef = viewContainer;
        if(menuItem.component.name == "CountriesComponent")
        {
          var componentInstance = componentRef.instance as CountriesComponent;
          //componentInstance.message = "Hello to Countries";
        }
        
        console.log(componentRef);
      },100);
    }

  

        
  }

  onCloseClick(tab:any)
  {
    console.log(tab);
    tab.viewContainerRef.remove();
    this.tabs.splice(this.tabs.indexOf(tab),1);
    if(this.tabs.length > 0)
    {
      this.activeItem = this.tabs[0].itemName;
    }
  }
  
 
}
