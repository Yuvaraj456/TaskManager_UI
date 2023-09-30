import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  
  getTeamMembersSummary(): any[]{
    var TeamMembersSummary=[
      {Region:"East",TeamMembersCount:20,TemporarilyUnavailableMembers:5},
      {Region:"West",TeamMembersCount:15,TemporarilyUnavailableMembers:2},
      {Region:"South",TeamMembersCount:16,TemporarilyUnavailableMembers:2},
      {Region:"North",TeamMembersCount:8,TemporarilyUnavailableMembers:1}
    ];
    return TeamMembersSummary;      
  }
}
