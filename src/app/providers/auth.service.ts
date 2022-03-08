import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  rItem={};
  authenticated = true;
  private userSubject = new Subject<any>();
  constructor(
     private _route: Router,
     private _http: HttpClient,) {
  }

  
  signout() {
    this.authenticated = false;
    sessionStorage.removeItem('fight-user');
    this.removeSession();
    window.sessionStorage.removeItem('search-flight-raw-data');
    window.sessionStorage.removeItem('flightSearchReqData');
    window.sessionStorage.removeItem('confirmBookFlightData');
    window.sessionStorage.removeItem('session_cal');
    window.sessionStorage.removeItem('session_ama');
    window.sessionStorage.removeItem('session_gal');
    window.sessionStorage.removeItem('isLoggedin');
    
  }
  login(requestData: any) {
    this.authenticated = true;
    console.log('login service -> login method', requestData);
    let url = environment.baseUrl + 'Login';
    console.log('login servoce url', url);
    return this._http.post(url, requestData);

  }

  getSession() {
    return this.userSubject.asObservable();
  }
  removeSession() {
    sessionStorage.removeItem('fight-user');
    this.userSubject.next(null);
    this._route.navigate(['auth/login']);
  }

  createSession(user: any) {
    console.log("user",user);
    sessionStorage.setItem('fight-user', JSON.stringify(user));
    this.userSubject.next(user);
  }
  getAccessToken() {
    let a:any=sessionStorage?.getItem('fight-user')
    let result = JSON.parse(a).token;
    console.log('result service token==>>', result);
    return result
  }
  getUserID() {
    let a:any=sessionStorage?.getItem('fight-user')
    let result = JSON.parse(a).userInfor.email;
    console.log('result==>>', result);
    return result
  }
  getUserInfo() {
    let a:any=sessionStorage?.getItem('fight-user')
  
    let result = JSON.parse(a).userInfor;
    console.log('result==>>', result);
    return result
  }
  
}


