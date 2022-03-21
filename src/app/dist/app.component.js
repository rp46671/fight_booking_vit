"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = exports.browserRefresh = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
exports.browserRefresh = false;
var AppComponent = /** @class */ (function () {
    function AppComponent(titleService, breadcrumbService, router) {
        this.titleService = titleService;
        this.breadcrumbService = breadcrumbService;
        this.router = router;
        this.subscription = router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                exports.browserRefresh = !router.navigated;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breadcrumbService.breadcrumbChanged.subscribe(function (crumbs) {
            _this.titleService.setTitle(_this.createTitle(crumbs));
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AppComponent.prototype.onActivate = function (_event) {
        window.scroll(0, 0);
    };
    AppComponent.prototype.createTitle = function (routesCollection) {
        var title = "khalsatravel - Flights Booking";
        var titles = routesCollection.filter(function (route) { return route.displayName; });
        if (!titles.length) {
            return title;
        }
        var routeTitle = this.titlesToString(titles);
        return "" + routeTitle + title;
    };
    AppComponent.prototype.titlesToString = function (titles) {
        return titles.reduce(function (prev, curr) {
            return curr.displayName + " | ";
        }, '');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [
                common_1.Location, {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.PathLocationStrategy
                }
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
