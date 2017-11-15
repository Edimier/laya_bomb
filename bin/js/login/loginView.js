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
var loginView = /** @class */ (function (_super) {
    __extends(loginView, _super);
    function loginView() {
        var _this = _super.call(this) || this;
        _this._success = false;
        _this._http = new httpserver();
        _this.pos((Laya.stage.width - 600) / 2, (Laya.stage.height - 400) / 2);
        _this.bt_login.on(Laya.Event.CLICK, _this, _this.handleLogin);
        server.on("LOGIN_SUCCESS", _this, _this.loginSuccess);
        //server.on("LOGIN_FAILED", this, this.loginFailed);
        server.on("CONNECT_ERROR", _this, _this.connectClose);
        _this._http.on("HTTPCOMPLETE", _this, _this.httpLoginSuccess);
        _this._http.on("HTTPERROR", _this, _this.httpLoginFailed);
        return _this;
    }
    loginView.prototype.handleLogin = function () {
        this.bt_login.disabled = true;
        this._http.connect("http://47.96.161.239", "tmp=1");
        this.bt_login.disabled = true;
    };
    loginView.prototype.destroySelf = function () {
        this.removeSelf();
        this.destroy();
    };
    loginView.prototype.loginSuccess = function (msg) {
        this.bt_login.disabled = true;
        if (this._success) {
            return;
        }
        this._success = true;
        var game_main = new gameMain();
        game_main.mainProcess(msg);
        this.destroySelf();
    };
    loginView.prototype.httpLoginSuccess = function (data) {
        var msg = JSON.parse(data);
        if (msg.uid) {
            this.bt_login.disabled = true;
            server.connect(Number(msg.uid), msg.nickname);
        }
        else {
            console.log("http get uid error!");
        }
    };
    loginView.prototype.httpLoginFailed = function () {
        Laya.stage.addChild(new promptView("登陆失败！"));
        this.bt_login.disabled = false;
    };
    loginView.prototype.loginFailed = function () {
        Laya.stage.addChild(new promptView("登陆失败！"));
        this.bt_login.disabled = false;
    };
    loginView.prototype.connectClose = function () {
        Laya.stage.addChild(new promptView("连接已经断开，请重新登陆！"));
        this.bt_login.disabled = false;
    };
    return loginView;
}(ui.loginUI));
//# sourceMappingURL=loginView.js.map