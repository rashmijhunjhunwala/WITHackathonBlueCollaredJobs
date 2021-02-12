import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import {Seeker} from '../models/Seeker';
import { SeekerProfile } from '../models/SeekerProfile';

@Component({
  selector: 'app-near-by-candidates',
  templateUrl: './near-by-candidates.component.html',
  styleUrls: ['./near-by-candidates.component.css']
})
export class NearByCandidatesComponent implements OnInit {

  public Seekers:SeekerProfile[]=[];
  constructor(private router: Router,private testService: TestService) { 
    this.getAllSeekersForThisJob();
  }

  //logOut the employer and remove the token and id from the local storage
  logOutEmployer()
  {
    this.testService.logOutEmployer({}).subscribe(response => {console.log(response);
      localStorage.removeItem("EmployerToken");
      localStorage.removeItem("EmployerId");
      this.router.navigate(['/']);
    })
  }

  //get All the nearby suitable candidates for this job
  getAllSeekersForThisJob()
  {
    this.Seekers=this.testService.getSeekers();
    console.log(this.Seekers);     
  }

  //routing to the dashboard of the user  
  routerToDasboard()
  {
    this.router.navigate(['employer/dashboard',localStorage.getItem("EmployerId")]);
  }


  
  ngOnInit(): void {
    this.getAllSeekersForThisJob();
  }

}
