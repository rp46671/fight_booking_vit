import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';
@Component({
  selector: 'app-flight-booking-payment',
  templateUrl: './flight-booking-payment.component.html',
  styleUrls: ['./flight-booking-payment.component.css']
})
export class FlightBookingPaymentComponent implements OnInit {
  defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/"
  formatImage = ".png"
  confirmBookFlightData: any;
  adultArr: any[] = [];
  childArr: any[] = [];
  infantArr: any[] = [];
  bookFlightItem: any = null;
  paymentUrl: SafeUrl = "";
  loading: boolean = false;

  constructor(
    private _location: Location,
    protected _sanitizer: DomSanitizer,
    protected router: Router,
    private locationsService: LocationsService
  ) { }


  ngOnInit(): void {
    let bookFlightObj: any = window.sessionStorage.getItem('bookFlight');
    let confirmBookFlightData: any = window.sessionStorage.getItem('confirmBookFlightData');
   
    this.confirmBookFlightData = JSON.parse(confirmBookFlightData);
    if (!this.confirmBookFlightData) {
      this._location.back();
    }

    this.bookFlightItem = JSON.parse(bookFlightObj);
    if (!this.bookFlightItem) {
      this._location.back();
    }

    this.paymentUrl = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.khalsatravel.net/index.php/flight/api/addmoney?amount=" + this.bookFlightItem?.price);
    this.adultArr = this.confirmBookFlightData?.adults;
    this.childArr = this.confirmBookFlightData?.childs;
    this.infantArr = this.confirmBookFlightData?.infants;

    this.onPaymentConfirmSubmitData(this.bookFlightItem);
  }

  editData() {
    this.router.navigate(['/booking']);
  }

  onPaymentConfirmSubmitData(value: any) {  
    let reqData = {
      user_id:5678,
      flight_id: this.bookFlightItem?.flight_id,
      flight_rec: this.bookFlightItem?.flight_rec,
      adult_no: this.adultArr.length,
      adult: this.adultArr.map((ele: any) => {
        return {
          dob: ele?.dob,
          passport: ele?.passport,
          gender: ele?.gender,
          title: ele?.title,
          first_name: ele?.firstname,
          last_name: ele?.lastname
        };
      }),
      child_no: this.childArr.length,
      child: this.childArr.map((ele: any) => {
        return {
          dob: ele?.dob,
          passport: ele?.passport,
          gender: ele?.gender,
          title: ele?.title,
          first_name: ele?.firstname,
          last_name: ele?.lastname
        };
      }),
      infant_no: this.infantArr.length,
      infant: this.infantArr.map((ele: any) => {
        return {
          dob: ele?.dob,
          passport: ele?.passport,
          gender: ele?.gender,
          title: ele?.title,
          first_name: ele?.firstname,
          last_name: ele?.lastname
        };
      })
    }
    
    this.loading = true;
    
    if (value.gds == "gal") {
      
      console.log("gal", value.gds)
      this.locationsService.booking_oneway_gal(reqData).subscribe((res: any) => {
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
      });
    } else if (value.gds == "ama") {
      console.log("ama", value.gds)
      this.locationsService.booking_oneway_ams(reqData).subscribe((res: any) => {
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }

  }
}