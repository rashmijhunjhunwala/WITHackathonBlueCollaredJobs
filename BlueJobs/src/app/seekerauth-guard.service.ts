import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeekerauthGuardService {

  constructor(private router: Router) { }


  canActivate(state: RouterStateSnapshot): boolean
  {
      if(localStorage.getItem("SeekerToken")) return true;
       
      this.router.navigate(['/']);
      return false;
  }
}
