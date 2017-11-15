var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var httpserver = /** @class */ (function (_super) {
    __extends(httpserver, _super);
    function httpserver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    httpserver.prototype.connect = function (addr, msg) {
        this.hr = new Laya.HttpRequest();
        this.hr.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
        this.hr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.hr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.hr.send(addr, msg, 'post', 'text');
    };
    httpserver.prototype.onHttpRequestError = function (e) {
        this.event("HTTPERROR");
        console.log(e);
    };
    httpserver.prototype.onHttpRequestProgress = function (e) {
        //console.log(e)
    };
    httpserver.prototype.onHttpRequestComplete = function (e) {
        this.event("HTTPCOMPLETE", e);
    };
    return httpserver;
}(Laya.EventDispatcher));
//# sourceMappingURL=httpserver.js.map