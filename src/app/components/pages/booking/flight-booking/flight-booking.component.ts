import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Location, LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  
  bookingForm!:FormGroup
  
  flightSearchReqData: any = [];
  localUserIds: any;
  passportOpendetailsInfrnt: null;
  passportOpendetailsChild: null;
  passportOpendetailsAddults: null;
  viwItemData: any;
  loadingViewDta: boolean = false;
  viewDataAll: any[] = [];
  viewDataAll2: any[] = [];
  indexAll2: any[] = [];
  arr_code: any;
  dep_code: any;
  gds: any;
  Dep_date: any;
  arr_time: any;
  dep_time: any;
  _price: any;
  indexAll: any;
  confirmResut = '';
  viewDataPrice: any;
  infArrayPrice: any[] = [];
  childArrayPrice: any[] = [];
  adultsArrayPrice: any[] = [];
  ButtonMidChange: any;
  frequent_flyerdetailsAddults: any;
  frequent_flyerdetailsChilds: any;
  frequent_flyerdetailsInfrants: any;
  emailUser: any;
  phoneUser: any;
  addMealdetailsInfrants: any;
  addMealdetailsChilds: any;
  addMealdetailsAddults: any;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private locationsService: LocationsService,
    private modalService: NgbModal,
    private _router: Router,
    public formBuilder: FormBuilder,

    private locationStrategy: LocationStrategy,


  ) {
    this.loading=false
    this.ButtonMidChange = "Flight_itinerary";
    this.passportOpendetailsInfrnt = null;
    this.passportOpendetailsChild = null;
    this.passportOpendetailsAddults = null;
    this.adultsArrayPrice = [];
    this.childArrayPrice = [];
    this.infArrayPrice = [];
  }



  ngOnInit(): void {
    // history.pushState('/', '', location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState('/', '', location.href);
    // })
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);

    console.log("localUserId", localUserId);
    this.emailUser = localUserId.detail.mail;
    this.phoneUser = localUserId.detail.phone;
    console.log("  this.phoneUser",   this.phoneUser);
    this.localUserIds = localUserId?.detail.id;
   
    this.bookingForm = this.formBuilder.group({
      adults: this.fb.array([]),
      childs: this.fb.array([]),
      infants: this.fb.array([]),
      phone: new FormControl(this.phoneUser, [Validators.required]),
      email: new FormControl( this.emailUser, [Validators.required]),
  
    })
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
    let bookFlightObj: any = window.sessionStorage.getItem('bookFlight');
    let flightSearchReqData: any = window.sessionStorage.getItem('flightSearchReqData');
    let confirmBookFlightData: any = window.sessionStorage.getItem('confirmBookFlightData');
    confirmBookFlightData = JSON.parse(confirmBookFlightData);
    this.bookFlightItem = JSON.parse(bookFlightObj);
    this.PriceApiCalling(this.bookFlightItem)
    this.openTaxModal(this.bookFlightItem)
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
          last_name: ele?.lastname,
          issueDate: ele?.issueDate,
          expiryDate: ele?.expiryDate,
          passportIssueCountry: ele?.passportIssueCountry,
          countryofNationality: ele?.countryofNationality,
          addMeal: ele?.addMeal,
          frequent_flyerdetails: ele?.frequent_flyerdetails,
          frequent_flyerdetailsOption:ele?.frequent_flyerdetailsOption,
          addMealOption:ele?.addMealOption
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
          last_name: ele?.lastname,
          issueDate: ele?.issueDate,
          expiryDate: ele?.expiryDate,
          passportIssueCountry: ele?.passportIssueCountry,
          countryofNationality: ele?.countryofNationality,
          addMeal: ele?.addMeal,
          frequent_flyerdetails: ele?.frequent_flyerdetails,
          frequent_flyerdetailsOption:ele?.frequent_flyerdetailsOption,
          addMealOption:ele?.addMealOption
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
          last_name: ele?.lastname,
          issueDate: ele?.issueDate,
          expiryDate: ele?.expiryDate,
          passportIssueCountry: ele?.passportIssueCountry,
          countryofNationality: ele?.countryofNationality,
          addMeal: ele?.addMeal,
          frequent_flyerdetails: ele?.frequent_flyerdetails,
          frequent_flyerdetailsOption:ele?.frequent_flyerdetailsOption,
          addMealOption:ele?.addMealOption
        };
      }),
      email: this.email.value,
      phone: this.phone.value,
    }
    this.loading = true;
    if (this.bookFlightItem.gds == "gal") {
      this.locationsService.Api_pre_booking_gal(reqData).subscribe((res: any) => {
        this.loading = false;

        if (res.status == 'confirm') {
          window.sessionStorage.setItem('confirmBookFlightData', JSON.stringify(this.bookingForm.value));
          this.router.navigate(['/booking-payment']);
          this.bookingForm.reset();
        } else {
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
        } else {
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
  get email() {
    return this.bookingForm.controls["email"].value;
  } get phone() {
    return this.bookingForm.controls["phone"].value;
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
        gender: new FormControl('', [Validators.required]),
        passport: new FormControl(''),
        issueDate: new FormControl(''),
        expiryDate: new FormControl(''),
        passportIssueCountry: new FormControl(''),
        countryofNationality: new FormControl(''),
        addMeal: new FormControl(false, [Validators.required]),
        frequent_flyerdetails: new FormControl(false, [Validators.required]),
        frequent_flyerdetailsOption:new FormControl('', ),
        addMealOption:new FormControl('', ),
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
        passport: new FormControl(''),
        gender: new FormControl('', [Validators.required]),
        issueDate: new FormControl(''),
        expiryDate: new FormControl(''),
        passportIssueCountry: new FormControl(''),
        countryofNationality: new FormControl(''),
        addMeal: new FormControl(false, [Validators.required]),
        frequent_flyerdetails: new FormControl(false, [Validators.required]),
        frequent_flyerdetailsOption:new FormControl('', ),
        addMealOption:new FormControl('', ),

      });
      this.childs.push(childForm);
    }
  }

  deleteChild(childIndex: number) {
    this.childs.removeAt(childIndex);
  }
  passportOpendetailsaddultsFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.passportOpendetailsAddults = val
    } else {
      this.passportOpendetailsAddults = null;
    }
  }
  passportOpendetailsChildFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.passportOpendetailsChild = val
    } else {
      this.passportOpendetailsChild = null;
    }
  }
  passportOpendetailsInfrntFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.passportOpendetailsInfrnt = val
    } else {
      this.passportOpendetailsInfrnt = null;
    }
  }


  frequent_flyerdetailsAddultsFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.frequent_flyerdetailsAddults = val
    } else {
      this.frequent_flyerdetailsAddults = null;
    }
  }
  frequent_flyerdetailsChildsFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.frequent_flyerdetailsChilds = val
    } else {
      this.frequent_flyerdetailsChilds = null;
    }
  }
  frequent_flyerdetailsInfarntFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.frequent_flyerdetailsInfrants = val
    } else {
      this.frequent_flyerdetailsInfrants = null;
    }
  }
  addMealdetailsAddultsFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.addMealdetailsAddults = val
    } else {
      this.addMealdetailsAddults = null;
    }
  }
  addMealdetailsChildsFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.addMealdetailsChilds = val
    } else {
      this.addMealdetailsChilds = null;
    }
  }
  addMealdetailsInfarntFunction(val: any, event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.addMealdetailsInfrants = val
    } else {
      this.addMealdetailsInfrants = null;
    }
  }
  addInfant(num: number = 1) {
    let counter = 1;
    while (counter++ <= num) {
      const infantForm = this.fb.group({
        title: new FormControl('', [Validators.required]), firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        passport: new FormControl(''),
        gender: new FormControl('', [Validators.required]),
        issueDate: new FormControl(''),
        expiryDate: new FormControl(''),
        passportIssueCountry: new FormControl(''),
        countryofNationality: new FormControl(''),
        addMeal: new FormControl(false, [Validators.required]),
        frequent_flyerdetails: new FormControl(false, [Validators.required]),
        frequent_flyerdetailsOption:new FormControl('', ),
        addMealOption:new FormControl('', ),
      });
      this.infants.push(infantForm);
    }
  }

  deleteInfant(infantIndex: number) {
    this.infants.removeAt(infantIndex);
  }

  PriceApiCalling(item: any) {
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
        console.log("hhha", res);
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
        console.log("rddd", res)
      }, (err: any) => {
        alert('Something is wrong')
        this.router.navigate(['/flight-grid-left/content-fight']);
        this.loading = false;
      });
    }
  }
  navToBookFlight(item: any) {
    window.sessionStorage.setItem('bookFlight', JSON.stringify(item));
    this._router.navigate(['/booking']);
  }
  viewData(content: any, item: any) {
    this.viwItemData = item
    this.loadingViewDta = true;
    this.viewDataAll = [];
    this.viewDataAll2 = [];
    this.indexAll2 = [];
    this.arr_code = item.arr_code;
    this.dep_code = item.dep_code;
    this.gds = item.gds;
    this.Dep_date = item.Dep_date
    this.arr_time = item.arr_time
    this.dep_time = item.dep_time
    this._price = item.price;
    if (item.gds == "gal") {
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
      this.locationsService.Api_viewgaleus(reqData).subscribe((res: any) => {
        this.viewDataAll = res.detail;
        this.viewDataAll2 = res.detail1;
        this.indexAll = res.index1;
        this.indexAll2 = res.index2;
        this.loadingViewDta = false;
        console.log(" this.viewDataAll", this.viewDataAll)
      }, (err: any) => {
        this.loadingViewDta = true;
      });
    } else if (item.gds == "ama") {
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
      this.locationsService.Api_viewamadeus(reqData).subscribe((res: any) => {
        this.viewDataAll = res.detail;
        this.viewDataAll2 = res.detail1;
        this.indexAll = res.index1;
        this.indexAll2 = res.index2;
        this.loadingViewDta = false;
        console.log(" this.viewDataAll", this.viewDataAll)
      }, (err: any) => {
        this.loadingViewDta = true;
      });
    }
    else {
      alert("No data found");
      this.loadingViewDta = true;
    }
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true,
    }).result.then((result) => {
      this.confirmResut = `Closed with: ${result}`;
    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });
  }



  openTaxModal(item: any) {


    if (item.gds == "gal") {
      let reqData = {
        "bag_ref_no": item.bag_ref_no,
        "flgith_idd": item.flight_id,
        "flight_rec": item.flight_rec,
        "session": item.session
      }
      this.locationsService.Api_viewgaleusprice_api(reqData).subscribe((res: any) => {
        this.viewDataPrice = res;
        this.viewDataPrice?.forEach((ele: any) => {
          if (ele.ptc_ntype == "LBR") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.adultsArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else if (ele.ptc_ntype == "CH") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.childArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else if (ele.ptc_ntype == "INF") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.infArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else {

          }
        })
        console.log("adultsArrayPrice", this.adultsArrayPrice)
        console.log(" this.viewDataPrice", this.viewDataPrice)
      }, (err: any) => {
      });
    } else if (item.gds == "ama") {
      let reqData = {
        "bag_ref_no": item.bag_ref_no,
        "flgith_idd": item.flight_id,
        "flight_rec": item.flight_rec,
        "session": item.session,
      }
      this.locationsService.Api_viewamadeusprice_api(reqData).subscribe((res: any) => {
        this.viewDataPrice = res;
        this.viewDataPrice?.forEach((ele: any) => {
          if (ele.ptc_ntype == "LBR") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.adultsArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else if (ele.ptc_ntype == "CH") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.childArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else if (ele.ptc_ntype == "INF") {
            for (var i = 0; i < ele.paxcount; i++) {
              this.infArrayPrice.push({
                totalFareAmount: ele.totalFareAmount,
                paxcount: i,
              })
            }
          } else {
          }


        })
        console.log("adultsArrayPrice", this.adultsArrayPrice)
        console.log(" this.viewDataPrice", this.viewDataPrice)
      }, (err: any) => {
      });
    }
    else {
      alert("No data found")
    }

  }

  changeFightMidButton(valu: any) {
    this.ButtonMidChange = valu;
  }

  openViewPriceModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true,
    }).result.then((result) => {
      this.confirmResut = `Closed with: ${result}`;
    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });
  }
}
