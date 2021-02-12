//model for the seeker
export interface Seeker{
    seeker: {
        location: {
            type: string,
            coordinates: [
            ]
        },
        category:string,
        aadharNumber: string,
        age: Number,
        experience: Number,
        _id: string,
        name: string,
        email: string,
        phone: string,
        gender: string,
        skills: string,
        pincode: string,
        address: string,
        createdAt: string,
        updatedAt: string
        
    },
    token: string
}