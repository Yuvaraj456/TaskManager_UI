import { ClientLocation } from "./client-location";

export class Project {

    projectId:number | null;
    projectName:string | null;
    dateOfStart:Date|null;
    teamSize:number|null;
    active:boolean|null;
    status:string|null;
    clientLocationId:number|null;
    clientLocation:ClientLocation;

    constructor()
    {
        this.projectId=null;
        this.projectName=null;
        this.dateOfStart=null;
        this.teamSize=null;
        this.active=null;
        this.status=null;
        this.clientLocationId=null;
        this.clientLocation=new ClientLocation();
    }
}
