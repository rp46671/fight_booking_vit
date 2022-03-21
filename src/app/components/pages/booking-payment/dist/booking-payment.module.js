"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookingPaymentModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var ng_nice_select_1 = require("ng-nice-select");
var ngx_slick_carousel_1 = require("ngx-slick-carousel");
var booking_payment_routing_module_1 = require("./booking-payment-routing.module");
var booking_payment_component_1 = require("./booking-payment.component");
var shared_module_1 = require("../../shared/shared.module");
var content_component_1 = require("./content/content.component");
var flight_booking_payment_component_1 = require("./flight-booking-payment/flight-booking-payment.component");
var ng_select_1 = require("@ng-select/ng-select");
var BookingPaymentModule = /** @class */ (function () {
    function BookingPaymentModule() {
    }
    BookingPaymentModule = __decorate([
        core_1.NgModule({
            declarations: [
                booking_payment_component_1.BookingPaymentComponent,
                content_component_1.ContentComponent,
                flight_booking_payment_component_1.FlightBookingPaymentComponent
            ],
            imports: [
                common_1.CommonModule,
                booking_payment_routing_module_1.BookingPaymentRoutingModule,
                shared_module_1.SharedModule,
                ng_bootstrap_1.NgbModule, ngx_slick_carousel_1.SlickCarouselModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_nice_select_1.NiceSelectModule, ng_select_1.NgSelectModule
            ]
        })
    ], BookingPaymentModule);
    return BookingPaymentModule;
}());
exports.BookingPaymentModule = BookingPaymentModule;
