"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewTicketComponent = void 0;
var core_1 = require("@angular/core");
var ViewTicketComponent = /** @class */ (function () {
    function ViewTicketComponent(_locationsService, locationStrategy, activateRoute) {
        this._locationsService = _locationsService;
        this.locationStrategy = locationStrategy;
        this.activateRoute = activateRoute;
        this.statusData = null;
        this.showingValue = false;
        this.statusData = null;
        this.loading = true;
        this.disableButton = true;
    }
    ViewTicketComponent.prototype.ngOnInit = function () {
        var _this = this;
        history.pushState(null, '', location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, '', location.href);
        });
        this.showingValue = false;
        this.loading = false;
        this.activateRoute.params.subscribe(function (parms) {
            console.log(parms);
            if (parms.pnr == 'null') {
            }
            else {
                _this.getTicket(parms.pnr);
            }
        });
    };
    ViewTicketComponent.prototype.getTicket = function (refrenceNumber) {
        var _this = this;
        this.loading = true;
        if (refrenceNumber) {
            this._locationsService.ama_print(String(refrenceNumber)).subscribe(function (res) {
                if (res.airlines.status == "0" && res.airlines.error == "Error") {
                    _this.showingValue = false;
                    confirm("Please Enter right Pnr No");
                }
                else {
                    _this.showingValue = true;
                    _this.statusData = res;
                }
                _this.loading = false;
                console.log("this.showingValue", _this.showingValue);
            });
        }
    };
    ViewTicketComponent.prototype.myButtonDisable = function (refrenceNumber) {
        if (refrenceNumber.length == 6) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    };
    ViewTicketComponent = __decorate([
        core_1.Component({
            selector: 'app-view-ticket',
            templateUrl: './view-ticket.component.html',
            styleUrls: ['./view-ticket.component.css']
        })
    ], ViewTicketComponent);
    return ViewTicketComponent;
}());
exports.ViewTicketComponent = ViewTicketComponent;
