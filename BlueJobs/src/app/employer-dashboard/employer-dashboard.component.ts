import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import {Job} from '../models/jobs';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {
  public jobs: Job[] = []; 
  constructor(private router: Router,private testService: TestService) {
    this.getAllJobs(); 
   }
  
   //route to the createJob page
  createJobs() 
  {
    this.router.navigate(['employer/createJob',localStorage.getItem("EmployerId")]);
  }


  //LoggingOut the employer and removing the id and token from the localStorage
  logOutEmployer()
  {
    this.testService.logOutEmployer({}).subscribe(response => {console.log(response);
      localStorage.removeItem("EmployerToken");
      localStorage.removeItem("EmployerId");
      this.router.navigate(['/']);
    })
  }

  //Fetch all the Jobs created by the employer
  getAllJobs()
  {
    this.testService.getJobs(localStorage.getItem("EmployerId")).subscribe((result:any)=> {
      console.log(result);
      this.jobs=result;
      console.log(this.jobs);
    });
  }

  //To the sort the jobs by Recency
  sortByRecent()
  {
    this.testService.getJobsByRecentDate(localStorage.getItem("EmployerId"),"createdAt:desc").subscribe((result:any)=> {
      console.log(result);
      this.jobs=result;
      console.log(this.jobs);
    });
  }

  //A route and a request to get the nearby candidates for a particuar job
  routeNearbyCandidates(job: Job)
  {
    this.testService.getNearByCanditates(job.category,job.location.coordinates,job._id).subscribe((response:any)=>{
      this.testService.setSeekers(response);
      console.log(response);
      this.router.navigate(['employer/jobs',job._id]);
    });
    
  }

  //route to the employerProfile Page
  viewProfile()
  {
    this.router.navigate(['employer',localStorage.getItem("EmployerId")]);
  }


  ngOnInit(): void {
    this.getAllJobs();
  }

}
