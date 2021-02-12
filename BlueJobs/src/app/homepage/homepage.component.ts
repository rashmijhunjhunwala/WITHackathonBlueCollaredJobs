import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }
  
  registerEmployer()  //routing to the registration page for employer 
  {
    this.router.navigate(['employer/register']);
  }
  registerSeeker()  //routing to the seeker registration page
  {
    this.router.navigate(['seeker/register']);
  }

  login() //routing to the login page
  {
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
  }

}
