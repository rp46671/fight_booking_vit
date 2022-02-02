import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  loading: boolean = false;
  defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/"
  formatImage = ".png"
  bookFlightItem: any = null;
  bookingForm = new FormGroup({
    adults: this.fb.array([]),
    childs: this.fb.array([]),
    infants: this.fb.array([])
  });
  flightSearchReqData: any = [];
  localUserIds: any;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private locationsService: LocationsService
  ) { }



  ngOnInit(): void {
    var localUserId: any = window.localStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;
    
    let bookFlightObj: any = window.sessionStorage.getItem('bookFlight');
    let flightSearchReqData: any = window.sessionStorage.getItem('flightSearchReqData');
    let confirmBookFlightData: any = window.sessionStorage.getItem('confirmBookFlightData');
    confirmBookFlightData = JSON.parse(confirmBookFlightData);
    this.bookFlightItem = JSON.parse(bookFlightObj);
    this.PriceApiCalling(this.bookFlightItem)
    if (!this.bookFlightItem) {
      this._location.back();
    }

    this.flightSearchReqData = JSON.parse(flightSearchReqData);
    if (!this.flightSearchReqData) {
      this._location.back();
    }

    if (this.flightSearchReqData?.adults)
      this.addAdult(Number(this.flightSearchReqData?.adults));

    if (this.flightSearchReqData?.child)
      this.addChild(Number(this.flightSearchReqData?.child));

    if (this.flightSearchReqData?.infants)
      this.addInfant(Number(this.flightSearchReqData?.infants));

    if (confirmBookFlightData) {
      this.bookingForm.setValue(confirmBookFlightData);
    }
  }
  onSubmit() {
    let adultArr: any[] = this.bookingForm.value?.adults;
    let childArr: any[] = this.bookingForm.value?.childs;
    let infantArr: any[] = this.bookingForm.value?.infants;

    let reqData = {
      user_id: this.localUserIds,
      flight_id: this.bookFlightItem?.flight_id,
      flight_rec: this.bookFlightItem?.flight_rec,
      adult_no: adultArr.length,
      adult: adultArr.map((ele: any) => {
        return {
          dob: ele?.dob,
          passport: ele?.passport,
          gender: ele?.gender,
          title: ele?.title,
          first_name: ele?.firstname,
          last_name: ele?.lastname
        };
      }),
      child_no: childArr.length,
      child: childArr.map((ele: any) => {
        return {
          dob: ele?.dob,
          passport: ele?.passport,
          gender: ele?.gender,
          title: ele?.title,
          first_name: ele?.firstname,
          last_name: ele?.lastname
        };
      }),
      infant_no: infantArr.length,
      infant: infantArr.map((ele: any) => {
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
    if (this.bookFlightItem.gds == "gal") {
      this.locationsService.Api_pre_booking_gal(reqData).subscribe((res: any) => {
        this.loading = false;
       
        if (res.status == 'confirm') {
          window.sessionStorage.setItem('confirmBookFlightData', JSON.stringify(this.bookingForm.value));
          this.router.navigate(['/booking-payment']);
          this.bookingForm.reset();
        }else{
          alert('Something is wrong');
          this.router.navigate(['/flight-grid-left/content-fight']);
        }
      }, (err: any) => {
        alert('Something is wrong')
        this.router.navigate(['/flight-grid-left/content-fight']);
        this.loading = false;
      });
    } else if (this.bookFlightItem.gds == "ama") {
      this.locationsService.Api_pre_booking_ama(reqData).subscribe((res: any) => {
        this.loading = false;
        if (res.status == 'confirm') {
          window.sessionStorage.setItem('confirmBookFlightData', JSON.stringify(this.bookingForm.value));
          this.router.navigate(['/booking-payment']);
          this.bookingForm.reset();
        }else{
          alert('Something is wrong')
          this.router.navigate(['/flight-grid-left/content-fight']);
        }
      }, (err: any) => {
          alert('Something is wrong')
          this.router.navigate(['/flight-grid-left/content-fight']);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  get adults() {
    return this.bookingForm.controls["adults"] as FormArray;
  }

  get childs() {
    return this.bookingForm.controls["childs"] as FormArray;
  }

  get infants() {
    return this.bookingForm.controls["infants"] as FormArray;
  }

  addAdult(num: number = 1) {
    let counter = 1;
    while (counter++ <= num) {
      const adultForm = this.fb.group({
        title: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        passport: new FormControl('')
      });
      this.adults.push(adultForm);
    }
  }

  deleteAdult(adultIndex: number) {
    this.adults.removeAt(adultIndex);
  }

  addChild(num: number = 1) {
    let counter = 1;
    while (counter++ <= num) {
      const childForm = this.fb.group({
        title: new FormControl('', [Validators.required]), firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        passport: new FormControl('')
      });
      this.childs.push(childForm);
    }
  }

  deleteChild(childIndex: number) {
    this.childs.removeAt(childIndex);
  }

  addInfant(num: number = 1) {
    let counter = 1;
    while (counter++ <= num) {
      const infantForm = this.fb.group({
        title: new FormControl('', [Validators.required]), firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        passport: new FormControl('')
      });
      this.infants.push(infantForm);
    }
  }

  deleteInfant(infantIndex: number) {
    this.infants.removeAt(infantIndex);
  }

PriceApiCalling(item:any){
  if (this.bookFlightItem.gds == "gal") {
    let reqData = {
      "flgith_id": item.flight_id,
      "flight_rec": item.flight_rec,
      "gds": item.gds,
      "myAirSegment1": item.myAirSegment1,
      "myAirSegment2": item.myAirSegment2,
      "price": item.price,
      "unique_id": this.localUserIds,
      "session": item.session,
    }
    this.locationsService.Api_price_onload_gal(reqData).subscribe((res: any) => {
    console.log("hhha",res);
      }, (err: any) => {
      alert('Something is wrong')
      this.router.navigate(['/flight-grid-left/content-fight']);
      this.loading = false;
    });
  } else if (this.bookFlightItem.gds == "ama") {
    let reqData = {
      "bag_ref_no": item.bag_ref_no,
      "bag_ref_no_rt": item.bag_ref_no,
      "flight_id": item.flight_id,
      "flight_id_rt": item.flight_id_rt,
      "flight_rec": item.flight_rec,
      "gds": item.gds,
      "price": item.price,
      "session": item.session,
      "unique_id": this.localUserIds
    }
    this.locationsService.Api_price_onload(reqData).subscribe((res: any) => {
    console.log("rddd",res ) 
    }, (err: any) => {
        alert('Something is wrong')
        this.router.navigate(['/flight-grid-left/content-fight']);
      this.loading = false;
    });
  }
}
 
}
