import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from '../location-service.service';
import { TestService } from '../test.service';
import { Seeker } from '../models/Seeker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-register',
  templateUrl: './seeker-register.component.html',
  styleUrls: ['./seeker-register.component.css']
})
export class SeekerRegisterComponent implements OnInit {

  CategoryList:any=["Custodial Work","Warehousing","Cook","Waste Collection & Disposal","Trucking","Loading/Unloading Merchandise",
  "Mining Workers","Construction", "Carpenter", "Plumber", "Domestic Help","Electrician"]
  
  private latitude:string=""
  private longitude:string=""
  private seeker: object={}; 
  private Seeker: Seeker=<any>{};

  constructor(private locationService: LocationServiceService, private TestService: TestService, private router: Router) { }


  //getting the latitude and longitude of the user
  getLoc(){
    this.locationService.getPosition().then(pos=>
      {
        this.latitude=pos.lat;
        this.longitude=pos.lng;
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         this.saveSeeker();
      });
    }


  registerSeeker(seeker: object)
  {
    this.seeker=seeker;
    this.getLoc();
  }


  //saving the profile in the db and saving the token and the id of the seeker
  saveSeeker()
  {
    const seekerf = {
      ...this.seeker,
      location:{
        coordinates:[this.latitude,this.longitude]
      }
      
    }
    console.log(seekerf);
    this.TestService.registerSeeker(seekerf).subscribe((response:any) => {
      console.log(response);
      this.Seeker=response;
      console.log(this.Seeker);
      localStorage.setItem("SeekerToken", this.Seeker.token);
      localStorage.setItem("SeekerId", this.Seeker.seeker._id.toString());
      this.TestService.setSeeker(this.Seeker);
      this.router.navigate(['seeker/selectCategory']);
    });

  }

  ngOnInit(): void {
  }

}
