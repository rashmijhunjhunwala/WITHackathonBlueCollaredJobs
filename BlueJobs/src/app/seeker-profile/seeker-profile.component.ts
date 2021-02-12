import { Component, OnInit } from '@angular/core';
import { SeekerProfile } from '../models/SeekerProfile';
import { TestService } from '../test.service';

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrls: ['./seeker-profile.component.css']
})
export class SeekerProfileComponent implements OnInit {
  SeekerProfile: SeekerProfile =<any>{}
  constructor(private testService: TestService) { 
    this.getProfileDetails();
  }

  //get the profileDetails of the seeker
  getProfileDetails()
  {
    this.testService.getSeekerProfile().subscribe((response:any)=>{
    console.log(response);
    this.SeekerProfile=response}
    )
  }
  
  ngOnInit(): void {
    this.getProfileDetails();
  }

}
