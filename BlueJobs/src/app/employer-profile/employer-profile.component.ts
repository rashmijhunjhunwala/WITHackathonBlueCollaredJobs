import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Employer } from '../models/Employer';
import { EmployerProfile } from '../models/EmployerProfile';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  EmployerProfile: EmployerProfile =<any>{}
  constructor(private testService: TestService) { 
    this.getProfileDetails();
  }

  // getting the details of the profile of the employer by subscribing the response recieved from
  //  the get request to the API
  getProfileDetails()
  {
    this.testService.getEmployerProfile().subscribe((response:any)=>
    this.EmployerProfile=response
    )
  }

  ngOnInit(): void {
    this.getProfileDetails();
  }

}
