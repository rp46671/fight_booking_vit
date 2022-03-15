import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
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
  localUserIds: any;

  _CardNumber: any;
  _holderNameDEtails: any;
  cardExpiry: any;
  cardYear: any;
  paymentWindiow3d: any;
  spinerrLoading!: boolean;
  cvvNo: any
  @ViewChild("modalPaytmentConfirm") modalPaytmentConfirm: ElementRef | undefined
  @ViewChild("modalBancoModalAfterConfirm") modalBancoModalAfterConfirm: ElementRef | undefined
  _ip: any;
  multiBancoData: any;
  count: any=0;
  constructor(
    private _location: Location,
    protected _sanitizer: DomSanitizer,
    private locationsService: LocationsService,
    private router: Router,
    private modalService: NgbModal,
    private _router: Router,
    private locationStrategy: LocationStrategy,


  ) {
    this.spinerrLoading = false;
    this.ButtonMidChange = "Flight_itinerary";
    this.api_ipaddress();
  }


  ngOnInit(): void {
     this.Api_balance();
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
    var localUserId: any = window.sessionStorage.getItem('fight-user');
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
      user_id: this.localUserIds,
      myAirSegment1: value?.myAirSegment1,
      myAirSegment2: value?.myAirSegment2,
      flight_id: this.bookFlightItem?.flight_id,
      flight_rec: this.bookFlightItem?.flight_rec,
      adult_no: this.adultArr.length,
      email: this.confirmBookFlightData?.email,
      phone: this.confirmBookFlightData?.phone,
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
    // console.log("gal", value.gds)
    // this.locationsService.Api_mybooking(reqData).subscribe((res: any) => {
    //   console.log(res)
    //   this.loading = false;
    // }, (err: any) => {
    //   this.loading = false;
    // });
    if (value.gds == "gal") {

      console.log("gal", value.gds)
      this.locationsService.booking_oneway_gal(reqData).subscribe((res: any) => {
        this.bookingDetailPrice = res.detail;
        if (res[0].status == "confirm") {
          this.router.navigate(['/flight-grid-left/view-ticket/' + res[0].pnr])
        }
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
      });
    } else if (value.gds == "ama") {
      console.log("ama", value.gds)
      this.locationsService.booking_oneway_ams(reqData).subscribe((res: any) => {
        this.loading = false;
        this.bookingDetailPrice = res.detail
        if (res[0].status == "confirm") {
          this.router.navigate(['/flight-grid-left/view-ticket/' + res[0].pnr])
        }
      }, (err: any) => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }

  }
  changeFightMidButton(valu: any) {
    this.ButtonMidChange = valu;
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
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;

    this.spinerrLoading = true;
    this.loading = true;
    let reqData = {
      user_id: this.localUserIds,
      cardNo: this._CardNumber,
      cardHolderName: this._holderNameDEtails,
      cardExpiry: this.cardExpiry,
      cardYear: this.cardYear,
      price: this.bookFlightItem?.price,
      cvvNo: this.cvvNo,
      ip: this._ip,
      gds: this.bookFlightItem.gds,
      uniqueNo: this.getRandomColor()
    }
    this.loading = true;
    console.log(reqData);
    this.locationsService.Api_payment(reqData).subscribe((res: any) => {
      console.log(res)
      this.spinerrLoading = false;
      if (res.otp != '' && res.window3d != '') {
        this.paymentWindiow3d = this._sanitizer.bypassSecurityTrustResourceUrl(res.window3d)
        this.openChangePAyloaModal(this.modalPaytmentConfirm)
      } else {
        confirm(res.status)
      }

      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
    console.log(this.localUserIds)

  }
  multiBanco() {
    this.loading = true;
    let reqData = {
      user_id: this.localUserIds,
      price: this.bookFlightItem?.price,

    }
    this.loading = true;
    console.log(reqData);
    this.locationsService.Api_mb(reqData).subscribe((res: any) => {
      console.log(res)
      this.multiBancoData = res
      if (res) {
        this.openMultiBancoModalAfterPayment(this.modalBancoModalAfterConfirm)
        this.mulltiBanccoPaytmentsuccfully(this.multiBancoData);
      }
      this.spinerrLoading = false;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });

  }
  api_ipaddress() {
    this.locationsService.api_ipaddress().subscribe((res: any) => {
      console.log(res)
      if (res.ip) {
        this._ip = res.ip;
      }
      this.spinerrLoading = false;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
  }

  openChangePAyloaModal(content: any) {
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;
    if (this.paymentWindiow3d) {
      console.log(this.localUserIds)

      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: 'static',
        keyboard: false,
      })
        .result.then((result) => {

        }, (reason) => {

        });
    }
  }
  getRandomColor() {
    var uniqueNo = Math.floor(0x1000000 * Math.random())
    return uniqueNo;
  }



  openMultiBancoModalAfterPayment(content: any) {
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: 'static',
      keyboard: false,
    })
      .result.then((result) => {

      }, (reason) => {

      });

    setInterval(() => {
      this.mulltiBanccoClosemode()
    }, 10000);
  }

  mulltiBanccoPaytmentsuccfully(myValue: any) {
    let reqData = {
      amount: myValue.amount,
      client: myValue.client,
      reference: myValue.reference,
      status: myValue.status
    }
    this.loading = true;
    console.log(reqData);
    this.locationsService.checkmb(reqData).subscribe((res: any) => {
      console.log("mulltiBanccoPaytmentsuccfully", res)
      this.loading = false;

    }, (err: any) => {
      this.loading = false;
    });
  }
  mulltiBanccoClosemode() {
    this.count=this.count+1
    this.modalService.dismissAll();
    this.mulltiBanccoPaytmentsuccfully(this.multiBancoData)
  }
  Api_balance() {
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;
    let reqData = {
      clientId: this.localUserIds,
    }
    this.loading = true;
    console.log(reqData);
    this.locationsService.Api_balance(reqData).subscribe((res: any) => {
      console.log("", res)
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
  }
}