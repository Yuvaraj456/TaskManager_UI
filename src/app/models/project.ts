export class Project {

    projectId:number | null;
    projectName:string | null;
    dateOfStart:Date|null;
    teamSize:number|null;

    constructor()
    {
        this.projectId=null;
        this.projectName=null;
        this.dateOfStart=null;
        this.teamSize=null;
    }
}
