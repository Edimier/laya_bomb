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
var gameBg = /** @class */ (function (_super) {
    __extends(gameBg, _super);
    function gameBg(f) {
        var _this = _super.call(this) || this;
        if (f) {
            _this._father = f;
        }
        return _this;
        //this.bt_close.on(Laya.Event.CLICK, this, this.handleClose);
    }
    gameBg.prototype.handleClose = function () {
        Laya.stage.addChild(new loginView());
        if (this._father) {
            this._father.destroy();
        }
        this.removeSelf();
        this.destroy();
        console.log("logout here");
        server.logout();
    };
    return gameBg;
}(ui.gamebgUI));
//# sourceMappingURL=gameBg.js.map