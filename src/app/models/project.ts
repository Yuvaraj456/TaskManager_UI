import { ClientLocation } from "./client-location";

export class Project {

    projectId:number | null =null;
    projectName:string | null=null;
    dateOfStart:Date|null=null;
    teamSize:number|null=null;
    active:boolean|null=null;
    status:string|null=null;
    clientLocationId:number|null=null;
    clientLocation:ClientLocation|null=null;
    
}
