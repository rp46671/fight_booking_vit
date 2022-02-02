import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  loading = false;
  @Output('isLoading') isLoadingEvent = new EventEmitter<boolean>();
  today = new Date().toISOString().split("T")[0];
  flightSearchFrom !: FormGroup;
  fromLocationArr: any = [];
  toLocationArr: any = [];
  adultsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  childArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  infantArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  isRoundTrip?: boolean = false;
  set_to_arrival_val_selected_item: string = 'all';
  set_form_depart_val_selected_item: string = 'all';

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  localUserIds: any;
  ngOnInit() {
    var localUserId: any = window.sessionStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    this.localUserIds = localUserId?.detail.id
    console.log("  this.localUserIds", this.localUserIds)
    this.buildForm();
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
      text: "Select Preferred Airline",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "custom-class"
    };
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

  constructor(
    private formBuilder: FormBuilder,
    private locationsService: LocationsService,
    private router: Router
  ) { }

  toggleRoundTrip(roundTrip: boolean) {
    this.isRoundTrip = roundTrip;
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
          let resArr: any[] = res;
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
    let formValue = this.flightSearchFrom.getRawValue();
    let reqData = {
      "user_id": this.localUserIds,
      "first_date": formValue.from_depart_date,
      "second_date": formValue.to_arrival_date,
      "source": this.set_form_depart_val_selected_item == 'individual' ? formValue.obj_form_depart.code : formValue.obj_form_depart.cityCode,
      "destination": this.set_to_arrival_val_selected_item == 'individual' ? formValue.obj_to_arrival.code : formValue.obj_to_arrival.cityCode,
      "adults": Number(formValue.adults),
      "infants": Number(formValue.infant),
      "bags": 1,
      "child": Number(formValue.child),
      "choose": formValue.flight_type,
      "vfr": formValue.vfr,
      "direct": formValue.direct,
      "airlines": formValue.preferred_carriers.map((item: any) => item.id),
      "class":formValue.class
    }

    window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
    this.loading = true;
    this.isLoadingEvent.emit(true);
    sessionStorage.setItem('search-flight-raw-data', JSON.stringify(this.flightSearchFrom.getRawValue()));
    this.locationsService.flight_search(reqData).subscribe((res: any) => {
      this.loading = false;
      this.isLoadingEvent.emit(false);
      this.router.navigate(['/flight-grid-left']);
    }, (err: any) => {
      this.loading = false;
      this.isLoadingEvent.emit(false);
      this.router.navigate(['/flight-grid-left']);
    });
  }

  set_form_depart_val(valueObj: any, selectedItem: string = 'individual') {
    valueObj['childArr'] = [];
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
}



    // <option value="AI">Air India</option>
    // <option value="BA">British Airways</option>
    // <option value="SN">Brussels Airline</option>
    // <option value="EK">Emirates</option>
    // <option value="EY">Etihad Airways</option>
    // <option value="AY">Finn Air</option>
    // <option value="KL">KLM Royal Dutch</option>
    // <option value="LH">Lufthansa Airline</option>
    // <option value="QR">Qatar Airways</option>
    // <option value="LX">Swiss Airline</option>
    // <option value="TG">Thai Airways</option>
    // <option value="TK">Turkish Airline</option>
    // <option value="HY">Uzbekistan Airways</option>
    // <option value="VS">Virgin Atlantic</option>
    // <option value="UK">Vistara</option>
    // <option value="FZ">Fly Dubai</option>