"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FlightBookingComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FlightBookingComponent = /** @class */ (function () {
    function FlightBookingComponent(_location, fb, router, locationsService, modalService, _router, formBuilder, locationStrategy) {
        this._location = _location;
        this.fb = fb;
        this.router = router;
        this.locationsService = locationsService;
        this.modalService = modalService;
        this._router = _router;
        this.formBuilder = formBuilder;
        this.locationStrategy = locationStrategy;
        this.loading = false;
        this.defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/";
        this.formatImage = ".png";
        this.bookFlightItem = null;
        this.flightSearchReqData = [];
        this.loadingViewDta = false;
        this.viewDataAll = [];
        this.viewDataAll2 = [];
        this.indexAll2 = [];
        this.confirmResut = '';
        this.infArrayPrice = [];
        this.childArrayPrice = [];
        this.adultsArrayPrice = [];
        this.loading = false;
        this.ButtonMidChange = "Flight_itinerary";
        this.passportOpendetailsInfrnt = null;
        this.passportOpendetailsChild = null;
        this.passportOpendetailsAddults = null;
        this.adultsArrayPrice = [];
        this.childArrayPrice = [];
        this.infArrayPrice = [];
    }
    FlightBookingComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d, _e, _f;
        // history.pushState('/', '', location.href);
        // this.locationStrategy.onPopState(() => {
        //   history.pushState('/', '', location.href);
        // })
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        console.log("localUserId", localUserId);
        this.emailUser = localUserId.detail.mail;
        this.phoneUser = localUserId.detail.phone;
        console.log("  this.phoneUser", this.phoneUser);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        this.bookingForm = this.formBuilder.group({
            adults: this.fb.array([]),
            childs: this.fb.array([]),
            infants: this.fb.array([]),
            phone: new forms_1.FormControl(this.phoneUser, [forms_1.Validators.required]),
            email: new forms_1.FormControl(this.emailUser, [forms_1.Validators.required])
        });
        history.pushState(null, '', location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, '', location.href);
        });
        var bookFlightObj = window.sessionStorage.getItem('bookFlight');
        var flightSearchReqData = window.sessionStorage.getItem('flightSearchReqData');
        var confirmBookFlightData = window.sessionStorage.getItem('confirmBookFlightData');
        confirmBookFlightData = JSON.parse(confirmBookFlightData);
        this.bookFlightItem = JSON.parse(bookFlightObj);
        this.PriceApiCalling(this.bookFlightItem);
        this.openTaxModal(this.bookFlightItem);
        if (!this.bookFlightItem) {
            this._location.back();
        }
        this.flightSearchReqData = JSON.parse(flightSearchReqData);
        if (!this.flightSearchReqData) {
            this._location.back();
        }
        if ((_a = this.flightSearchReqData) === null || _a === void 0 ? void 0 : _a.adults)
            this.addAdult(Number((_b = this.flightSearchReqData) === null || _b === void 0 ? void 0 : _b.adults));
        if ((_c = this.flightSearchReqData) === null || _c === void 0 ? void 0 : _c.child)
            this.addChild(Number((_d = this.flightSearchReqData) === null || _d === void 0 ? void 0 : _d.child));
        if ((_e = this.flightSearchReqData) === null || _e === void 0 ? void 0 : _e.infants)
            this.addInfant(Number((_f = this.flightSearchReqData) === null || _f === void 0 ? void 0 : _f.infants));
        if (confirmBookFlightData) {
            this.bookingForm.setValue(confirmBookFlightData);
        }
    };
    FlightBookingComponent.prototype.onSubmit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var adultArr = (_a = this.bookingForm.value) === null || _a === void 0 ? void 0 : _a.adults;
        var childArr = (_b = this.bookingForm.value) === null || _b === void 0 ? void 0 : _b.childs;
        var infantArr = (_c = this.bookingForm.value) === null || _c === void 0 ? void 0 : _c.infants;
        var reqData = {
            user_id: this.localUserIds,
            flight_id: (_d = this.bookFlightItem) === null || _d === void 0 ? void 0 : _d.flight_id,
            flight_rec: (_e = this.bookFlightItem) === null || _e === void 0 ? void 0 : _e.flight_rec,
            adult_no: adultArr.length,
            adult: adultArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname,
                    issueDate: ele === null || ele === void 0 ? void 0 : ele.issueDate,
                    expiryDate: ele === null || ele === void 0 ? void 0 : ele.expiryDate,
                    passportIssueCountry: ele === null || ele === void 0 ? void 0 : ele.passportIssueCountry,
                    countryofNationality: ele === null || ele === void 0 ? void 0 : ele.countryofNationality,
                    addMeal: ele === null || ele === void 0 ? void 0 : ele.addMeal,
                    frequent_flyerdetails: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetails,
                    frequent_flyerdetailsOption: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetailsOption,
                    addMealOption: ele === null || ele === void 0 ? void 0 : ele.addMealOption
                };
            }),
            child_no: childArr.length,
            child: childArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname,
                    issueDate: ele === null || ele === void 0 ? void 0 : ele.issueDate,
                    expiryDate: ele === null || ele === void 0 ? void 0 : ele.expiryDate,
                    passportIssueCountry: ele === null || ele === void 0 ? void 0 : ele.passportIssueCountry,
                    countryofNationality: ele === null || ele === void 0 ? void 0 : ele.countryofNationality,
                    addMeal: ele === null || ele === void 0 ? void 0 : ele.addMeal,
                    frequent_flyerdetails: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetails,
                    frequent_flyerdetailsOption: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetailsOption,
                    addMealOption: ele === null || ele === void 0 ? void 0 : ele.addMealOption
                };
            }),
            infant_no: infantArr.length,
            infant: infantArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname,
                    issueDate: ele === null || ele === void 0 ? void 0 : ele.issueDate,
                    expiryDate: ele === null || ele === void 0 ? void 0 : ele.expiryDate,
                    passportIssueCountry: ele === null || ele === void 0 ? void 0 : ele.passportIssueCountry,
                    countryofNationality: ele === null || ele === void 0 ? void 0 : ele.countryofNationality,
                    addMeal: ele === null || ele === void 0 ? void 0 : ele.addMeal,
                    frequent_flyerdetails: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetails,
                    frequent_flyerdetailsOption: ele === null || ele === void 0 ? void 0 : ele.frequent_flyerdetailsOption,
                    addMealOption: ele === null || ele === void 0 ? void 0 : ele.addMealOption
                };
            }),
            email: this.email.value,
            phone: this.phone.value
        };
        this.loading = true;
        if (this.bookFlightItem.gds == "gal") {
            this.locationsService.Api_pre_booking_gal(reqData).subscribe(function (res) {
                _this.loading = false;
                if (res.status == 'confirm') {
                    window.sessionStorage.setItem('confirmBookFlightData', JSON.stringify(_this.bookingForm.value));
                    _this.router.navigate(['/booking-payment']);
                    _this.bookingForm.reset();
                }
                else {
                    alert('Flight not confirm .Please look another recommendation');
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
            }, function (err) {
                alert('Flight not confirm .Please look another recommendation');
                _this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
        else if (this.bookFlightItem.gds == "ama") {
            this.locationsService.Api_pre_booking_ama(reqData).subscribe(function (res) {
                _this.loading = false;
                if (res.status == 'confirm') {
                    window.sessionStorage.setItem('confirmBookFlightData', JSON.stringify(_this.bookingForm.value));
                    _this.router.navigate(['/booking-payment']);
                    _this.bookingForm.reset();
                }
                else {
                    alert('Flight not confirm .Please look another recommendation');
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
            }, function (err) {
                alert('Flight not confirm .Please look another recommendation');
                _this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    };
    Object.defineProperty(FlightBookingComponent.prototype, "adults", {
        get: function () {
            return this.bookingForm.controls["adults"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingComponent.prototype, "childs", {
        get: function () {
            return this.bookingForm.controls["childs"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingComponent.prototype, "email", {
        get: function () {
            return this.bookingForm.controls["email"].value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingComponent.prototype, "phone", {
        get: function () {
            return this.bookingForm.controls["phone"].value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingComponent.prototype, "infants", {
        get: function () {
            return this.bookingForm.controls["infants"];
        },
        enumerable: false,
        configurable: true
    });
    FlightBookingComponent.prototype.addAdult = function (num) {
        if (num === void 0) { num = 1; }
        var counter = 1;
        while (counter++ <= num) {
            var adultForm = this.fb.group({
                title: new forms_1.FormControl('', [forms_1.Validators.required]),
                firstname: new forms_1.FormControl('', [forms_1.Validators.required]),
                lastname: new forms_1.FormControl('', [forms_1.Validators.required]),
                dob: new forms_1.FormControl('', [forms_1.Validators.required]),
                gender: new forms_1.FormControl('', [forms_1.Validators.required]),
                passport: new forms_1.FormControl(''),
                issueDate: new forms_1.FormControl(''),
                expiryDate: new forms_1.FormControl(''),
                passportIssueCountry: new forms_1.FormControl(''),
                countryofNationality: new forms_1.FormControl(''),
                addMeal: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetails: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetailsOption: new forms_1.FormControl(''),
                addMealOption: new forms_1.FormControl('')
            });
            this.adults.push(adultForm);
        }
    };
    FlightBookingComponent.prototype.deleteAdult = function (adultIndex) {
        this.adults.removeAt(adultIndex);
    };
    FlightBookingComponent.prototype.addChild = function (num) {
        if (num === void 0) { num = 1; }
        var counter = 1;
        while (counter++ <= num) {
            var childForm = this.fb.group({
                title: new forms_1.FormControl('', [forms_1.Validators.required]), firstname: new forms_1.FormControl('', [forms_1.Validators.required]),
                lastname: new forms_1.FormControl('', [forms_1.Validators.required]),
                dob: new forms_1.FormControl('', [forms_1.Validators.required]),
                passport: new forms_1.FormControl(''),
                gender: new forms_1.FormControl('', [forms_1.Validators.required]),
                issueDate: new forms_1.FormControl(''),
                expiryDate: new forms_1.FormControl(''),
                passportIssueCountry: new forms_1.FormControl(''),
                countryofNationality: new forms_1.FormControl(''),
                addMeal: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetails: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetailsOption: new forms_1.FormControl(''),
                addMealOption: new forms_1.FormControl('')
            });
            this.childs.push(childForm);
        }
    };
    FlightBookingComponent.prototype.deleteChild = function (childIndex) {
        this.childs.removeAt(childIndex);
    };
    FlightBookingComponent.prototype.passportOpendetailsaddultsFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.passportOpendetailsAddults = val;
        }
        else {
            this.passportOpendetailsAddults = null;
        }
    };
    FlightBookingComponent.prototype.passportOpendetailsChildFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.passportOpendetailsChild = val;
        }
        else {
            this.passportOpendetailsChild = null;
        }
    };
    FlightBookingComponent.prototype.passportOpendetailsInfrntFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.passportOpendetailsInfrnt = val;
        }
        else {
            this.passportOpendetailsInfrnt = null;
        }
    };
    FlightBookingComponent.prototype.frequent_flyerdetailsAddultsFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.frequent_flyerdetailsAddults = val;
        }
        else {
            this.frequent_flyerdetailsAddults = null;
        }
    };
    FlightBookingComponent.prototype.frequent_flyerdetailsChildsFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.frequent_flyerdetailsChilds = val;
        }
        else {
            this.frequent_flyerdetailsChilds = null;
        }
    };
    FlightBookingComponent.prototype.frequent_flyerdetailsInfarntFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.frequent_flyerdetailsInfrants = val;
        }
        else {
            this.frequent_flyerdetailsInfrants = null;
        }
    };
    FlightBookingComponent.prototype.addMealdetailsAddultsFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.addMealdetailsAddults = val;
        }
        else {
            this.addMealdetailsAddults = null;
        }
    };
    FlightBookingComponent.prototype.addMealdetailsChildsFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.addMealdetailsChilds = val;
        }
        else {
            this.addMealdetailsChilds = null;
        }
    };
    FlightBookingComponent.prototype.addMealdetailsInfarntFunction = function (val, event) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.addMealdetailsInfrants = val;
        }
        else {
            this.addMealdetailsInfrants = null;
        }
    };
    FlightBookingComponent.prototype.addInfant = function (num) {
        if (num === void 0) { num = 1; }
        var counter = 1;
        while (counter++ <= num) {
            var infantForm = this.fb.group({
                title: new forms_1.FormControl('', [forms_1.Validators.required]), firstname: new forms_1.FormControl('', [forms_1.Validators.required]),
                lastname: new forms_1.FormControl('', [forms_1.Validators.required]),
                dob: new forms_1.FormControl('', [forms_1.Validators.required]),
                passport: new forms_1.FormControl(''),
                gender: new forms_1.FormControl('', [forms_1.Validators.required]),
                issueDate: new forms_1.FormControl(''),
                expiryDate: new forms_1.FormControl(''),
                passportIssueCountry: new forms_1.FormControl(''),
                countryofNationality: new forms_1.FormControl(''),
                addMeal: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetails: new forms_1.FormControl(false, [forms_1.Validators.required]),
                frequent_flyerdetailsOption: new forms_1.FormControl(''),
                addMealOption: new forms_1.FormControl('')
            });
            this.infants.push(infantForm);
        }
    };
    FlightBookingComponent.prototype.deleteInfant = function (infantIndex) {
        this.infants.removeAt(infantIndex);
    };
    FlightBookingComponent.prototype.PriceApiCalling = function (item) {
        var _this = this;
        if (this.bookFlightItem.gds == "gal") {
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
            this.locationsService.Api_price_onload_gal(reqData).subscribe(function (res) {
                console.log("hhha", res);
            }, function (err) {
                alert('Something is wrong');
                _this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
        else if (this.bookFlightItem.gds == "ama") {
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
            this.locationsService.Api_price_onload(reqData).subscribe(function (res) {
                console.log("rddd", res);
            }, function (err) {
                alert('Something is wrong');
                _this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
    };
    FlightBookingComponent.prototype.navToBookFlight = function (item) {
        window.sessionStorage.setItem('bookFlight', JSON.stringify(item));
        this._router.navigate(['/booking']);
    };
    FlightBookingComponent.prototype.viewData = function (content, item) {
        var _this = this;
        this.viwItemData = item;
        this.loadingViewDta = true;
        this.viewDataAll = [];
        this.viewDataAll2 = [];
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
    FlightBookingComponent.prototype.openTaxModal = function (item) {
        var _this = this;
        if (item.gds == "gal") {
            var reqData = {
                "bag_ref_no": item.bag_ref_no,
                "flgith_idd": item.flight_id,
                "flight_rec": item.flight_rec,
                "session": item.session
            };
            this.locationsService.Api_viewgaleusprice_api(reqData).subscribe(function (res) {
                var _a;
                _this.viewDataPrice = res;
                (_a = _this.viewDataPrice) === null || _a === void 0 ? void 0 : _a.forEach(function (ele) {
                    if (ele.ptc_ntype == "LBR") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.adultsArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else if (ele.ptc_ntype == "CH") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.childArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else if (ele.ptc_ntype == "INF") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.infArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else {
                    }
                });
                console.log("adultsArrayPrice", _this.adultsArrayPrice);
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
                var _a;
                _this.viewDataPrice = res;
                (_a = _this.viewDataPrice) === null || _a === void 0 ? void 0 : _a.forEach(function (ele) {
                    if (ele.ptc_ntype == "LBR") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.adultsArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else if (ele.ptc_ntype == "CH") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.childArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else if (ele.ptc_ntype == "INF") {
                        for (var i = 0; i < ele.paxcount; i++) {
                            _this.infArrayPrice.push({
                                totalFareAmount: ele.totalFareAmount,
                                paxcount: i
                            });
                        }
                    }
                    else {
                    }
                });
                console.log("adultsArrayPrice", _this.adultsArrayPrice);
                console.log(" this.viewDataPrice", _this.viewDataPrice);
            }, function (err) {
            });
        }
        else {
            alert("No data found");
        }
    };
    FlightBookingComponent.prototype.changeFightMidButton = function (valu) {
        this.ButtonMidChange = valu;
    };
    FlightBookingComponent.prototype.openViewPriceModal = function (content) {
        var _this = this;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true
        }).result.then(function (result) {
            _this.confirmResut = "Closed with: " + result;
        }, function (reason) {
            _this.confirmResut = "Dismissed with: " + reason;
        });
    };
    FlightBookingComponent = __decorate([
        core_1.Component({
            selector: 'app-flight-booking',
            templateUrl: './flight-booking.component.html',
            styleUrls: ['./flight-booking.component.css']
        })
    ], FlightBookingComponent);
    return FlightBookingComponent;
}());
exports.FlightBookingComponent = FlightBookingComponent;
