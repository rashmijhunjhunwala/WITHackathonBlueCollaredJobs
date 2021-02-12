import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {

  CategoryList:any=["Custodial Work","Warehousing","Cook","Waste Collection & Disposal","Trucking","Loading/Unloading Merchandise",
  "Mining Workers","Construction", "Carpenter", "Plumber", "Domestic Help","Electrician"]

  selectedCategory:string=""
  constructor(private testService: TestService, private router: Router) { }


  //sending the selected category to the service
  sendCategory(category: string)
  {
    console.log(category);
    this.testService.setCategory(category);
    this.router.navigate(['seeker/dashboard', localStorage.getItem("SeekerId")]);
  }

  
  ngOnInit(): void {
  }

}
