"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment_1 = require("moment");
var rxjs_1 = require("rxjs");
var ContentComponent = /** @class */ (function () {
    function ContentComponent(locationsService, formBuilder, modalService, locationStrategy, _router, datePipe, userIdle) {
        this.locationsService = locationsService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.locationStrategy = locationStrategy;
        this._router = _router;
        this.datePipe = datePipe;
        this.userIdle = userIdle;
        this.calenderShown = false;
        this.filterAsideBar = false;
        this.loading = false;
        this.isLoadingEvent = new core_1.EventEmitter();
        this.today = new Date().toISOString().split("T")[0];
        this.defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/";
        this.formatImage = ".png";
        this.cusFlightblockArr = [];
        this.cusFlightblockArrfilter = [];
        this.fromLocationArr = [];
        this.toLocationArr = [];
        this.adultsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.childArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.infantArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.isRoundTrip = false;
        this.interval = null;
        this.set_to_arrival_val_selected_item = 'all';
        this.set_form_depart_val_selected_item = 'all';
        this.calenderList = [];
        this.cusFlightblockArrstop = [];
        this.cusFlightblockArrbaggage = [];
        this.StoreBaggadeInfomationArry = [];
        this.StoreStopsInfomationArry = [];
        this.StoreArrfilterInfomationArry = [];
        this.sendingArrayAirline = [];
        this.sendingArrayStops = [];
        this.sendingArrayBaggage = [];
        this.count = 0;
        this.interval2 = null;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.userInactive = new rxjs_1.Subject();
        this.setTimeout();
        this.directValue = false;
        this.CheckedBaggageD = false;
        this.userInactive.subscribe(function () { return console.log('user has been inactive for 3s'); });
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        history.pushState(null, '', location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, '', location.href);
        });
        this.userIdle.startWatching();
        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(function (count) { return console.log(count); });
        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(function () { return console.log('Time is up!'); });
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        console.log(" this.localUserIds", this.localUserIds);
        this.buildForm();
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        this.load();
        this.Api_filter();
        this.interval = setInterval(function () {
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        }, 1000);
        this.interval2 = setInterval(function () {
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        }, 15000);
        console.log(" this.formDataValue", this.formDataValue);
        this.applyData(JSON.parse(data));
        this.getCalender(this.localUserIds);
        if ((_a = this.to_arrival_date) === null || _a === void 0 ? void 0 : _a.value) {
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
    };
    ContentComponent.prototype.setTimeout = function () {
        var _this = this;
        this.userActivity = setTimeout(function () { return _this.userInactive.next(undefined); }, 8000);
    };
    ContentComponent.prototype.refreshUserState = function () {
        clearTimeout(this.userActivity);
        this.setTimeout();
    };
    ContentComponent.prototype.onItemSelect = function (item) {
        console.log(item);
        console.log(this.selectedItems);
    };
    ContentComponent.prototype.OnItemDeSelect = function (item) {
        console.log(item);
        console.log(this.selectedItems);
    };
    ContentComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    ContentComponent.prototype.onDeSelectAll = function (items) {
        console.log(items);
    };
    ContentComponent.prototype.ngOnDestroy = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    ContentComponent.prototype.getBaggges = function (valu) {
        if (valu == "0" || valu == "") {
            return 'Not Include';
        }
        else {
            return valu;
        }
    };
    ContentComponent.prototype.showHideCalender = function () {
        this.calenderShown = !this.calenderShown;
    };
    ContentComponent.prototype.load = function (showLoad) {
        var _this = this;
        if (showLoad === void 0) { showLoad = true; }
        this.sendingArrayBaggage = [];
        this.sendingArrayStops = [];
        this.sendingArrayAirline = [];
        if (this.StoreBaggadeInfomationArry.length != 0) {
            this.StoreBaggadeInfomationArry.forEach(function (element, index) {
                console.log(_this.StoreBaggadeInfomationArry, "this.StoreBaggadeInfomationArry");
                if (element.isSelected == true) {
                    _this.sendingArrayBaggage.push(element.baggage);
                }
            });
        }
        if (this.StoreStopsInfomationArry.length != 0) {
            this.StoreStopsInfomationArry.forEach(function (element, index) {
                if (element.isSelected) {
                    _this.sendingArrayStops.push(element.stop);
                }
            });
        }
        if (this.StoreArrfilterInfomationArry.length != 0) {
            this.StoreArrfilterInfomationArry.forEach(function (element, index) {
                if (element.isSelected) {
                    _this.sendingArrayAirline.push(element.airline);
                }
            });
        }
        if (showLoad) {
            this.isLoadingEvent.emit(true);
        }
        this.locationsService.get_alll(this.localUserIds, this.sendingArrayStops, this.sendingArrayBaggage, this.sendingArrayAirline).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.cusFlightblockArr = [];
            _this.cusFlightblockArr = res.detail;
            if (_this.cusFlightblockArr) {
                _this.pauseTimeLine();
            }
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.cusFlightblockArr = [];
            //   alert('Error');
        });
    };
    ContentComponent.prototype.Api_filter = function () {
        var _this = this;
        this.locationsService.Api_filter(this.localUserIds, this.sendingArrayStops, this.sendingArrayBaggage, this.sendingArrayAirline).subscribe(function (res) {
            var _a;
            _this.isLoadingEvent.emit(false);
            _this.cusFlightblockArr = res.detail;
            _this.cusFlightblockArrfilter = res.filter;
            (_a = _this.cusFlightblockArrfilter) === null || _a === void 0 ? void 0 : _a.forEach(function (ele) {
                ele.isSelected = false;
            });
            //  console.log("this.cusFlightblockArrfilter",this.cusFlightblockArrfilter)
            _this.changesArrfilterInfomationArry();
            _this.cusFlightblockArrbaggage = res.baggage;
            _this.cusFlightblockArrbaggage.forEach(function (ele) {
                ele.isSelected = false;
            });
            _this.changesBaggadeInfomationArry();
            _this.cusFlightblockArrstop = res.stop;
            _this.cusFlightblockArrstop.forEach(function (ele) {
                ele.isSelected = false;
            });
            _this.changesStopsInfomationArry();
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.cusFlightblockArr = [];
            //   alert('Error');
        });
    };
    ContentComponent.prototype.fightDirect = function () {
        this.directValue = !this.directValue;
        if (this.directValue) {
            this.load();
        }
        else {
        }
        console.log(" this.directValue ", this.directValue);
    };
    ContentComponent.prototype.Checkedbaggage = function () {
        this.CheckedBaggageD = !this.CheckedBaggageD;
        if (this.CheckedBaggageD) {
        }
        else {
        }
    };
    ContentComponent.prototype.StoreBaggadeInfomation = function (val, event) {
        var _this = this;
        console.log("baggeee", event.target.checked);
        if (event.target.checked) {
            this.StoreBaggadeInfomationArry.push({ baggage: val, isSelected: event.target.checked });
            this.StoreBaggadeInfomationArry = this.StoreBaggadeInfomationArry.filter(function (element, i) { return i === _this.StoreBaggadeInfomationArry.indexOf(element); });
        }
        else {
            this.StoreBaggadeInfomationArry.forEach(function (element, index) {
                if (element.baggage == val)
                    _this.StoreBaggadeInfomationArry.splice(index, 1);
            });
        }
        console.log(this.StoreBaggadeInfomationArry);
        //  this.changesBaggadeInfomationArry();
        this.load();
    };
    ContentComponent.prototype.changesBaggadeInfomationArry = function () {
        for (var i = 0; i < this.cusFlightblockArrbaggage.length; i++) {
            for (var j = 0; j < this.StoreBaggadeInfomationArry.length; j++) {
                if (this.cusFlightblockArrbaggage[i].baggage === this.StoreBaggadeInfomationArry[j].baggage) {
                    this.cusFlightblockArrbaggage[i].isSelected = true;
                }
            }
        }
    };
    ContentComponent.prototype.StoreStopsInfomation = function (val, event) {
        var _this = this;
        console.log("stop", event.target.checked);
        if (event.target.checked) {
            this.StoreStopsInfomationArry.push({ stop: val, isSelected: event.target.checked });
            this.StoreStopsInfomationArry = this.StoreStopsInfomationArry.filter(function (element, i) { return i === _this.StoreStopsInfomationArry.indexOf(element); });
        }
        else {
            this.StoreStopsInfomationArry.forEach(function (element, index) {
                if (element.stop == val)
                    _this.StoreStopsInfomationArry.splice(index, 1);
            });
        }
        console.log(this.StoreStopsInfomationArry);
        //  this.changesStopsInfomationArry();
        this.load();
    };
    ContentComponent.prototype.changesStopsInfomationArry = function () {
        for (var i = 0; i < this.cusFlightblockArrstop.length; i++) {
            for (var j = 0; j < this.StoreStopsInfomationArry.length; j++) {
                if (this.cusFlightblockArrstop[i].stop === this.StoreStopsInfomationArry[j].stop) {
                    this.cusFlightblockArrstop[i].isSelected = true;
                }
            }
        }
    };
    ContentComponent.prototype.StoreArrfilterInfomation = function (val, event) {
        var _this = this;
        console.log("airline", event.target.checked);
        if (event.target.checked) {
            this.StoreArrfilterInfomationArry.push({ airline: val, price: null, isSelected: event.target.checked });
            this.StoreArrfilterInfomationArry = this.StoreArrfilterInfomationArry.filter(function (element, i) { return i === _this.StoreArrfilterInfomationArry.indexOf(element); });
        }
        else {
            this.StoreArrfilterInfomationArry.forEach(function (element, index) {
                if (element.airline == val)
                    _this.StoreArrfilterInfomationArry.splice(index, 1);
            });
        }
        console.log(this.StoreArrfilterInfomationArry);
        //this.changesArrfilterInfomationArry();
        this.load();
    };
    ContentComponent.prototype.changesArrfilterInfomationArry = function () {
        for (var i = 0; i < this.cusFlightblockArrfilter.length; i++) {
            for (var j = 0; j < this.StoreArrfilterInfomationArry.length; j++) {
                if (this.cusFlightblockArrfilter[i].airline === this.StoreArrfilterInfomationArry[j].airline) {
                    this.cusFlightblockArrfilter[i].isSelected = true;
                }
            }
        }
    };
    ContentComponent.prototype.toggleRoundTrip = function (roundTrip) {
        this.isRoundTrip = roundTrip;
    };
    ContentComponent.prototype.applyData = function (data) {
        if (data) {
            this.flightSearchFrom.setValue(data);
            this.modifyValue = this.flightSearchFrom.getRawValue();
        }
    };
    Object.defineProperty(ContentComponent.prototype, "flight_type", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('flight_type'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "form_depart", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('form_depart'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "obj_form_depart", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('obj_form_depart'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "to_arrival", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('to_arrival'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "obj_to_arrival", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('obj_to_arrival'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "from_depart_date", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('from_depart_date'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "to_arrival_date", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('to_arrival_date'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "preferred_carriers", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('preferred_carriers'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "class", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('class'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "adults", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('adults'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "child", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('child'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "infant", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('infant'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "vfr", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('vfr'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "direct", {
        get: function () { var _a; return (_a = this.flightSearchFrom) === null || _a === void 0 ? void 0 : _a.get('direct'); },
        enumerable: false,
        configurable: true
    });
    ContentComponent.prototype.buildForm = function () {
        this.flightSearchFrom = this.formBuilder.group({
            flight_type: ['One Way', forms_1.Validators.required],
            form_depart: ['', forms_1.Validators.required],
            obj_form_depart: ['', forms_1.Validators.required],
            to_arrival: ['', forms_1.Validators.required],
            obj_to_arrival: ['', forms_1.Validators.required],
            from_depart_date: ['', forms_1.Validators.required],
            to_arrival_date: [''],
            preferred_carriers: [[]],
            "class": ['Y', forms_1.Validators.required],
            adults: [1, forms_1.Validators.required],
            child: [0, forms_1.Validators.required],
            infant: [0, forms_1.Validators.required],
            vfr: [false],
            direct: [false]
            //infant_ptc: [null, Validators.required],
            //child_ptc: ['', Validators.required],
            // adult_ptc: ['', Validators.required],
        });
    };
    ContentComponent.prototype.onChangeAdults = function (event) {
        var _a, _b;
        var value = event.target.value;
        console.log(value);
        this.childArray = [];
        this.infantArray = [];
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.setValue(0);
        (_b = this.infant) === null || _b === void 0 ? void 0 : _b.setValue(0);
        var totalvalue = 9 - value;
        for (var i = 0; i <= totalvalue; i++) {
            this.childArray.push(i);
        }
        for (var i = 0; i <= value; i++) {
            this.infantArray.push(i);
        }
    };
    ContentComponent.prototype.getFromLocationByCode = function (fromLocationCode) {
        var _this = this;
        fromLocationCode = fromLocationCode.trim();
        if (fromLocationCode.length >= 3) {
            this.locationsService.getLocation(fromLocationCode).subscribe(function (res) {
                var resArr = [];
                resArr = res;
                var unique = resArr.filter(function (value, index, self) {
                    return self.findIndex(function (ele) { return ele.cityName === value.cityName; }) === index;
                });
                unique.forEach(function (uniqueEle) {
                    uniqueEle['childArr'] = [];
                    resArr.forEach(function (resArrEle) {
                        if (uniqueEle.cityName === resArrEle.cityName) {
                            uniqueEle['childArr'].push(resArrEle);
                        }
                    });
                });
                _this.fromLocationArr = unique;
            });
        }
        else {
            this.fromLocationArr = [];
        }
    };
    ContentComponent.prototype.getToLocationByCode = function (fromLocationCode) {
        var _this = this;
        fromLocationCode = fromLocationCode.trim();
        if (fromLocationCode.length >= 3) {
            this.locationsService.getLocation(fromLocationCode).subscribe(function (res) {
                var resArr = res;
                var unique = resArr.filter(function (value, index, self) {
                    return self.findIndex(function (ele) { return ele.cityName === value.cityName; }) === index;
                }).map(function (ele) { return ele; });
                unique.forEach(function (uniqueEle) {
                    uniqueEle['childArr'] = [];
                    resArr.forEach(function (resArrEle) {
                        if (uniqueEle.cityName === resArrEle.cityName) {
                            uniqueEle['childArr'].push(resArrEle);
                        }
                    });
                });
                _this.toLocationArr = unique;
            });
        }
        else {
            this.toLocationArr = [];
        }
    };
    ContentComponent.prototype.flightSearchFromSub = function () {
        var _this = this;
        this.cusFlightblockArr = [];
        //this.loading=true;
        var formValue = this.flightSearchFrom.getRawValue();
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; }),
            "class": formValue["class"]
        };
        this.deletFunction(reqData);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.cusFlightblockArr = [];
        this.load();
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.load();
            _this.getCalender(_this.localUserIds);
            _this.loading = false;
        }, function (err) {
            _this.load();
            _this.getCalender(_this.localUserIds);
            _this.loading = false;
        });
    };
    ContentComponent.prototype.set_form_depart_val = function (valueObj, selectedItem) {
        var _a, _b, _c;
        if (selectedItem === void 0) { selectedItem = 'individual'; }
        valueObj['childArr'] = [];
        console.log("selectedItem", selectedItem);
        (_a = this.obj_form_depart) === null || _a === void 0 ? void 0 : _a.setValue(valueObj);
        this.set_form_depart_val_selected_item = selectedItem;
        if (selectedItem == 'individual') {
            (_b = this.form_depart) === null || _b === void 0 ? void 0 : _b.setValue(valueObj.name + (" (" + valueObj.code + ")"));
        }
        else {
            (_c = this.form_depart) === null || _c === void 0 ? void 0 : _c.setValue(valueObj.cityName + (" (" + valueObj.cityCode + ")"));
        }
        this.fromLocationArr = [];
    };
    ContentComponent.prototype.set_to_arrival_val = function (valueObj, selectedItem) {
        var _a, _b, _c;
        if (selectedItem === void 0) { selectedItem = 'individual'; }
        valueObj['childArr'] = [];
        (_a = this.obj_to_arrival) === null || _a === void 0 ? void 0 : _a.setValue(valueObj);
        this.set_to_arrival_val_selected_item = selectedItem;
        if (selectedItem == 'individual') {
            (_b = this.to_arrival) === null || _b === void 0 ? void 0 : _b.setValue(valueObj.name + (" (" + valueObj.code + ")"));
        }
        else {
            (_c = this.to_arrival) === null || _c === void 0 ? void 0 : _c.setValue(valueObj.cityName + (" (" + valueObj.cityCode + ")"));
        }
        this.toLocationArr = [];
    };
    ContentComponent.prototype.reset_from_depart_date = function () {
        var _a;
        (_a = this.to_arrival_date) === null || _a === void 0 ? void 0 : _a.setValue(null);
    };
    ContentComponent.prototype.openModifySearch = function (content) {
        var _this = this;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: false, centered: true
        }).result.then(function (result) {
            _this.flightSearchFromSub();
            _this.confirmResut = "Closed with: " + result;
        }, function (reason) {
            _this.confirmResut = "Dismissed with: " + reason;
        });
    };
    ContentComponent.prototype.openTaxModal = function (content, item) {
        var _this = this;
        if (item.gds == "gal") {
            var reqData = {
                "bag_ref_no": item.bag_ref_no,
                "flgith_idd": item.flight_id,
                "flight_rec": item.flight_rec,
                "session": item.session
            };
            this.locationsService.Api_viewgaleusprice_api(reqData).subscribe(function (res) {
                _this.viewDataPrice = res.detail;
                console.log(" this.viewDataPrice", _this.viewDataPrice);
            }, function (err) {
            });
        }
        else if (item.gds == "ama") {
            var reqData = {
                "bag_ref_no": item.bag_ref_no,
                "flgith_idd": item.flight_id,
                "flight_rec": item.flight_rec,
                "session": item.session
            };
            this.locationsService.Api_viewamadeusprice_api(reqData).subscribe(function (res) {
                _this.viewDataPrice = res;
                console.log(" this.viewDataPrice", _this.viewDataPrice);
            }, function (err) {
            });
        }
        else {
            alert("No data found");
        }
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', size: 'md', scrollable: false, centered: false
        }).result.then(function (result) {
            _this.confirmResut = "Closed with: " + result;
        }, function (reason) {
            _this.confirmResut = "Dismissed with: " + reason;
        });
    };
    ContentComponent.prototype.viewData = function (content, item) {
        var _this = this;
        this.viwItemData = item;
        this.loadingViewDta = true;
        this.viewDataAll = [];
        this.viewDataAll2 = [];
        this.indexAll2 = [];
        this.indexAll2 = [];
        this.arr_code = item.arr_code;
        this.dep_code = item.dep_code;
        this.gds = item.gds;
        this.Dep_date = item.Dep_date;
        this.arr_time = item.arr_time;
        this.dep_time = item.dep_time;
        this._price = item.price;
        if (item.gds == "gal") {
            var reqData = {
                "flgith_id": item.flight_id,
                "flight_rec": item.flight_rec,
                "gds": item.gds,
                "myAirSegment1": item.myAirSegment1,
                "myAirSegment2": item.myAirSegment2,
                "price": item.price,
                "unique_id": this.localUserIds,
                "session": item.session
            };
            this.locationsService.Api_viewgaleus(reqData).subscribe(function (res) {
                _this.viewDataAll = res.detail;
                _this.viewDataAll2 = res.detail1;
                _this.indexAll = res.index1;
                _this.indexAll2 = res.index2;
                _this.loadingViewDta = false;
                console.log(" this.viewDataAll", _this.viewDataAll);
            }, function (err) {
                _this.loadingViewDta = true;
            });
        }
        else if (item.gds == "ama") {
            var reqData = {
                "bag_ref_no": item.bag_ref_no,
                "bag_ref_no_rt": item.bag_ref_no,
                "flight_id": item.flight_id,
                "flight_id_rt": item.flight_id_rt,
                "flight_rec": item.flight_rec,
                "gds": item.gds,
                "price": item.price,
                "session": item.session,
                "unique_id": this.localUserIds
            };
            this.locationsService.Api_viewamadeus(reqData).subscribe(function (res) {
                _this.viewDataAll = res.detail;
                _this.viewDataAll2 = res.detail1;
                _this.indexAll = res.index1;
                _this.indexAll2 = res.index2;
                _this.loadingViewDta = false;
                console.log(" this.viewDataAll", _this.viewDataAll);
            }, function (err) {
                _this.loadingViewDta = true;
            });
        }
        else {
            alert("No data found");
            this.loadingViewDta = true;
        }
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true
        }).result.then(function (result) {
            _this.confirmResut = "Closed with: " + result;
        }, function (reason) {
            _this.confirmResut = "Dismissed with: " + reason;
        });
    };
    ContentComponent.prototype.navToBookFlight = function (item) {
        window.sessionStorage.setItem('bookFlight', JSON.stringify(item));
        this._router.navigate(['/booking']);
    };
    ContentComponent.prototype.preDeparterDateflightSearchFromSub = function () {
        var _this = this;
        this.loading = true;
        this.cusFlightblockArr = [];
        var formValue = this.flightSearchFrom.getRawValue();
        var new_date = moment_1["default"](formValue.from_depart_date).subtract(1, 'days');
        var new_date2 = this.datePipe.transform(new_date, "yyyy-MM-dd");
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; }),
            "class": formValue["class"]
        };
        this.deletFunction(reqData);
        formValue['from_depart_date'] = new_date2;
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        this.applyData(formValue);
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        console.log(" this.formDataValue this.formDataValue", this.formDataValue);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.isLoadingEvent.emit(true);
        this.load();
        this.loading = false;
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.getCalender(_this.localUserIds);
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.getCalender(_this.localUserIds);
            _this.loading = false;
        });
    };
    ContentComponent.prototype.nextDeparterDateflightSearchFromSub = function () {
        var _this = this;
        this.loading = true;
        this.cusFlightblockArr = [];
        var formValue = this.flightSearchFrom.getRawValue();
        var new_date = moment_1["default"](formValue.from_depart_date).add(1, 'days');
        var new_date2 = this.datePipe.transform(new_date, "yyyy-MM-dd");
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; })
        };
        this.deletFunction(reqData);
        formValue['from_depart_date'] = new_date2;
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        this.applyData(formValue);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.load();
        this.loading = false;
        this.isLoadingEvent.emit(true);
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.loading = false;
            _this.getCalender(_this.localUserIds);
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.getCalender(_this.localUserIds);
            _this.loading = false;
        });
    };
    ContentComponent.prototype.preReturnDateflightSearchFromSub = function () {
        var _this = this;
        this.loading = true;
        this.cusFlightblockArr = [];
        var formValue = this.flightSearchFrom.getRawValue();
        var to_arrival_date;
        var to_arrival_date2;
        if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
            to_arrival_date = moment_1["default"](formValue.to_arrival_date).subtract(1, 'days');
            to_arrival_date2 = this.datePipe.transform(to_arrival_date, "yyyy-MM-dd");
        }
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; }),
            "class": formValue["class"]
        };
        this.deletFunction(reqData);
        if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
            formValue['to_arrival_date'] = to_arrival_date2;
        }
        else {
            formValue['to_arrival_date'] = null;
        }
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        this.applyData(formValue);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.load();
        this.loading = false;
        this.isLoadingEvent.emit(true);
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.getCalender(_this.localUserIds);
            _this.loading = false;
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.loading = false;
            _this.getCalender(_this.localUserIds);
        });
    };
    ContentComponent.prototype.nextReturnDateflightSearchFromSub = function () {
        var _this = this;
        this.cusFlightblockArr = [];
        this.loading = true;
        var formValue = this.flightSearchFrom.getRawValue();
        var to_arrival_date;
        var to_arrival_date2;
        if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
            to_arrival_date = moment_1["default"](formValue.to_arrival_date).add(1, 'days');
            to_arrival_date2 = this.datePipe.transform(to_arrival_date, "yyyy-MM-dd");
        }
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; })
        };
        this.deletFunction(reqData);
        if (formValue.to_arrival_date != "" && formValue.to_arrival_date != null && formValue.to_arrival_date != undefined) {
            formValue['to_arrival_date'] = to_arrival_date2;
        }
        else {
            formValue['to_arrival_date'] = null;
        }
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        this.applyData(formValue);
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.load();
        this.loading = false;
        this.isLoadingEvent.emit(true);
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.loading = false;
            _this.getCalender(_this.localUserIds);
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load();
            _this.loading = false;
            _this.getCalender(_this.localUserIds);
        });
    };
    ContentComponent.prototype.dateSerachFromCalendar = function (dateValue) {
        var _this = this;
        console.log("dateSerachFromCalendar", dateValue);
        var formValue = this.flightSearchFrom.getRawValue();
        var new_date2 = dateValue;
        console.log("new_date2", new_date2);
        var reqData = {
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
            "airlines": formValue.preferred_carriers.map(function (item) { return item.id; }),
            "class": formValue["class"]
        };
        this.deletFunction(reqData);
        formValue['from_depart_date'] = new_date2;
        window.sessionStorage.setItem('search-flight-raw-data', JSON.stringify(formValue));
        this.applyData(formValue);
        var data = window.sessionStorage.getItem('search-flight-raw-data');
        this.formDataValue = JSON.parse(data);
        window.sessionStorage.setItem('flightSearchReqData', JSON.stringify(reqData));
        window.sessionStorage.removeItem('confirmBookFlightData');
        this.load();
        this.loading = false;
        this.isLoadingEvent.emit(true);
        this.locationsService.flight_search(reqData).subscribe(function (res) {
            _this.isLoadingEvent.emit(false);
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        });
    };
    ContentComponent.prototype.deletFunction = function (reqData) {
        var _this = this;
        this.locationsService.Api_delete(reqData).subscribe(function (res) {
            _this.cusFlightblockArr = [];
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        }, function (err) {
            _this.cusFlightblockArr = [];
            _this.load(false);
            _this.getCalender(_this.localUserIds);
        });
    };
    ContentComponent.prototype.getCalender = function (value) {
        var _this = this;
        // this.calenderList=[];
        this.isLoadingEvent.emit(true);
        this.locationsService.get_calander(value).subscribe(function (res) {
            _this.calenderList = res;
            _this.isLoadingEvent.emit(false);
            _this.load();
        }, function (err) {
            _this.isLoadingEvent.emit(false);
            _this.load();
        });
    };
    ContentComponent.prototype.stop = function () {
        this.userIdle.stopTimer();
    };
    ContentComponent.prototype.stopWatching = function () {
        this.userIdle.stopWatching();
    };
    ContentComponent.prototype.startWatching = function () {
        this.userIdle.startWatching();
    };
    ContentComponent.prototype.restart = function () {
        this.userIdle.resetTimer();
    };
    ContentComponent.prototype.pauseTimeLine = function () {
        console.log(this.interval, "this.interval");
        clearInterval(this.interval);
    };
    ContentComponent.prototype.pauseTimeLine1 = function () {
        clearInterval(this.interval2);
    };
    __decorate([
        core_1.Output('isLoading')
    ], ContentComponent.prototype, "isLoadingEvent");
    __decorate([
        core_1.HostListener('window:mousemove')
    ], ContentComponent.prototype, "refreshUserState");
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'app-content',
            templateUrl: './content.component.html',
            styleUrls: ['./content.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
