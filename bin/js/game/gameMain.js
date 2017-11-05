var gameMain = /** @class */ (function () {
    function gameMain() {
        this._players = new Array();
        server.on("game.GameMessageNtf", this, this.GameMessageNtf);
        server.on("game.QuitGameRep", this, this.QuitGameRep);
    }
    gameMain.prototype.GameMessageNtf = function (msg) {
        if (!this._bg) {
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }
        function rand(low, up) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }
        this._self = new player();
        Laya.stage.addChild(this._self);
        this._self.graphics.drawCircle(rand(0, 600), rand(0, 400), 20, "#FF0000");
    };
    gameMain.prototype.QuitGameRep = function (msg) {
    };
    gameMain.prototype.destroy = function () {
        server.sendData("game.QuitGameReq", { session: this._session, uid: this._uid });
        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
            var p = _a[_i];
            p.removeSelf();
            p.destroy();
        }
        this._self.removeSelf();
        this._self.destroy();
    };
    gameMain.prototype.initSelf = function () {
        this._bg = new gameBg(this);
        Laya.stage.addChild(this._bg);
        function rand(low, up) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }
        this._self = new player();
        Laya.stage.addChild(this._self);
        this._self.graphics.drawCircle(rand(0, 600), rand(0, 400), 20, "#FF0000");
        server.sendData("user.JoinReq", { uid: this._uid });
    };
    gameMain.prototype.main = function () {
        this.initSelf();
    };
    return gameMain;
}());
//# sourceMappingURL=gameMain.js.map