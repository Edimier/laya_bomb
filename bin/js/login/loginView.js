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
        _this.pos((Laya.stage.width - 600) / 2, (Laya.stage.height - 400) / 2);
        _this.bt_login.on(Laya.Event.CLICK, _this, _this.handleLogin);
        server.on("LOGIN_SUCCESS", _this, _this.loginSuccess);
        server.on("LOGIN_FAILED", _this, _this.loginSuccess);
        server.on("CONNECT_CLOSE", _this, _this.connectClose);
        server.on("CONNECT_ERROR", _this, _this.connectClose);
        return _this;
    }
    loginView.prototype.handleLogin = function () {
        var data = this.bt_input.text;
        console.log(data);
        if (data) {
            var uid = Number(data);
            if (uid < 1 || uid > 100) {
                Laya.stage.addChild(new promptView("输入的 uid 不在1~100之间！！"));
            }
            else {
                server.connect(uid);
            }
        }
        else {
            Laya.stage.addChild(new promptView("请输入uid"));
        }
    };
    loginView.prototype.loginSuccess = function () {
        Laya.stage.addChild(new gameBg());
        this.removeSelf();
        this.destroy();
        //Laya.stage.addChild(new  promptView("登陆成功！"));
    };
    loginView.prototype.loginFailed = function () {
        Laya.stage.addChild(new promptView("登陆失败！"));
    };
    loginView.prototype.connectClose = function () {
        Laya.stage.addChild(new promptView("连接已经断开，请重新登陆！"));
    };
    return loginView;
}(ui.loginUI));
//# sourceMappingURL=loginView.js.map