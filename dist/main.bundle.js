webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: "\n  <div id=\"wrapper\">\n    <div id=\"content\" class=\"container\">\n      <br>\n      <app-home></app-home>\n    </div>\n  </div>\n  <app-footer></app-footer>\n  ",
        styles: []
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_socket_io_service__ = __webpack_require__("../../../../../src/app/core/socket-io.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_highstock_chart_service__ = __webpack_require__("../../../../../src/app/core/highstock-chart.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_highcharts__ = __webpack_require__("../../../../angular2-highcharts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_highcharts_dist_HighchartsService__ = __webpack_require__("../../../../angular2-highcharts/dist/HighchartsService.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_highcharts_dist_HighchartsService___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_highcharts_dist_HighchartsService__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_chart_chart_component__ = __webpack_require__("../../../../../src/app/component/chart/chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_search_search_component__ = __webpack_require__("../../../../../src/app/component/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_stocks_stocks_component__ = __webpack_require__("../../../../../src/app/component/stocks/stocks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_home_home_component__ = __webpack_require__("../../../../../src/app/component/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_loading_component__ = __webpack_require__("../../../../../src/app/core/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__component_footer_footer_component__ = __webpack_require__("../../../../../src/app/component/footer/footer.component.ts");
/* unused harmony export highchartsFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// https://github.com/gevgeny/angular2-highcharts/issues/176


function highchartsFactory() {
    var hc = __webpack_require__("../../../../highcharts/highstock.js");
    var dd = __webpack_require__("../../../../highcharts/modules/exporting.js");
    dd(hc);
    return hc;
}






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__component_chart_chart_component__["a" /* ChartComponent */],
            __WEBPACK_IMPORTED_MODULE_11__component_search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_12__component_stocks_stocks_component__["a" /* StocksComponent */],
            __WEBPACK_IMPORTED_MODULE_13__component_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_14__core_loading_component__["a" /* LoadingComponent */],
            __WEBPACK_IMPORTED_MODULE_15__component_footer_footer_component__["a" /* FooterComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_8_angular2_highcharts__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_6__core_socket_io_service__["a" /* SocketIOService */],
            __WEBPACK_IMPORTED_MODULE_7__core_highstock_chart_service__["a" /* HighstockChartService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_9_angular2_highcharts_dist_HighchartsService__["HighchartsStatic"],
                useFactory: highchartsFactory
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/component/chart/chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_highstock_chart_service__ = __webpack_require__("../../../../../src/app/core/highstock-chart.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartComponent = (function () {
    function ChartComponent(cs) {
        this.cs = cs;
    }
    ChartComponent.prototype.saveInstance = function (chartInstance) {
        this.cs.setChart(chartInstance);
    };
    return ChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "options", void 0);
ChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-chart',
        template: "\n    <div class=\"row justify-content-center mt-3\">\n        <chart type=\"stockChart\" [options]=\"options\" (load)=\"saveInstance($event.context)\"></chart>\n    </div>\n  ",
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_highstock_chart_service__["a" /* HighstockChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_highstock_chart_service__["a" /* HighstockChartService */]) === "function" && _a || Object])
], ChartComponent);

var _a;
//# sourceMappingURL=chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: "\n  <footer class=\"footer text-center\">\n    <div class=\"container\">\n      <p><small>\n        <a href=\"https://www.freecodecamp.com/challenges/chart-the-stock-market\" target=\"_blank\">FCC Stock Chart App</a> | \n        <a href=\"https://github.com/mtharmen/stock-chart-app\" target=\"_blank\"> GitHub Repo <i className=\"fa fa-github\" aria-hidden=\"true\"></i></a> | \n        <a href=\"https://www.quandl.com/\" target=\"_blank\"> Data from Quandl </a> | \n        <a href=\"http://www.highcharts.com/\" target=\"_blank\"> Chart from HighCharts</a>\n      </small></p>\n    </div>\n  </footer>\n  ",
        styles: []
    })
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__ = __webpack_require__("../../../../../src/app/core/socket-io.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__ = __webpack_require__("../../../../../src/app/core/highstock-chart.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(io, cs) {
        this.io = io;
        this.cs = cs;
        this.options = {
            // NOTE: Navigator doesn't update with new data
            navigator: {
                enabled: false
            },
            series: []
        };
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: "\n    <h1 class=\"text-center\">Stock Chart App</h1>\n    <h1 class=\"text-center\" *ngIf=\"!this.cs.numberOfStocks\">Loading...<app-loading></app-loading></h1>\n    <div [ngClass]=\"{'loading': !this.cs.numberOfStocks}\">\n      <app-chart [options]=\"options\"></app-chart>\n      <app-search></app-search>\n      <app-stocks></app-stocks>\n    </div>\n  ",
        styles: ["\n    .loading {\n      opacity: 0;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__["a" /* HighstockChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__["a" /* HighstockChartService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__ = __webpack_require__("../../../../../src/app/core/socket-io.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__ = __webpack_require__("../../../../../src/app/core/highstock-chart.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// TODO: add autocomplete
var SearchComponent = (function () {
    function SearchComponent(io, cs) {
        this.io = io;
        this.cs = cs;
        this.input = { search: '' };
    }
    SearchComponent.prototype.add = function () {
        if (this.cs.numberOfStocks > 9) {
            alert('Max of 10 Stocks at a time');
        }
        else {
            var code = this.input.search.toUpperCase();
            this.input.search = '';
            this.io.addStock(code);
        }
    };
    SearchComponent.prototype.remove = function () {
        var code = this.input.search.toUpperCase();
        this.io.removeStock(code);
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: "\n    <form class=\"row justify-content-center\">\n      <div class=\"input-group col-8 mt-3\">\n        <input class=\"form-control\" name=\"search\" type=\"text\" placeholder=\"Enter a stock code (eg. AAPL)\" [(ngModel)]=\"input.search\" #search=\"ngModel\" required/>\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-primary\" type=\"submit\" (click)=\"add()\" [disabled]=\"!input.search\">\n            <span *ngIf=\"!io.loading\">Search</span>\n            <app-loading *ngIf=\"io.loading\"></app-loading>\n          </button>\n        </span>\n      </div>\n    </form>\n  ",
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__["a" /* HighstockChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_highstock_chart_service__["a" /* HighstockChartService */]) === "function" && _b || Object])
], SearchComponent);

var _a, _b;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/stocks/stocks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__ = __webpack_require__("../../../../../src/app/core/socket-io.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StocksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StocksComponent = (function () {
    function StocksComponent(io) {
        var _this = this;
        this.io = io;
        this.stocks = [];
        this.addStockSub = this.io
            .addStock$
            .subscribe(function (stock) {
            _this.add(stock.name);
        });
    }
    StocksComponent.prototype.add = function (company) {
        if (this.stocks.indexOf(company) === -1) {
            this.stocks.push(company);
        }
    };
    StocksComponent.prototype.remove = function (company) {
        if (this.stocks.length < 2) {
            alert('Must have at least one stock at all times');
        }
        else {
            var code_1 = company.split('(')[1].replace(')', '').trim();
            this.stocks = this.stocks.filter(function (stock) { return stock.indexOf(code_1) === -1; });
            this.io.removeStock(code_1);
        }
    };
    StocksComponent.prototype.ngOnDestroy = function () {
        this.addStockSub.unsubscribe();
    };
    return StocksComponent;
}());
StocksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stocks',
        template: "\n    <div class=\"row mt-3\">\n      <ng-container *ngFor=\"let stock of stocks\">\n        <div class=\"card col-6 col-lg-3\">\n          <div class=\"card-body\">\n            <span id=\"remove\" class=\"float-right\" (click)=\"remove(stock)\">&times;</span>\n            <p>{{stock}}</p>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  ",
        styles: ["\n    #remove {\n      top: -5px;\n      right: 10px;\n      position: absolute;\n      font-size: 30px;\n      cursor: pointer;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_socket_io_service__["a" /* SocketIOService */]) === "function" && _a || Object])
], StocksComponent);

var _a;
//# sourceMappingURL=stocks.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var base_url = 'http://localhost:8080';
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.handleError = function (err) {
        var errorMsg = err.error ? err.error.message : 'Unabled to complete request';
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errorMsg);
    };
    ApiService.prototype.test$ = function (code) {
        return this.http
            .get(base_url + '/test/' + code)
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]) === "function" && _a || Object])
], ApiService);

var _a;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/highstock-chart.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_io_service__ = __webpack_require__("../../../../../src/app/core/socket-io.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighstockChartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HighstockChartService = (function () {
    function HighstockChartService(io) {
        var _this = this;
        this.io = io;
        this.addStockSub = this.io
            .addStock$
            .subscribe(function (data) {
            _this.addStock(data);
        });
        this.removeStockSub = this.io
            .removeStock$
            .subscribe(function (code) {
            _this.removeStock(code);
        });
    }
    HighstockChartService.prototype.setChart = function (chart) {
        this.chart = chart;
    };
    HighstockChartService.prototype.addStock = function (data) {
        var i = this.chart.series.findIndex(function (stock) { return stock.name === data.name; });
        if (i === -1) {
            this.chart.addSeries(data);
        }
    };
    HighstockChartService.prototype.removeStock = function (code) {
        var i = this.chart.series.findIndex(function (stock) { return stock.name.indexOf("(" + code + ")") > -1; });
        this.chart.series[i].remove();
    };
    Object.defineProperty(HighstockChartService.prototype, "numberOfStocks", {
        get: function () {
            if (this.chart) {
                return this.chart.series.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    HighstockChartService.prototype.ngOnDestroy = function () {
        this.addStockSub.unsubscribe();
        this.removeStockSub.unsubscribe();
    };
    return HighstockChartService;
}());
HighstockChartService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_io_service__["a" /* SocketIOService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_io_service__["a" /* SocketIOService */]) === "function" && _a || Object])
], HighstockChartService);

var _a;
//# sourceMappingURL=highstock-chart.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    return LoadingComponent;
}());
LoadingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-loading',
        template: "\n      <img src=\"/assets/loading.svg\">\n  ",
        styles: ["\n    img {\n      margin: -20px auto;\n      width: 50px;\n    }\n  "]
    })
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/socket-io.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketIOService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocketIOService = (function () {
    function SocketIOService() {
        var _this = this;
        // TODO make model for stocks
        this.test$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.addStock$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.removeStock$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        var host = window.location.hostname === 'localhost' ? 'http://localhost:8080' : null;
        this.socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__(host);
        this.socket.on('error', function (error) {
            console.log(error);
        });
        this.socket.on('addStock', function (data) {
            _this.loading = false;
            _this.addStock$.next(data);
        });
        this.socket.on('removeStock', function (code) {
            _this.removeStock$.next(code);
        });
        this.socket.on('stockError', function (error) {
            _this.loading = false;
            // console.error(error)
            if (error.indexOf('You have submitted an incorrect Quandl code.') > -1) {
                alert('Unrecognized Stock Code');
            }
            else if (error.indexOf('-') > -1) {
                alert('Error retrieving data from Quandl');
            }
            else {
                alert(error);
            }
        });
    }
    SocketIOService.prototype.addStock = function (code) {
        this.loading = true;
        this.socket.emit('clientAddStock', code);
    };
    SocketIOService.prototype.removeStock = function (code) {
        this.socket.emit('clientRemoveStock', code);
    };
    return SocketIOService;
}());
SocketIOService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], SocketIOService);

//# sourceMappingURL=socket-io.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map