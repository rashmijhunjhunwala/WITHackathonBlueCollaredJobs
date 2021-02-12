
//model for the JobObject
export interface Job{
    _id:string;
    location:{
        coordinates:[]
    }
    headLine:string,
    category:string,
    skillsRequired:string,
    salary: number,
    pincode: number,
    address: string,
    owner:string,
    createdAt: string,
    updatedAt: string
}