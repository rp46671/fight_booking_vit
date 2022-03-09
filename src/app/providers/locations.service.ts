import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  calKey: string = "session_cal";
  amaKey: string = "session_ama";
  galKey: string = "session_gal";

  constructor(
    private _http: HttpClient
  ) { }

  bindData(data: any) {
    let session_cal: any = window.sessionStorage.getItem(this.calKey);
    let session_ama: any = window.sessionStorage.getItem(this.amaKey);
    let session_gal: any = window.sessionStorage.getItem(this.galKey);

    session_cal = session_cal ? JSON.parse(session_cal) : null;
    session_ama = session_ama ? JSON.parse(session_ama) : null;
    session_gal = session_gal ? JSON.parse(session_gal) : null;

    if (session_cal) {
      data['session_cal'] = session_cal?.session_cal;
    }

    if (session_ama) {
      data['session_ama'] = session_ama?.session_ama;
    }

    if (session_gal) {
      data['session_gal'] = session_gal?.session_gal;
    }
    return data;
  }

  public getLocation(locationCode: string): Observable<Object> {
    let params = new HttpParams()
      .set('city_name', locationCode);
    return this._http.get(environment.baseUrl + "getairport", {
      params: params,
      withCredentials: true
    });
  }

  public searchByFrom(data: any) {
    data = this.bindData(data);
    return this._http.post(environment.baseUrl + 'flight_search', data, { withCredentials: true });
  }

  public Api_viewamadeus(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_viewamadeus', data, { withCredentials: true });
  }

  public Api_viewgaleus(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_viewgaleus', data, { withCredentials: true });
  }

  
  public booking_oneway_gal(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/booking_oneway_gal', data, { withCredentials: true });
  }
  public Api_payment(data:any) {
   data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_payment',data ,{ withCredentials: true });
  }
  public booking_oneway_ams(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_amadeus_book', data, { withCredentials: true });
  }


  public Api_pre_booking_ama(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_pre_booking_ama', data, { withCredentials: true });
  }
  public Api_pre_booking_gal(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_pre_booking_gal', data, { withCredentials: true });
  }

  public flight_search(data: any): Observable<Object> {
    data = this.bindData(data);
    this.Api_calander(data).subscribe();
    let req1 = this._http.post('https://www.khalsatravel.net/flight/Api_gal_request', data, { withCredentials: true }).pipe(map((res) => {
      window.sessionStorage.setItem(this.galKey, JSON.stringify(res));
      return res;
    }));
    let req2 = this._http.post('https://www.khalsatravel.net/flight/api/flight_search', data, { withCredentials: true }).pipe(map((res) => {
      window.sessionStorage.setItem(this.amaKey, JSON.stringify(res));
      return res;
    }));
    return forkJoin([req2, req1]);
  }

  public Api_calander(data: any): Observable<Object> {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/index.php/flight/Api_calander', data, { withCredentials: true })
      .pipe(map((res) => {
        window.sessionStorage.setItem(this.calKey, JSON.stringify(res));
        return res;
      }));
  }

  public get_alll(id: any,stops:any,bagges:any,airlineName:any): Observable<Object> {
    let data = { userId: id, stops:stops,bagges:bagges,airlineName:airlineName};
    data = this.bindData(data);
    return this._http.post(environment.baseUrl + 'get_all/' + id, data, { withCredentials: true });
  }

  public Api_filter(id: any,stops:any,bagges:any,airlineName:any): Observable<Object> {
    let data = { userId: id, stops:stops,bagges:bagges,airlineName:airlineName};
    data = this.bindData(data);
    return this._http.post("https://www.khalsatravel.net/index.php/flight/Api_filter", data, { withCredentials: true });
  }
  public Api_mybooking(id: any): Observable<Object> {
    let data = { userId: id };
    data = this.bindData(data);
    return this._http.post(environment.baseUrl2 + 'Api_mybooking/mybooking/' + id, data, { withCredentials: true });
  }
  public Api_mylist(id: any): Observable<Object> {
    let data = { userId: id };
    data = this.bindData(data);
    return this._http.post("https://www.khalsatravel.net/agent/Api_mylist" , data, { withCredentials: true });
  }

  public get_calander(id: any): Observable<Object> {
    let data = { userId: id };
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/index.php/flight/api/get_calander/' + id, data, { withCredentials: true });
  }

  public Api_viewamadeusprice_api(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_viewamadeus/price_api', data, { withCredentials: true });
  }

  public Api_viewgaleusprice_api(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_viewgaleus/price_api', data, { withCredentials: true });
  }
  public Api_price_onload(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_price_onload', data, { withCredentials: true });
  }
 
  public Api_price_onload_gal(data: any) {
    data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_price_onload_gal', data, { withCredentials: true });
  }

  public ama_print(data: any): Observable<Object> {
    //data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_amadeus_print/ama_print/', { pnr: data }, { withCredentials: true });
  }
  public Api_mb(data: any): Observable<Object> {
    //data = this.bindData(data);
    return this._http.post('https://www.khalsatravel.net/flight/Api_mb', data , { withCredentials: true });
  }
}