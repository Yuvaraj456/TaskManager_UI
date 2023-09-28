import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  Designation:string ="";
  Username:string= "";
  NoOfTeamMembers:number= 0;
  TotalCostOfAllProjects:number = 0;
  PendingTasks:number=0;
  UpcomingProjects:number=0;
  ProjectCost:number=0;
  CurrentExpenditure:number=0;
  AvailableFunds:number=0;


  Clients:string[]=[];
  Projects:string[]=[];
  Years:number[]=[];
  TeamMembersSummary:any=[];
  TeamMembers:any=[];
  Today:Date = new Date;

  constructor(private dashboardService:DashboardService){

  }
  ngOnInit(): void {
    this.Designation="Team Leader";
    this.Username = "John Smith";
    this.NoOfTeamMembers=50;
    this.TotalCostOfAllProjects=240;
    this.PendingTasks=15;
    this.UpcomingProjects=0.2;
    this.ProjectCost=3276568;
    this.CurrentExpenditure=76765;
    this.AvailableFunds=76768;    
    this.Clients=[
      "ABC INFOTECH LTD","DEF INFOTECH LTD","GHI INFOTECH LTD"
    ];

    this.Projects=[
      "Project A","Project B","Project C","Project D"
    ]

    for(let i=2019;i>=2010;i--)
    {
      this.Years.push(i);
    }

    this.TeamMembersSummary=this.dashboardService.getTeamMembersSummary();

    this.TeamMembers=[
      {
        Region:"East",Members:[
          {ID:1,Name:"Ford",Status:"Available"},
          {ID:2,Name:"Martin",Status:"Available"},
          {ID:3,Name:"Loother",Status:"Busy"},
          {ID:4,Name:"Aurther",Status:"Busy"},
        ]
      },
      {
        Region:"West",Members:[
          {ID:4,Name:"Arun",Status:"Available"},
          {ID:5,Name:"Paul",Status:"Available"},
          {ID:6,Name:"James",Status:"Busy"},
          {ID:7,Name:"Cameo",Status:"Busy"},
        ]
      },
      {
        Region:"South",Members:[
          {ID:8,Name:"Kumar",Status:"Available"},
          {ID:9,Name:"Yuvaraj",Status:"Available"},
          {ID:10,Name:"Rajesh",Status:"Busy"},
          {ID:11,Name:"Saran",Status:"Busy"},
        ]
      },
      {
        Region:"North",Members:[
          {ID:12,Name:"Madhan",Status:"Available"},
          {ID:13,Name:"Bala",Status:"Available"},
          {ID:14,Name:"Siva",Status:"Busy"},
          {ID:15,Name:"Riyas",Status:"Busy"},
        ]
      },
    ]
  }
  

  onProjectChange(event:any)
  {
    if(event.target.innerText == "Project A")
    {
      this.ProjectCost=3276568;
      this.CurrentExpenditure=76765;
      this.AvailableFunds=76768;
    }
    else if(event.target.innerText == "Project B")
    {
      this.ProjectCost=61615;
      this.CurrentExpenditure=1511;
      this.AvailableFunds=16155;
    }
    else if(event.target.innerText == "Project C")
    {
      this.ProjectCost=6165151;
      this.CurrentExpenditure=51515;
      this.AvailableFunds=51515;
    }
    else if(event.target.innerText == "Project D")
    {
      this.ProjectCost=5151511;
      this.CurrentExpenditure=5154;
      this.AvailableFunds=51514;
    }
  }

}
