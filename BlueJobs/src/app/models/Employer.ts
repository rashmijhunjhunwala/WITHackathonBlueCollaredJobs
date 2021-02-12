//model for the employerObject

export interface Employer{
    employer:{
        _id:string;
        name:string;
        email:string;
        phone: string;
        createdAt:string;
        updatedAt:string;
    }
    token:string;
}