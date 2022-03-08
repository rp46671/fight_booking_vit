import { DatePipe, LocationStrategy } from '@angular/common';
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from 'src/app/providers/locations.service';
import moment from 'moment';
import { UserIdleService } from 'angular-user-idle';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit, OnDestroy {
  calenderShown: boolean = false;
  filterAsideBar = false;
  loading = false;
  @Output('isLoading') isLoadingEvent = new EventEmitter<boolean>();
  today = new Date().toISOString().split("T")[0];
  defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/"
  formatImage = ".png";
  public confirmResut?: string;
  public cusFlightblockArr: any[] = [];
  public cusFlightblockArrfilter: any[] = [];
  flightSearchFrom !: FormGroup;
  fromLocationArr: any = [];
  toLocationArr: any = [];
  adultsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  childArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  infantArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  isRoundTrip?: boolean = false;
  modifyValue: any;
  interval: any = null;
  viewDataAll: any;
  set_to_arrival_val_selected_item: string = 'all';
  set_form_depart_val_selected_item: string = 'all';
  calenderList: any[] = [];
  viewDataPrice: any;
  localUserIds: any;
  dep_code: any;
  arr_code: any;
  gds: any;
  Dep_date: any;
  arr_time: any;
  dep_time: any;
  loadingViewDta?: boolean;
  viewDataAll2?: any[];
  indexAll2: any;
  indexAll: any;
  formDataValue: any;
  cusFlightblockArrstop: any[] = [];
  cusFlightblockArrbaggage: any[] = [];
  StoreBaggadeInfomationArry: any[] = [];
  StoreStopsInfomationArry: any[] = [];
  StoreArrfilterInfomationArry: any[] = [];
  sendingArrayAirline: any[] = [];
  sendingArrayStops: any[] = [];
  sendingArrayBaggage: any[] = [];
  _price: any;
  viwItemData: any;
  directValue!: boolean;
  CheckedBaggageD!:boolean;
  constructor(
    private locationsService: LocationsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private locationStrategy: LocationStrategy,
    private _router: Router,
    private datePipe: DatePipe,
    private userIdle: UserIdleService
  ) {
    this.setTimeout();
    this.directValue=false;
    this.CheckedBaggageD=false;
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
  }

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  userActivity: any;

  userInactive: Subject<any> = new Subject();
  ngOnInit() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));



    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id;
    console.log(" this.localUserIds", this.localUserIds)
    this.buildForm();
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    this.load();
    this.Api_filter()

    this.interval = setInterval(() => {
      this.load(false);
      this.getCalender(this.localUserIds)

    }, 15000);

    console.log(" this.formDataValue", this.formDataValue)
    this.applyData(JSON.parse(data));
    this.getCalender(this.localUserIds);

    if (this.to_arrival_date?.value) {
      this.isRoundTrip = true;
    }

    this.dropdownList = [
      { "id": "AF", "itemName": "Air France" },
      { "id": "KL", "itemName": "KLM Royal Dutch Airlines" },
      { "id": "EK", "itemName": "Emirates" },
      { "id": "FZ", "itemName": "Fly Dubai" },
      { "id": "TP", "itemName": "TAP Portugal" },
      { "id": "QR", "itemName": "Qatar Airways" },
      { "id": "IB", "itemName": "Iberia Airlines" },
      { "id": "VY", "itemName": "Vueling Airline" },
      { "id": "AY", "itemName": "Finnair" },
      { "id": "LH", "itemName": "Lufthansa" },
      { "id": "LX", "itemName": "Swiss Air" },
      { "id": "UX", "itemName": "Air Europa" },
      { "id": "AI", "itemName": "Air India" },
      { "id": "AC", "itemName": "Air Canada" },
      { "id": "BA", "itemName": "British Airways" },
      { "id": "TK", "itemName": "Turkish Airlines" },
      { "id": "AZ", "itemName": "Alitalia" },
      { "id": "AT", "itemName": "Royal Air Maroc" },
      { "id": "DL", "itemName": "Delta Air Lines" },
      { "id": "SU", "itemName": "Aeroflot Airlines" },
      { "id": "SN", "itemName": "Brussels Airlines " },
      { "id": "HV", "itemName": "Transavia Airlines" },
      { "id": "EY", "itemName": "Etihad Airways" },
      { "id": "HY", "itemName": "Uzbekistan Airways" },
    ];

    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }


  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 8000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getBaggges(valu: any) {
    if (valu == "0" || valu == "") {
      return 'Not Include'
    } else {
      return valu
    }
  }
  showHideCalender() {
    this.calenderShown = !this.calenderShown
  }


  load(showLoad = true) {
   
    this.sendingArrayBaggage = [];
    this.sendingArrayStops = [];
    this.sendingArrayAirline = [];
    if (this.StoreBaggadeInfomationArry.length != 0) {
      this.StoreBaggadeInfomationArry.forEach((element, index) => {
        console.log(this.StoreBaggadeInfomationArry, "this.StoreBaggadeInfomationArry")
        if (element.isSelected == true) {
          this.sendingArrayBaggage.push(element.baggage)
        }
      });
    }
    if (this.StoreStopsInfomationArry.length != 0) {
      this.StoreStopsInfomationArry.forEach((element, index) => {
        if (element.isSelected) {
          this.sendingArrayStops.push(element.stop)
        }
      });
    }
    if (this.StoreArrfilterInfomationArry.length != 0) {
      this.StoreArrfilterInfomationArry.forEach((element, index) => {
        if (element.isSelected) {
          this.sendingArrayAirline.push(element.airline)
        }

      });
    }
    if (showLoad) {
      this.isLoadingEvent.emit(true);
    }
    this.locationsService.get_alll(this.localUserIds, this.sendingArrayStops, this.sendingArrayBaggage, this.sendingArrayAirline).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.cusFlightblockArr = res.detail;
     
      // this.cusFlightblockArrfilter = res.filter;
      // this.cusFlightblockArrfilter?.forEach(ele => {
      //   ele.isSelected = false;
      // });
      //  console.log("this.cusFlightblockArrfilter",this.cusFlightblockArrfilter)
      // this.changesArrfilterInfomationArry();
      // this.cusFlightblockArrbaggage = res.baggage;
      // this.cusFlightblockArrbaggage.forEach(ele => {
      //   ele.isSelected = false;
      // });
      // this.changesBaggadeInfomationArry();
      // this.cusFlightblockArrstop = res.stop;
      // this.cusFlightblockArrstop.forEach(ele => {
      //   ele.isSelected = false;
      // });
      // this.changesStopsInfomationArry();

    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.cusFlightblockArr = [];
      //   alert('Error');
    });


  }
  Api_filter() {
    this.locationsService.Api_filter(this.localUserIds, this.sendingArrayStops, this.sendingArrayBaggage, this.sendingArrayAirline).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.cusFlightblockArr = res.detail;
      this.cusFlightblockArrfilter = res.filter;
      this.cusFlightblockArrfilter?.forEach(ele => {
        ele.isSelected = false;
      });
      //  console.log("this.cusFlightblockArrfilter",this.cusFlightblockArrfilter)
      this.changesArrfilterInfomationArry();
      this.cusFlightblockArrbaggage = res.baggage;
      this.cusFlightblockArrbaggage.forEach(ele => {
        ele.isSelected = false;
      });
      this.changesBaggadeInfomationArry();
      this.cusFlightblockArrstop = res.stop;
      this.cusFlightblockArrstop.forEach(ele => {
        ele.isSelected = false;
      });
      this.changesStopsInfomationArry();

    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.cusFlightblockArr = [];
      //   alert('Error');
    });

  }
  fightDirect() {
    this.directValue = !this.directValue;
    if(this.directValue){
     this.load()
    }else{

    }
    console.log(" this.directValue ", this.directValue )
  }
  Checkedbaggage(){
    this.CheckedBaggageD=!this.CheckedBaggageD
    if(this.CheckedBaggageD){

    }else{

    }
  } 

  StoreBaggadeInfomation(val: any, event: any) {
    console.log("baggeee", event.target.checked);

    if (event.target.checked) {
      this.StoreBaggadeInfomationArry.push({ baggage: val, isSelected: event.target.checked })
      this.StoreBaggadeInfomationArry = this.StoreBaggadeInfomationArry.filter(
        (element, i) => i === this.StoreBaggadeInfomationArry.indexOf(element));
    } else {
      this.StoreBaggadeInfomationArry.forEach((element, index) => {
        if (element.baggage == val) this.StoreBaggadeInfomationArry.splice(index, 1);
      });
    }
    console.log(this.StoreBaggadeInfomationArry);
    //  this.changesBaggadeInfomationArry();
    this.load()
  }
  changesBaggadeInfomationArry() {
    for (let i = 0; i < this.cusFlightblockArrbaggage.length; i++) {
      for (let j = 0; j < this.StoreBaggadeInfomationArry.length; j++) {
        if (this.cusFlightblockArrbaggage[i].baggage === this.StoreBaggadeInfomationArry[j].baggage) {
          this.cusFlightblockArrbaggage[i].isSelected = true
        }
      }

    }
  }
  StoreStopsInfomation(val: any, event: any) {
    console.log("stop", event.target.checked);
    if (event.target.checked) {
      this.StoreStopsInfomationArry.push({ stop: val, isSelected: event.target.checked })
      this.StoreStopsInfomationArry = this.StoreStopsInfomationArry.filter(
        (element, i) => i === this.StoreStopsInfomationArry.indexOf(element));
    } else {
      this.StoreStopsInfomationArry.forEach((element, index) => {
        if (element.stop == val) this.StoreStopsInfomationArry.splice(index, 1);
      });
    }
    console.log(this.StoreStopsInfomationArry);
    //  this.changesStopsInfomationArry();
    this.load();
  }
  changesStopsInfomationArry() {
    for (let i = 0; i < this.cusFlightblockArrstop.length; i++) {
      for (let j = 0; j < this.StoreStopsInfomationArry.length; j++) {
        if (this.cusFlightblockArrstop[i].stop === this.StoreStopsInfomationArry[j].stop) {
          this.cusFlightblockArrstop[i].isSelected = true;

        }
      }

    }
  }
  StoreArrfilterInfomation(val: any, event: any) {
    console.log("airline", event.target.checked);
    if (event.target.checked) {
      this.StoreArrfilterInfomationArry.push({ airline: val, price: null, isSelected: event.target.checked })
      this.StoreArrfilterInfomationArry = this.StoreArrfilterInfomationArry.filter(
        (element, i) => i === this.StoreArrfilterInfomationArry.indexOf(element));
    } else {
      this.StoreArrfilterInfomationArry.forEach((element, index) => {
        if (element.airline == val) this.StoreArrfilterInfomationArry.splice(index, 1);
      });
    }
    console.log(this.StoreArrfilterInfomationArry);
    //this.changesArrfilterInfomationArry();
    this.load();
  }
  changesArrfilterInfomationArry() {
    for (let i = 0; i < this.cusFlightblockArrfilter.length; i++) {
      for (let j = 0; j < this.StoreArrfilterInfomationArry.length; j++) {
        if (this.cusFlightblockArrfilter[i].airline === this.StoreArrfilterInfomationArry[j].airline) {
          this.cusFlightblockArrfilter[i].isSelected = true
        }
      }
    }
  }
  toggleRoundTrip(roundTrip: boolean) {
    this.isRoundTrip = roundTrip;
  }

  applyData(data: any) {
    if (data) {
      this.flightSearchFrom.setValue(data);
      this.modifyValue = this.flightSearchFrom.getRawValue();
    }
  }

  get flight_type() { return this.flightSearchFrom?.get('flight_type'); }
  get form_depart() { return this.flightSearchFrom?.get('form_depart'); }
  get obj_form_depart() { return this.flightSearchFrom?.get('obj_form_depart'); }
  get to_arrival() { return this.flightSearchFrom?.get('to_arrival'); }
  get obj_to_arrival() { return this.flightSearchFrom?.get('obj_to_arrival'); }
  get from_depart_date() { return this.flightSearchFrom?.get('from_depart_date'); }
  get to_arrival_date() { return this.flightSearchFrom?.get('to_arrival_date'); }
  get preferred_carriers() { return this.flightSearchFrom?.get('preferred_carriers'); }
  get class() { return this.flightSearchFrom?.get('class'); }
  get adults() { return this.flightSearchFrom?.get('adults'); }
  get child() { return this.flightSearchFrom?.get('child'); }
  get infant() { return this.flightSearchFrom?.get('infant'); }
  get vfr() { return this.flightSearchFrom?.get('vfr'); }
  get direct() { return this.flightSearchFrom?.get('direct'); }

  buildForm() {
    this.flightSearchFrom = this.formBuilder.group({
      flight_type: ['One Way', Validators.required],
      form_depart: ['', Validators.required],
      obj_form_depart: ['', Validators.required],
      to_arrival: ['', Validators.required],
      obj_to_arrival: ['', Validators.required],
      from_depart_date: ['', Validators.required],
      to_arrival_date: [''],
      preferred_carriers: [[]],
      class: ['Y', Validators.required],
      adults: [1, Validators.required],
      child: [0, Validators.required],
      infant: [0, Validators.required],
      vfr: [false],
      direct: [false]

      //infant_ptc: [null, Validators.required],
      //child_ptc: ['', Validators.required],
      // adult_ptc: ['', Validators.required],
    });
  }

  onChangeAdults(event: any) {
    let value = event.target.value;
    console.log(value);
    this.childArray = [];
    this.infantArray = [];
    this.child?.setValue(0);
    this.infant?.setValue(0)
    let totalvalue = 9 - value;
    for (let i = 0; i <= totalvalue; i++) {
      this.childArray.push(i);
    }
    for (let i = 0; i <= value; i++) {
      this.infantArray.push(i);
    }
  }

  getFromLocationByCode(fromLocationCode: string) {
    fromLocationCode = fromLocationCode.trim();
    if (fromLocationCode.length >= 3) {
      this.locationsService.getLocation(fromLocationCode).subscribe(
        (res: any) => {
          let resArr: any[] = [];
          resArr = res;
          let unique: any[] = resArr.filter((value: any, index: number, self: any) => {
            return self.findIndex((ele: any) => ele.cityName === value.cityName) === index;
          });
          unique.forEach(uniqueEle => {
            uniqueEle['childArr'] = [];
            resArr.forEach(resArrEle => {
              if (uniqueEle.cityName === resArrEle.cityName) {
                uniqueEle['childArr'].push(resArrEle);
              }
            })
          });
          this.fromLocationArr = unique;
        }
      );
    } else {
      this.fromLocationArr = [];
    }
  }

  getToLocationByCode(fromLocationCode: string) {
    fromLocationCode = fromLocationCode.trim();
    if (fromLocationCode.length >= 3) {
      this.locationsService.getLocation(fromLocationCode).subscribe(
        (res: any) => {
          let resArr: any[] = res;
          let unique: any[] = resArr.filter((value: any, index: number, self: any) => {
            return self.findIndex((ele: any) => ele.cityName === value.cityName) === index;
          }).map(ele => ele);
          unique.forEach(uniqueEle => {
            uniqueEle['childArr'] = [];
            resArr.forEach(resArrEle => {
              if (uniqueEle.cityName === resArrEle.cityName) {
                uniqueEle['childArr'].push(resArrEle);
              }
            })
          });
          this.toLocationArr = unique;
        }
      );
    } else {
      this.toLocationArr = [];
    }
  }

  flightSearchFromSub() {
    this.cusFlightblockArr = [];
    let formValue = this.flightSearchFrom.getRawValue();
    let reqData = {
      "user_id": this.localUserIds,
      "first_date": formValue.from_depart_date,
      "second_date": formValue.to_arrival_date == "" || !this.isRoundTrip ? null : formValue.to_arrival_date,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id),
      "class": formValue.class
    }

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));

    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    window.sessionStorage.removeItem('confirmBookFlightData');

    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      // this.router.navigate(['/flight-grid-left']);
      this.load();
      this.getCalender(this.localUserIds);
    }, (err: any) => {
      // this.router.navigate(['/flight-grid-left']);
      this.load();
      this.getCalender(this.localUserIds);
    });
  }

  set_form_depart_val(valueObj: any, selectedItem: string = 'individual') {
    valueObj['childArr'] = [];
    console.log("selectedItem",selectedItem)
    this.obj_form_depart?.setValue(valueObj);
    this.set_form_depart_val_selected_item = selectedItem;
    if (selectedItem == 'individual') {
      this.form_depart?.setValue(valueObj.name + ` (${valueObj.code})`);
    } else {
      this.form_depart?.setValue(valueObj.cityName + ` (${valueObj.cityCode})`);
    }
    this.fromLocationArr = [];
  }

  set_to_arrival_val(valueObj: any, selectedItem: string = 'individual') {
    valueObj['childArr'] = [];
    this.obj_to_arrival?.setValue(valueObj);
    this.set_to_arrival_val_selected_item = selectedItem;
    if (selectedItem == 'individual') {
      this.to_arrival?.setValue(valueObj.name + ` (${valueObj.code})`);
    } else {
      this.to_arrival?.setValue(valueObj.cityName + ` (${valueObj.cityCode})`);
    }
    this.toLocationArr = [];
  }

  reset_from_depart_date() {
    this.to_arrival_date?.setValue(null);
  }

  openModifySearch(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: false, centered: true,

    }).result.then((result) => {
      this.confirmResut = `Closed with: ${result}`;

    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });
  }
  openTaxModal(content: any, item: any) {
    if (item.gds == "gal") {
      let reqData = {
        "bag_ref_no": item.bag_ref_no,
        "flgith_idd": item.flight_id,
        "flight_rec": item.flight_rec,
        "session": item.session
      }
      this.locationsService.Api_viewgaleusprice_api(reqData).subscribe((res: any) => {
        this.viewDataPrice = res.detail;
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
        console.log(" this.viewDataPrice", this.viewDataPrice)
      }, (err: any) => {
      });
    }
    else {
      alert("No data found")
    }
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'md', scrollable: false, centered: false,
    }).result.then((result) => {
      this.confirmResut = `Closed with: ${result}`;
    }, (reason) => {
      this.confirmResut = `Dismissed with: ${reason}`;
    });
  }



  viewData(content: any, item: any) {
    this.viwItemData = item
    this.loadingViewDta = true;
    this.viewDataAll = [];
    this.viewDataAll2 = [];
    this.indexAll2 = [];
    this.indexAll2 = [];
    this.arr_code = item.arr_code;
    this.dep_code = item.dep_code;
    this.gds = item.gds;
    this.Dep_date = item.Dep_date
    this.arr_time = item.arr_time
    this.dep_time = item.dep_time
    this._price = item.price

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
      alert("No data found")
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

  navToBookFlight(item: any) {
    window.sessionStorage.setItem('bookFlight', JSON.stringify(item));
    this._router.navigate(['/booking']);
  }

  preDeparterDateflightSearchFromSub() {
    this.loading=true;
    this.cusFlightblockArr = [];
    let formValue = this.flightSearchFrom.getRawValue();
    var new_date: any = moment(formValue.from_depart_date).subtract(1, 'days');
    let new_date2 = this.datePipe.transform(new_date, "yyyy-MM-dd");

    let reqData = {
      "user_id": this.localUserIds,
      "first_date": new_date2,
      "second_date": formValue.to_arrival_date == "" || !this.isRoundTrip ? null : formValue.to_arrival_date,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id),
      "class": formValue.class
    }

    formValue['from_depart_date'] = new_date2;
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
    this.applyData(formValue);
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    console.log(" this.formDataValue this.formDataValue", this.formDataValue)
    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    window.sessionStorage.removeItem('confirmBookFlightData');
    this.isLoadingEvent.emit(true);
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
      this.loading=false;
    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
      this.loading=false;
    });
  }
  nextDeparterDateflightSearchFromSub() {
    this.loading=true;
    this.cusFlightblockArr = [];
    let formValue = this.flightSearchFrom.getRawValue();
    var new_date: any = moment(formValue.from_depart_date).add(1, 'days');
    let new_date2 = this.datePipe.transform(new_date, "yyyy-MM-dd")

    let reqData = {
      "user_id": this.localUserIds,
      "first_date": new_date2,
      "second_date": formValue.to_arrival_date == "" || !this.isRoundTrip ? null : formValue.to_arrival_date,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id)
    }

    formValue['from_depart_date'] = new_date2;
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
    this.applyData(formValue);

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    window.sessionStorage.removeItem('confirmBookFlightData');
    this.isLoadingEvent.emit(true);
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.loading=false;
      this.getCalender(this.localUserIds);
    }, (err: any) => {

      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
      this.loading=false;
    });
  }

  preReturnDateflightSearchFromSub() {
    this.loading=true;
    this.cusFlightblockArr = [];
    let formValue = this.flightSearchFrom.getRawValue();

    var to_arrival_date: any;
    let to_arrival_date2: any;
    if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
      to_arrival_date = moment(formValue.to_arrival_date).subtract(1, 'days');
      to_arrival_date2 = this.datePipe.transform(to_arrival_date, "yyyy-MM-dd");
    }

    let reqData = {
      "user_id": this.localUserIds,
      "first_date": formValue.from_depart_date,
      "second_date": formValue.to_arrival_date == "" || !this.isRoundTrip ? null : to_arrival_date2,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id),
      "class": formValue.class
    }

    if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
      formValue['to_arrival_date'] = to_arrival_date2;
    } else {
      formValue['to_arrival_date'] = null;
    }
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
    this.applyData(formValue);

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    window.sessionStorage.removeItem('confirmBookFlightData');

    this.isLoadingEvent.emit(true);
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
      this.loading=false;
    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.loading=false;
      this.getCalender(this.localUserIds);
    });
  }
  nextReturnDateflightSearchFromSub() {
    this.cusFlightblockArr = [];
    this.loading=true;
    let formValue = this.flightSearchFrom.getRawValue();

    var to_arrival_date: any;
    let to_arrival_date2: any;
    if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
      to_arrival_date = moment(formValue.to_arrival_date).add(1, 'days');
      to_arrival_date2 = this.datePipe.transform(to_arrival_date, "yyyy-MM-dd");
    }

    let reqData = {
      "user_id": this.localUserIds,
      "first_date": formValue.from_depart_date,
      "second_date": formValue.to_arrival_date == "" || !this.isRoundTrip ? null : to_arrival_date2,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id)
    }

    if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
      formValue['to_arrival_date'] = to_arrival_date2;
    } else {
      formValue['to_arrival_date'] = null;
    }
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
    this.applyData(formValue);
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    window.sessionStorage.removeItem('confirmBookFlightData');
    this.isLoadingEvent.emit(true);
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.loading=false;
      this.getCalender(this.localUserIds);
    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.loading=false;
      this.getCalender(this.localUserIds);
    });
  }

  dateSerachFromCalendar(dateValue: any) {
    console.log("dateSerachFromCalendar", dateValue)
    let formValue = this.flightSearchFrom.getRawValue();
    let new_date2 = dateValue
    console.log("new_date2", new_date2)

    let reqData = {
      "user_id": this.localUserIds,
      "first_date": new_date2,
      "second_date": "",
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": !this.isRoundTrip ? "One Way" : "round",
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id),
      "class": formValue.class
    }
    formValue['from_depart_date'] = new_date2;
    window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
    this.applyData(formValue);
    let data: any = window.sessionStorage.getItem('search-flight-raw-data');
    this.formDataValue = JSON.parse(data);

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    window.sessionStorage.removeItem('confirmBookFlightData');
    this.isLoadingEvent.emit(true);
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
      this.getCalender(this.localUserIds);
    });
  }

  getCalender(value: any) {
    // this.calenderList=[];
    this.isLoadingEvent.emit(true);
    this.locationsService.get_calander(value).subscribe((res: any) => {
      this.calenderList = res;
      this.isLoadingEvent.emit(false);
      this.load();
    }, (err: any) => {
      this.isLoadingEvent.emit(false);
      this.load();
    });
  }
  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
