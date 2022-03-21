"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FlightBookingPaymentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FlightBookingPaymentComponent = /** @class */ (function () {
    function FlightBookingPaymentComponent(_location, _sanitizer, locationsService, router, modalService, _router, locationStrategy) {
        this._location = _location;
        this._sanitizer = _sanitizer;
        this.locationsService = locationsService;
        this.router = router;
        this.modalService = modalService;
        this._router = _router;
        this.locationStrategy = locationStrategy;
        this.defaultImageAddress = "https://www.khalsatravel.net/webroot/frontend/airline-images/";
        this.formatImage = ".png";
        this.adultArr = [];
        this.childArr = [];
        this.infantArr = [];
        this.bookFlightItem = null;
        this.paymentUrl = "";
        this.loading = false;
        this.loadingViewDta = false;
        this.viewDataAll = [];
        this.viewDataAll2 = [];
        this.indexAll2 = [];
        this.confirmResut = '';
        this.infArrayPrice = [];
        this.childArrayPrice = [];
        this.adultsArrayPrice = [];
        this.count = 0;
        this.spinerrLoading = false;
        this.ButtonMidChange = "Flight_itinerary";
        this.api_ipaddress();
    }
    FlightBookingPaymentComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        this.Api_balance();
        this.MyCardFromBinding();
        history.pushState(null, '', location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, '', location.href);
        });
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        var bookFlightObj = window.sessionStorage.getItem('bookFlight');
        var confirmBookFlightData = window.sessionStorage.getItem('confirmBookFlightData');
        this.confirmBookFlightData = JSON.parse(confirmBookFlightData);
        if (!this.confirmBookFlightData) {
            this._location.back();
        }
        this.bookFlightItem = JSON.parse(bookFlightObj);
        if (!this.bookFlightItem) {
            this._location.back();
        }
        this.paymentUrl = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.khalsatravel.net/index.php/flight/api/addmoney?amount=" + ((_a = this.bookFlightItem) === null || _a === void 0 ? void 0 : _a.price));
        this.adultArr = (_b = this.confirmBookFlightData) === null || _b === void 0 ? void 0 : _b.adults;
        this.childArr = (_c = this.confirmBookFlightData) === null || _c === void 0 ? void 0 : _c.childs;
        this.infantArr = (_d = this.confirmBookFlightData) === null || _d === void 0 ? void 0 : _d.infants;
        console.log("this.bookFlightItem.price", this.bookFlightItem.price);
        /// this.onPaymentConfirmSubmitData(this.bookFlightItem);
    };
    FlightBookingPaymentComponent.prototype.MyCardFromBinding = function () {
        this.cardInfo = new forms_1.FormGroup({
            cardname: new forms_1.FormControl('', [forms_1.Validators.required]),
            cardnumber: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(14), forms_1.Validators.min(14), forms_1.Validators.max(14)]),
            cvv: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            expmonth: new forms_1.FormControl('', [forms_1.Validators.required]),
            expyear: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    Object.defineProperty(FlightBookingPaymentComponent.prototype, "cardname", {
        get: function () { return this.cardInfo.get('cardname'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingPaymentComponent.prototype, "cardnumber", {
        get: function () { return this.cardInfo.get('cardnumber'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingPaymentComponent.prototype, "cvv", {
        get: function () { return this.cardInfo.get('cvv'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingPaymentComponent.prototype, "expmonth", {
        get: function () { return this.cardInfo.get('expmonth'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlightBookingPaymentComponent.prototype, "expyear", {
        get: function () { return this.cardInfo.get('expyear'); },
        enumerable: false,
        configurable: true
    });
    FlightBookingPaymentComponent.prototype.editData = function () {
        this.router.navigate(['/booking']);
    };
    FlightBookingPaymentComponent.prototype.onPaymentConfirmSubmitData = function (value) {
        var _this = this;
        var _a, _b, _c, _d;
        this.loading = true;
        var reqData = {
            user_id: this.localUserIds,
            myAirSegment1: value === null || value === void 0 ? void 0 : value.myAirSegment1,
            myAirSegment2: value === null || value === void 0 ? void 0 : value.myAirSegment2,
            flight_id: (_a = this.bookFlightItem) === null || _a === void 0 ? void 0 : _a.flight_id,
            flight_rec: (_b = this.bookFlightItem) === null || _b === void 0 ? void 0 : _b.flight_rec,
            adult_no: this.adultArr.length,
            email: (_c = this.confirmBookFlightData) === null || _c === void 0 ? void 0 : _c.email,
            phone: (_d = this.confirmBookFlightData) === null || _d === void 0 ? void 0 : _d.phone,
            adult: this.adultArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname
                };
            }),
            child_no: this.childArr.length,
            child: this.childArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname
                };
            }),
            infant_no: this.infantArr.length,
            infant: this.infantArr.map(function (ele) {
                return {
                    dob: ele === null || ele === void 0 ? void 0 : ele.dob,
                    passport: ele === null || ele === void 0 ? void 0 : ele.passport,
                    gender: ele === null || ele === void 0 ? void 0 : ele.gender,
                    title: ele === null || ele === void 0 ? void 0 : ele.title,
                    first_name: ele === null || ele === void 0 ? void 0 : ele.firstname,
                    last_name: ele === null || ele === void 0 ? void 0 : ele.lastname
                };
            }),
            price: this.bookFlightItem.price
        };
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
            console.log("gal", value.gds);
            this.locationsService.booking_oneway_gal(reqData).subscribe(function (res) {
                _this.bookingDetailPrice = res.detail;
                _this.loading = false;
                if (res[0].status == "confirm") {
                    _this.router.navigate(['/flight-grid-left/view-ticket/' + res[0].pnr]);
                }
                else if (res[0].message == "negtive") {
                    alert(res[0].error);
                }
                else if (res[0].message == "api_error") {
                    alert(res[0].error);
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
                else {
                    alert('Contact With Us');
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
            }, function (err) {
                // alert('Flight not confirm .Please look another recommendation')
                //this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
        else if (value.gds == "ama") {
            console.log("ama", value.gds);
            this.locationsService.booking_oneway_ams(reqData).subscribe(function (res) {
                _this.loading = false;
                _this.bookingDetailPrice = res.detail;
                if (res[0].status == "confirm") {
                    _this.router.navigate(['/flight-grid-left/view-ticket/' + res[0].pnr]);
                }
                else if (res[0].message == "negtive") {
                    alert(res[0].error);
                }
                else if (res[0].message == "api_error") {
                    alert(res[0].error);
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
                else {
                    alert('Contact With us ');
                    _this.router.navigate(['/flight-grid-left/content-fight']);
                }
            }, function (err) {
                // alert('Flight not confirm .Please look another recommendation')
                // this.router.navigate(['/flight-grid-left/content-fight']);
                _this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    };
    FlightBookingPaymentComponent.prototype.changeFightMidButton = function (valu) {
        this.ButtonMidChange = valu;
    };
    FlightBookingPaymentComponent.prototype.viewData = function (content, item) {
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
    FlightBookingPaymentComponent.prototype.Api_mybooking = function () {
        var _this = this;
        var _a;
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        this.spinerrLoading = true;
        this.loading = true;
        var reqData = {
            user_id: this.localUserIds,
            cardNo: this._CardNumber,
            cardHolderName: this._holderNameDEtails,
            cardExpiry: this.cardExpiry,
            cardYear: this.cardYear,
            price: (_a = this.bookFlightItem) === null || _a === void 0 ? void 0 : _a.price,
            cvvNo: this.cvvNo,
            ip: this._ip,
            gds: this.bookFlightItem.gds,
            uniqueNo: this.getRandomColor()
        };
        this.loading = true;
        console.log(reqData);
        this.locationsService.Api_payment(reqData).subscribe(function (res) {
            console.log(res);
            _this.spinerrLoading = false;
            if (res.otp != '' && res.window3d != '') {
                _this.paymentWindiow3d = _this._sanitizer.bypassSecurityTrustResourceUrl(res.window3d);
                _this.openChangePAyloaModal(_this.modalPaytmentConfirm);
            }
            else {
                confirm(res.status);
            }
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
        console.log(this.localUserIds);
    };
    FlightBookingPaymentComponent.prototype.multiBanco = function () {
        var _this = this;
        var _a;
        this.loading = true;
        var reqData = {
            user_id: this.localUserIds,
            price: (_a = this.bookFlightItem) === null || _a === void 0 ? void 0 : _a.price
        };
        this.loading = true;
        console.log(reqData);
        this.locationsService.Api_mb(reqData).subscribe(function (res) {
            console.log(res);
            _this.multiBancoData = res;
            if (res) {
                _this.openMultiBancoModalAfterPayment(_this.modalBancoModalAfterConfirm);
                _this.mulltiBanccoPaytmentsuccfully(_this.multiBancoData);
            }
            _this.spinerrLoading = false;
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    FlightBookingPaymentComponent.prototype.api_ipaddress = function () {
        var _this = this;
        this.locationsService.api_ipaddress().subscribe(function (res) {
            console.log(res);
            if (res.ip) {
                _this._ip = res.ip;
            }
            _this.spinerrLoading = false;
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    FlightBookingPaymentComponent.prototype.openChangePAyloaModal = function (content) {
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        if (this.paymentWindiow3d) {
            console.log(this.localUserIds);
            this.modalService.open(content, {
                ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: 'static',
                keyboard: false
            })
                .result.then(function (result) {
            }, function (reason) {
            });
        }
    };
    FlightBookingPaymentComponent.prototype.getRandomColor = function () {
        var uniqueNo = Math.floor(0x1000000 * Math.random());
        return uniqueNo;
    };
    FlightBookingPaymentComponent.prototype.openMultiBancoModalAfterPayment = function (content) {
        var _this = this;
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: 'static',
            keyboard: false
        })
            .result.then(function (result) {
        }, function (reason) {
        });
        setInterval(function () {
            _this.mulltiBanccoClosemode();
        }, 10000);
    };
    FlightBookingPaymentComponent.prototype.mulltiBanccoPaytmentsuccfully = function (myValue) {
        var _this = this;
        var reqData = {
            amount: myValue.amount,
            client: myValue.client,
            reference: myValue.reference,
            status: myValue.status
        };
        this.loading = true;
        console.log(reqData);
        this.locationsService.checkmb(reqData).subscribe(function (res) {
            console.log("mulltiBanccoPaytmentsuccfully", res);
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    FlightBookingPaymentComponent.prototype.mulltiBanccoClosemode = function () {
        this.count = this.count + 1;
        this.modalService.dismissAll();
        this.mulltiBanccoPaytmentsuccfully(this.multiBancoData);
    };
    FlightBookingPaymentComponent.prototype.Api_balance = function () {
        var _this = this;
        var localUserId = window.sessionStorage.getItem('fight-user');
        localUserId = JSON.parse(localUserId);
        this.localUserIds = localUserId === null || localUserId === void 0 ? void 0 : localUserId.detail.id;
        var reqData = {
            clientId: this.localUserIds
        };
        this.loading = true;
        console.log(reqData);
        this.locationsService.Api_balance(reqData).subscribe(function (res) {
            console.log("", res);
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    FlightBookingPaymentComponent.prototype.onKeyPress = function (params) {
        if (params.key === 'Backspace' || params.key === '.') {
            return true;
        }
        else if (!this.isKeyPressedNumeric(params)) {
            return false;
        }
    };
    FlightBookingPaymentComponent.prototype.isKeyPressedNumeric = function (event) {
        var inputVal = document.getElementById("cnumber");
        var input = inputVal.value;
        input = input + event.key;
        if (input.length >= 2) {
            var txtVal = input;
            return /^((\d{1,14})|(\d{1,14})(\.{1}\d{1,14}))$/.test(txtVal);
        }
        var charCode = this.getCharCode(event);
        var charStr = event.key ? event.key : String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
    };
    FlightBookingPaymentComponent.prototype.getCharCode = function (event) {
        event = event || window.event;
        return (typeof event.which == "undefined") ? event.keyCode : event.which;
    };
    FlightBookingPaymentComponent.prototype.isCharNumeric = function (charStr) {
        var validation = false;
        if (charStr == ".") {
            validation = !!/\./.test(charStr);
        }
        else {
            validation = !!/\d/.test(charStr);
        }
        return validation;
    };
    __decorate([
        core_1.ViewChild("modalPaytmentConfirm")
    ], FlightBookingPaymentComponent.prototype, "modalPaytmentConfirm");
    __decorate([
        core_1.ViewChild("modalBancoModalAfterConfirm")
    ], FlightBookingPaymentComponent.prototype, "modalBancoModalAfterConfirm");
    FlightBookingPaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-flight-booking-payment',
            templateUrl: './flight-booking-payment.component.html',
            styleUrls: ['./flight-booking-payment.component.css']
        })
    ], FlightBookingPaymentComponent);
    return FlightBookingPaymentComponent;
}());
exports.FlightBookingPaymentComponent = FlightBookingPaymentComponent;
