import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WebRequestService } from './web-request.service';
import { TestService } from './test.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SeekerDashboardComponent } from './seeker-dashboard/seeker-dashboard.component';
import { SeekerauthGuardService } from './seekerauth-guard.service';
import { LocationServiceService } from './location-service.service';
import { SeekerRegisterComponent } from './seeker-register/seeker-register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SeekerProfileComponent } from './seeker-profile/seeker-profile.component';
import { NearByCandidatesComponent } from './near-by-candidates/near-by-candidates.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployerRegisterComponent,
    EmployerDashboardComponent,
    EmployerProfileComponent,
    CreateJobComponent,
    SeekerDashboardComponent,
    SeekerRegisterComponent,
    HomepageComponent,
    SelectCategoryComponent,
    SeekerProfileComponent,
    NearByCandidatesComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'login', component: HomeComponent },
      { path: 'employer/register', component: EmployerRegisterComponent },
      { path: 'seeker/register', component: SeekerRegisterComponent },
      { path: 'seeker/selectCategory', component: SelectCategoryComponent, canActivate:[SeekerauthGuardService] },
      { path: 'employer/dashboard/:id', component: EmployerDashboardComponent, canActivate: [AuthGuardService]},
      {path: 'employer/profile/:id', component: EmployerProfileComponent, canActivate: [AuthGuardService]},
      {path: 'employer/createJob/:id', component: CreateJobComponent, canActivate: [AuthGuardService]},
      {path: 'seeker/dashboard/:id', component: SeekerDashboardComponent, canActivate: [SeekerauthGuardService]},
      {path: 'employer/jobs/:id', component: NearByCandidatesComponent, canActivate:[AuthGuardService]},
      {path: 'seeker/:id', component: SeekerProfileComponent},
      {path: 'employer/:id', component: EmployerProfileComponent}
    ])
  ],
  providers: [HttpClientModule, TestService, WebRequestService, AuthGuardService, SeekerauthGuardService, LocationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
