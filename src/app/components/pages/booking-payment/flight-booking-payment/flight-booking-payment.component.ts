import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  localUserId:any
  viwItemData: any;
  bookingDetailPrice: any;
  ButtonMidChange: any;
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
  localUserIds:any;
  _CardName: any;
  _CardNumber: any;
  _holderNameDEtails: any;
  cardExpiry: any;
  cardYear: any;
  paymentWindiow3d: any;
  constructor(
    private _location: Location,
    protected _sanitizer: DomSanitizer,
    private locationsService: LocationsService,
    private router: Router,
    private modalService: NgbModal,
    private _router: Router,

  ) {
    this.ButtonMidChange="Flight_itinerary";
    
   }


  ngOnInit(): void {

    var localUserId: any = window.localStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;
  
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

   /// this.onPaymentConfirmSubmitData(this.bookFlightItem);
  }

  editData() {
    this.router.navigate(['/booking']);
  }

  onPaymentConfirmSubmitData(value: any) {  
    this.loading = true;
    let reqData = {
      user_id:this.localUserId,
      myAirSegment1: value?.myAirSegment1,
      myAirSegment2: value?.myAirSegment2,
      flight_id: this.bookFlightItem?.flight_id,
      flight_rec: this.bookFlightItem?.flight_rec,
      adult_no: this.adultArr.length,
      email:this.confirmBookFlightData?.email,
      phone:this.confirmBookFlightData?.phone,
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
    console.log(reqData);
    console.log("gal", value.gds)
    this.locationsService.Api_mybooking(reqData).subscribe((res: any) => {
     console.log(res)
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
    // if (value.gds == "gal") {
      
    //   console.log("gal", value.gds)
    //   this.locationsService.booking_oneway_gal(reqData).subscribe((res: any) => {
    //     this.bookingDetailPrice=res.detail
    //     this.loading = false;
    //   }, (err: any) => {
    //     this.loading = false;
    //   });
    // } else if (value.gds == "ama") {
    //   console.log("ama", value.gds)
    //   this.locationsService.booking_oneway_ams(reqData).subscribe((res: any) => {
    //     this.loading = false;
    //     this.bookingDetailPrice=res.detail
    //   }, (err: any) => {
    //     this.loading = false;
    //   });
    // } else {
    //   this.loading = false;
    // }

  }
  changeFightMidButton(valu:any){
    this.ButtonMidChange=valu;
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

  Api_mybooking() {  
    this.loading = true;
    let reqData = {
      // user_id:this.localUserId,
      // cardName:this._CardName,
      // cardNo:this._CardNumber,
      // cardHolderName:this._holderNameDEtails,
      // cardExpiry:this.cardExpiry,
      // cardYear:this.cardYear
    }
    this.loading = true;
    console.log(reqData);
    this.locationsService.Api_payment().subscribe((res: any) => {
     console.log(res)
     this.paymentWindiow3d=this._sanitizer.bypassSecurityTrustResourceUrl(res.window3d)
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
   
  }

}