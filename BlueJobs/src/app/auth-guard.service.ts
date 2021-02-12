import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router) { }

  canActivate(state: RouterStateSnapshot): boolean
  {
    
      if(localStorage.getItem("EmployerToken")) return true;
       
      this.router.navigate(['/']);
      return false;
  }
}
