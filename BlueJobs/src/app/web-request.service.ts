import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL: string;


  constructor(private http: HttpClient) { 
    this.ROOT_URL= 'http://localhost:4000';
  }

  //Get request
  get(uri:string)
  {
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }
  //Get request by auth guard
  getauth(uri:string, token:any)
  {
    console.log(uri);
    console.log(token);
    return this.http.get(`${this.ROOT_URL}/${uri}`, {headers :{
      Authorization:token}})
  }

  //Post request
  post(uri:string, payload:Object)
  {
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload)
  }

  //Post request with AuthHeader
  postauth(uri:string, payload:Object, token:any)
  {
    
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload , {headers :{
      Authorization:token
    }})
  }

}
