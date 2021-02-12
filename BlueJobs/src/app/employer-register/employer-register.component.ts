import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Employer } from '../models/Employer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent implements OnInit {

  public employer:Employer=<any>{};
  constructor(private TestService: TestService,private Route:Router) { }

 //sending a post request to the api, subscribing the response, and saving the token and the id in the local storage
  saveEmployer(employer: Object)
  {
    this.TestService.registerEmployer(employer).subscribe((response:any) => {
      console.log(response);
      this.employer=response;
      console.log(this.employer);
      localStorage.setItem("EmployerToken", this.employer.token);
      localStorage.setItem("EmployerId", this.employer.employer._id);
      this.TestService.setEmployer(this.employer);
      this.Route.navigate(['employer/dashboard',this.employer.employer._id]);
    });
  }
  ngOnInit(): void {
  }

}
