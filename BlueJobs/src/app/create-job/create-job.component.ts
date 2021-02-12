import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from '../location-service.service';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  CategoryList:any=["Custodial Work","Warehousing","Cook","Waste Collection & Disposal","Trucking","Loading/Unloading Merchandise",
"Mining Workers","Construction", "Carpenter", "Plumber", "Domestic Help","Electrician"]

  private latitude:string=""
  private longitude:string=""

  constructor(private locationService: LocationServiceService,private testService: TestService,private router: Router) { }

  //getting the current location of the user
  getLoc(){
  this.locationService.getPosition().then(pos=>
    {
      this.latitude=pos.lat;
      this.longitude=pos.lng;
       console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }

  //Creating the job
  createJob(job:object)
  {
      this.getLoc();
      const jobf = {
        ...job,
        location:{
          coordinates:[this.latitude,this.longitude]
        } 
    }
      this.testService.createJob(jobf,localStorage.getItem("EmployerId")).subscribe(response => console.log(response));
      this.router.navigate(['/employer/dashboard',localStorage.getItem("EmployerId")]);
  }


  ngOnInit(): void {
    this.getLoc();
  }

}
