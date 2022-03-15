"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationsService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var LocationsService = /** @class */ (function () {
    function LocationsService(_http) {
        this._http = _http;
        this.calKey = "session_cal";
        this.amaKey = "session_ama";
        this.galKey = "session_gal";
    }
    LocationsService.prototype.bindData = function (data) {
        var session_cal = window.sessionStorage.getItem(this.calKey);
        var session_ama = window.sessionStorage.getItem(this.amaKey);
        var session_gal = window.sessionStorage.getItem(this.galKey);
        session_cal = session_cal ? JSON.parse(session_cal) : null;
        session_ama = session_ama ? JSON.parse(session_ama) : null;
        session_gal = session_gal ? JSON.parse(session_gal) : null;
        if (session_cal) {
            data['session_cal'] = session_cal === null || session_cal === void 0 ? void 0 : session_cal.session_cal;
        }
        if (session_ama) {
            data['session_ama'] = session_ama === null || session_ama === void 0 ? void 0 : session_ama.session_ama;
        }
        if (session_gal) {
            data['session_gal'] = session_gal === null || session_gal === void 0 ? void 0 : session_gal.session_gal;
        }
        return data;
    };
    LocationsService.prototype.getLocation = function (locationCode) {
        var params = new http_1.HttpParams()
            .set('city_name', locationCode);
        return this._http.get(environment_1.environment.baseUrl + "getairport", {
            params: params,
            withCredentials: true
        });
    };
    LocationsService.prototype.searchByFrom = function (data) {
        data = this.bindData(data);
        return this._http.post(environment_1.environment.baseUrl + 'flight_search', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_viewamadeus = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_viewamadeus', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_viewgaleus = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_viewgaleus', data, { withCredentials: true });
    };
    LocationsService.prototype.booking_oneway_gal = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/booking_oneway_gal', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_payment = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_payment', data, { withCredentials: true });
    };
    LocationsService.prototype.booking_oneway_ams = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_amadeus_book', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_pre_booking_ama = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_pre_booking_ama', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_pre_booking_gal = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_pre_booking_gal', data, { withCredentials: true });
    };
    LocationsService.prototype.flight_search = function (data) {
        var _this = this;
        data = this.bindData(data);
        this.Api_calander(data).subscribe();
        var req1 = this._http.post('https://www.khalsatravel.net/flight/Api_gal_request', data, { withCredentials: true }).pipe(operators_1.map(function (res) {
            window.sessionStorage.setItem(_this.galKey, JSON.stringify(res));
            return res;
        }));
        var req2 = this._http.post('https://www.khalsatravel.net/flight/api/flight_search', data, { withCredentials: true }).pipe(operators_1.map(function (res) {
            window.sessionStorage.setItem(_this.amaKey, JSON.stringify(res));
            return res;
        }));
        return rxjs_1.forkJoin([req2, req1]);
    };
    LocationsService.prototype.Api_calander = function (data) {
        var _this = this;
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/index.php/flight/Api_calander', data, { withCredentials: true })
            .pipe(operators_1.map(function (res) {
            window.sessionStorage.setItem(_this.calKey, JSON.stringify(res));
            return res;
        }));
    };
    LocationsService.prototype.get_alll = function (id, stops, bagges, airlineName) {
        var data = { userId: id, stops: stops, bagges: bagges, airlineName: airlineName };
        data = this.bindData(data);
        return this._http.post(environment_1.environment.baseUrl + 'get_all/' + id, data, { withCredentials: true });
    };
    LocationsService.prototype.Api_filter = function (id, stops, bagges, airlineName) {
        var data = { userId: id, stops: stops, bagges: bagges, airlineName: airlineName };
        data = this.bindData(data);
        return this._http.post("https://www.khalsatravel.net/index.php/flight/Api_filter", data, { withCredentials: true });
    };
    LocationsService.prototype.Api_mybooking = function (id) {
        var data = { userId: id };
        data = this.bindData(data);
        return this._http.post(environment_1.environment.baseUrl2 + 'Api_mybooking/mybooking/' + id, data, { withCredentials: true });
    };
    LocationsService.prototype.Api_mylist = function (id) {
        var data = { userId: id };
        data = this.bindData(data);
        return this._http.post("https://www.khalsatravel.net/agent/Api_mylist", data, { withCredentials: true });
    };
    LocationsService.prototype.get_calander = function (id) {
        var data = { userId: id };
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/index.php/flight/api/get_calander/' + id, data, { withCredentials: true });
    };
    LocationsService.prototype.Api_viewamadeusprice_api = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_viewamadeus/price_api', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_viewgaleusprice_api = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_viewgaleus/price_api', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_price_onload = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_price_onload', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_price_onload_gal = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_price_onload_gal', data, { withCredentials: true });
    };
    LocationsService.prototype.ama_print = function (data) {
        //data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_amadeus_print/ama_print/', { pnr: data }, { withCredentials: true });
    };
    LocationsService.prototype.Api_mb = function (data) {
        //data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_mb', data, { withCredentials: true });
    };
    LocationsService.prototype.checkmb = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_mb/checkmb', data, { withCredentials: true });
    };
    // public api_ipaddress(): Observable<Object> {
    //   return this._http.get('https://www.khalsatravel.net/flight/Api_payment/ip');
    // }
    LocationsService.prototype.api_ipaddress = function () {
        //  data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_payment/ip', { withCredentials: true });
    };
    LocationsService.prototype.Api_balance = function (data) {
        /// data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_balance', data, { withCredentials: true });
    };
    LocationsService.prototype.Api_delete = function (data) {
        data = this.bindData(data);
        return this._http.post('https://www.khalsatravel.net/flight/Api_delete', data, { withCredentials: true });
    };
    LocationsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocationsService);
    return LocationsService;
}());
exports.LocationsService = LocationsService;
