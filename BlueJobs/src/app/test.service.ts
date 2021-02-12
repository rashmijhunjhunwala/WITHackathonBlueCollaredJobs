import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Employer } from './models/Employer';
import { Seeker } from './models/Seeker';
import { SeekerProfile } from './models/SeekerProfile';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private Employer: Employer=<any>{};
  private Seeker: Seeker=<any>{};
  private category: string="";
  private seekers: SeekerProfile[] = [];
  constructor(private webRequest: WebRequestService) { }

  //settor method to set the category
  setCategory(category: string)
  {
    this.category=category;
  }

  //settor and gettor for the employer object
  setEmployer(Employer: Employer)
  {
    console.log(Employer);
    this.Employer=Employer;
  }
  getEmployer()
  {
    return this.Employer;
  }

  //sending a post request to the employer login route
  loginEmployer(payload:Object)
  {
    return this.webRequest.post('employer/login', payload);
  }


  //sending a post request to the register employer route
  registerEmployer(payload:Object)
  {
    return this.webRequest.post('employer/register', payload);
  }


  //sending a post request to the logout employer route
  logOutEmployer(payload:Object)
  {
    return this.webRequest.postauth('employer/logout', payload, localStorage.getItem("EmployerToken"));
  }

  //Post request to create job route
  createJob(payload:Object, id:any)
  {
   
    return this.webRequest.postauth(`employer/${id}/createJob`,payload,localStorage.getItem("EmployerToken"));
  }

  //Get request to the employer/jobs route 
  getJobs(id:any)
  {
    return this.webRequest.getauth(`employer/${id}/jobs`,localStorage.getItem("EmployerToken"));
  }

  //getting the jobs sorted by date
  getJobsByRecentDate(id:any, param:string)
  {
    return this.webRequest.getauth(`employer/${id}/jobs/?sortBy=createdAt:desc`,localStorage.getItem("EmployerToken"));
  }

  //get request to the employerProfile
  getEmployerProfile()
  {
    return this.webRequest.getauth('employer/me', localStorage.getItem("EmployerToken"))
  }
  
  
  //settor and gettor method for the seeker object 
  setSeeker(Seeker: Seeker)
  {
    console.log(Seeker);
    this.Seeker=Seeker;
  }
  getSeeker()
  {
    return this.Seeker;
  }


  //get request to the seeker's profile
  getSeekerProfile()
  {
    return this.webRequest.getauth('seeker/me', localStorage.getItem("SeekerToken"));
    
  }

 //post request to the seeker login and register route
  loginSeeker(payload:Object)
  {
    return this.webRequest.post('seeker/login', payload);
  }
  registerSeeker(payload: Object)
  {
    return this.webRequest.post('seeker/register', payload);
  }


  //post request to the logout seeker route
  logOutSeeker(payload: Object)
  {
    return this.webRequest.postauth('seeker/logout', payload, localStorage.getItem("SeekerToken"));
  }

  //sort the jobs by creationDate
  sortJobsByRecency()
  {
    return this.webRequest.getauth(`jobs?category=${this.category}&sortBy=createdAt:desc`,localStorage.getItem("SeekerToken"));
  }

  //sort jobs by distance
  sortJobsByNearest()
  {
    console.log(this.Seeker);
    const corArr:Array<string>=this.Seeker.seeker.location.coordinates;
    const lat:string=corArr[0];
    const long:string=corArr[1];
    return this.webRequest.getauth(`jobs?category=${this.category}&latitude=${lat}&longitude=${long}`,localStorage.getItem("SeekerToken"));
  }

  //sort the jobs by wages
  sortJobsByWages()
  {
    return this.webRequest.getauth(`jobs?category=${this.category}&sortBy=salary:desc`,localStorage.getItem("SeekerToken"));
  }

  
  //settor and gettor for Seeker's Profile
  setSeekers(Seekers:SeekerProfile[]=[])
  {

    this.seekers=Seekers;
  }
  getSeekers()
  {
    return this.seekers;
  }


  //getting the nearBy candidate for a particular job
  getNearByCanditates(category: string, coordinates: Array<string>, id:string)
  {
    const corArr:Array<string>=coordinates;
    const lat:string=corArr[0];
    const long:string=corArr[1];
    return this.webRequest.getauth(`employer/${localStorage.getItem("EmployerId")}/jobs/${id}/getNearby?category=${category}&latitude=${lat}&longitude=${long}`,localStorage.getItem("EmployerToken"));
  }

  

}
