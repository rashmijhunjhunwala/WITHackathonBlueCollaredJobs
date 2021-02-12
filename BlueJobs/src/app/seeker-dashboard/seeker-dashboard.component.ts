import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';
import { Job } from '../models/jobs';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent implements OnInit {

  public jobs: Job[] = [];
  constructor(private testService:TestService,private router: Router) { }

  
  //routin to the profile page of the seeker
  routeToProfile()
  {
    this.router.navigate(['seeker',localStorage.getItem("SeekerId")])
  }

  //logOut the seeker and removing the token and the id from the localStorage
  logOutSeeker()
  {
    this.testService.logOutSeeker({}).subscribe(response => {console.log(response);
      localStorage.removeItem("SeekerToken");
      localStorage.removeItem("SeekerId");
      this.router.navigate(['/']);
    })
  }

  //sort by thr recent posted jobs
  sortByRecent()
  {
    this.testService.sortJobsByRecency().subscribe((result:any)=> {
      console.log(result);
      this.jobs=result;
      console.log(this.jobs);
    });
  }

  //sort by nearest jobs
  sortByDistance()
  {
    this.testService.sortJobsByNearest().subscribe((result:any)=> {
      console.log(result);
      this.jobs=result;
      console.log(this.jobs);
    });
  }


  //sorting according to the salary
  sortByWages(){
    this.testService.sortJobsByWages().subscribe((result:any)=> {
      console.log(result);
      this.jobs=result;
      console.log(this.jobs);
    });
  }

  ngOnInit(): void {
    this.sortByRecent();
  }

}
