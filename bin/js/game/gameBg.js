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
    //private _node:laya.display.Node;
    function gameBg() {
        var _this = _super.call(this) || this;
        _this._players = new Array();
        _this.bt_close.on(Laya.Event.CLICK, _this, _this.handleClose);
        _this.initSelf();
        server.on("game.GameMessageNtf", _this, _this.GameMessageNtf);
        server.on("game.QuitGameRep", _this, _this.QuitGameRep);
        return _this;
    }
    gameBg.prototype.handleClose = function () {
        server.sendData("game.QuitGameReq", { session: this._session, uid: this._uid });
        Laya.stage.addChild(new loginView());
        this._self.removeSelf();
        this._self.destroy();
        this.removeSelf();
        this.destroy();
    };
    gameBg.prototype.GameMessageNtf = function (msg) {
    };
    gameBg.prototype.QuitGameRep = function (msg) {
    };
    gameBg.prototype.initSelf = function () {
        function rand(low, up) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }
        this._self = new player();
        //this._self.graphics.drawCircle(rand(0,600), rand(0,400), 20, "#FF0000");
        this._self.graphics.drawCircle(30, 30, 20, "#FF0000");
        Laya.stage.addChild(this._self);
    };
    return gameBg;
}(ui.gamebgUI));
//# sourceMappingURL=gameBg.js.map