import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';
import { Employer } from '../models/Employer';
import { Seeker } from '../models/Seeker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private employer:Employer=<any>{};
  private seeker: Seeker=<any>{}; 
  constructor(private testService: TestService, private router: Router) { }

  

 //logging in the employer and subscribing the response recieved from the HTTP request
  loginEmployer(email: string, password: string) 
  {
    this.testService.loginEmployer({"email":email,"password":password}).subscribe((response:any) => {
      this.employer=response;
      this.setEmployerToken();
    });
  }

  //saving the token recieved from the jwt auth and the _id for future requests in the local storage
  setEmployerToken()
  {
    localStorage.setItem("EmployerToken", this.employer.token);
    localStorage.setItem("EmployerId", this.employer.employer._id);
    this.testService.setEmployer(this.employer);
    this.router.navigate(['employer/dashboard',this.employer.employer._id]);
  }


  //logging in the seeker and subscribing the response recieved by the HTTP request
  loginSeeker(email:string, password:string)
  {

    this.testService.loginSeeker({"email":email,"password":password}).subscribe((response:any) => {
      this.seeker=response;
      this.setSeekerToken();
    });
  }

  //saving the token and id in the local storage
  setSeekerToken()
  {
    localStorage.setItem("SeekerToken", this.seeker.token);
    localStorage.setItem("SeekerId", this.seeker.seeker._id.toString());
    this.testService.setSeeker(this.seeker);
    this.router.navigate(['seeker/selectCategory']);
  }

  


  ngOnInit(): void {
  }

}
