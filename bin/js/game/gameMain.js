var gameMain = /** @class */ (function () {
    function gameMain() {
        this._players = new Array();
        server.on("game.GameMessageNtf", this, this.GameMessageNtf);
        server.on("game.QuitGameRep", this, this.QuitGameRep);
        server.on("game.SetSession", this, this.SetSession);
        server.on("user.JoinRep", this, this.JoinRep);
    }
    gameMain.prototype.SetSession = function (msg) {
        if (msg && msg.session) {
            this._session = Number(msg.session);
        }
        else {
            console.log("Not have session");
        }
    };
    gameMain.prototype.GameMessageNtf = function (msg) {
        var _this = this;
        if (!this._bg) {
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }
        function rand(low, up) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }
        // if( ! this._self){
        //     for(let i = 0; i < msg.pmsg.len; i = i + 3){
        //         if( msg.pmsg[i] == this._uid){
        //             this._self = new player();
        //             Laya.stage.addChild(this._self);
        //             this._self.graphics.drawCircle(msg.pmsg[i+1], msg.pmsg[i+2], 20, "#FF0000");
        //             break;
        //         }
        //     }
        // }
        //console.log(msg.pmsg.length);
        for (var i = 0; i < msg.pmsg.length; i = i + 3) {
            // console.log(msg.pmsg[ i ]);
            // console.log(msg.pmsg[i + 1]);
            // console.log(msg.pmsg[i + 2]);
            // console.log(this._uid);
            // console.log(typeof this._uid);
            // console.log(typeof msg.pmsg[ i ]);
            if (msg.pmsg[i] != this._uid) {
                var find = false;
                for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                    var p = _a[_i];
                    if (p._uid == msg.pmsg[i]) {
                        if (p.x != msg.pmsg[i + 1] && p.y != msg.pmsg[i + 2]) {
                            p.pos(msg.pmsg[i + 1], msg.pmsg[i + 2]);
                        }
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    var p = new player();
                    Laya.stage.addChild(p);
                    //p.graphics.drawCircle(msg.pmsg[i+1], msg.pmsg[i+2], 20, "#FF0000");
                    var res = "comp/a" + rand(1, 4) + ".png";
                    p.loadImage(res);
                    p.pos(msg.pmsg[i + 1], msg.pmsg[i + 2]);
                    p._uid = msg.pmsg[i];
                    this._players.push(p);
                }
            }
            else {
                if (!this._self) {
                    this._self = new player();
                    Laya.stage.addChild(this._self);
                    var res = "comp/a" + rand(1, 4) + ".png";
                    this._self.loadImage(res);
                    this._self.pos(msg.pmsg[i + 1], msg.pmsg[i + 2]);
                    this._self.on(Laya.Event.MOUSE_DOWN, this, function () {
                        _this._self.startDrag();
                        server.sendData("game.SelfMessageNtf", { session: _this._session, uid: _this._uid, pos: [Laya.stage.mouseX, Laya.stage.mouseY] });
                    });
                    //this._self.graphics.drawCircle(msg.pmsg[i+1], msg.pmsg[i+2], 20, "#FF0000");
                }
            }
        }
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
    gameMain.prototype.JoinRep = function (msg) {
        if (msg.result != 0) {
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    };
    gameMain.prototype.main = function (uid) {
        this._uid = uid;
        //         required int32 uid = 1;
        //         required int32 clientid = 2;
        //         required int32 result = 3;
        //         required int32 roomid = 4;
        // }
        server.sendData("user.JoinReq", { uid: this._uid, roomid: 1000 });
        //this.initSelf();
    };
    return gameMain;
}());
//# sourceMappingURL=gameMain.js.map