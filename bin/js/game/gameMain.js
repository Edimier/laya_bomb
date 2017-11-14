var Define = /** @class */ (function () {
    function Define() {
    }
    Define.UP = 1;
    Define.DOWN = 2;
    Define.LEFT = 3;
    Define.RIGHT = 4;
    Define.STONE = 1;
    Define.STRICK = 2;
    Define.EMPTYPLACE = 3;
    Define.PLAYER = 4;
    return Define;
}());
var gameMain = /** @class */ (function () {
    function gameMain() {
        this._stricks = {};
        this._players = new Array();
        server.on("user.JoinRep", this, this.handleJoinRep);
        server.on("game.GameMessageNtf", this, this.handleGameMessageNtf);
        server.on("game.QuitGameRep", this, this.handleQuitGameRep);
        server.on("game.SetSession", this, this.handleSetSession);
        server.on("game.MapNtf", this, this.handleMapNtf);
        server.on("game.OperateRep", this, this.handleOperate);
        server.on("game.OperateNtf", this, this.handleOperateNtf);
        server.on("game.GameEndNtf", this, this.handleGameEndNtf);
        this._can_move_x = new Array();
        this._can_move_y = new Array();
        this._can_move_x[0] = 164;
        this._can_move_y[0] = 83;
        for (var i = 1; i < 5; ++i) {
            this._can_move_x[i] = this._can_move_x[i - 1] + 41;
            this._can_move_y[i] = this._can_move_y[i - 1] + 41;
        }
        for (var i = 5; i < 7; ++i) {
            this._can_move_y[i] = this._can_move_y[i - 1] + 41;
        }
    }
    gameMain.prototype.handleGameEndNtf = function (msg) {
    };
    gameMain.prototype.handleOperateNtf = function (msg) {
    };
    gameMain.prototype.handleOperate = function (msg) {
    };
    gameMain.prototype.calc_pos_xy = function (index) {
        var x = index % 15 - 2;
        var y = Math.floor(index / 15) - 1;
        return [164 + x * 21, 83 + y * 20.5];
    };
    gameMain.prototype.createOtherPlayer = function (uid, x, y, index) {
    };
    gameMain.prototype.calc_pos_index = function (x, y) {
        var yy = ((y - 83) / 20.5 + 1) * 15;
        var xx = (x - 164) / 21 + 2 + (Math.floor(yy / 15) - 1) * 15;
        return Math.round(xx + 15);
    };
    gameMain.prototype.send_pos = function (x, y, pos_index) {
        // if(server){
        //     x = x ? x : this._self.x;
        //     y = y ? y : this._self.y;
        //     pos_index = pos_index ? pos_index : this.calc_pos_index(x, y);
        //     server.sendData("game.SelfMessageNtf",{session : this._session, pos : [x,y,pos_index]});
        // } else {
        // }
    };
    gameMain.prototype.can_move = function (posx, posy, opt) {
        if (opt == Define.DOWN || opt == Define.UP) {
            if (opt == Define.DOWN) {
                if (posy + 1 > this._can_move_y[this._can_move_y.length - 1]) {
                    console.log(1);
                    return false;
                }
                if (this._stricks[this.calc_pos_index(posx, posy + 1)]) {
                    console.log(2);
                    return false;
                }
            }
            else {
                if (posy - 1 < this._can_move_y[0]) {
                    console.log(3);
                    return false;
                }
                if (this._stricks[this.calc_pos_index(posx, posy - 1)]) {
                    console.log(4);
                    return false;
                }
            }
            for (var i in this._can_move_x) {
                if (posx > this._can_move_x[i] - 2 && posx < this._can_move_x[i] + 2) {
                    console.log(5);
                    return true;
                }
            }
        }
        else {
            if (opt == Define.LEFT) {
                if (posx - 1 < this._can_move_x[0]) {
                    console.log(6);
                    return false;
                }
                if (this._stricks[this.calc_pos_index(posx - 1, posy)]) {
                    console.log(7);
                    return false;
                }
            }
            else {
                if (posx + 1 > this._can_move_x[this._can_move_x.length - 1]) {
                    console.log(8);
                    return false;
                }
                if (this._stricks[this.calc_pos_index(posx + 1, posy)]) {
                    console.log(8);
                    return false;
                }
            }
            for (var i in this._can_move_y) {
                if (posy > this._can_move_y[i] - 2 && posy < this._can_move_y[i] + 2) {
                    console.log(9);
                    return true;
                }
            }
        }
        console.log(10);
        return false;
    };
    gameMain.prototype.moveDown = function () {
        if (this.can_move(this._self.x, this._self.y, Define.DOWN)) {
            this._self.y += 1;
            this.send_pos();
        }
    };
    gameMain.prototype.moveUp = function () {
        if (this.can_move(this._self.x, this._self.y, Define.UP)) {
            this._self.y -= 1;
            this.send_pos();
        }
    };
    gameMain.prototype.moveLeft = function () {
        if (this.can_move(this._self.x, this._self.x, Define.LEFT)) {
            this._self.x -= 1;
            this.send_pos();
        }
    };
    gameMain.prototype.moveRight = function () {
        if (this.can_move(this._self.x, this._self.x, Define.RIGHT)) {
            this._self.x += 1;
            this.send_pos();
        }
    };
    gameMain.prototype.handleMove = function (opt) {
        var _this = this;
        var frameStep = 5;
        switch (opt) {
            case Define.DOWN:
                this._bg.bt_down.on(Laya.Event.MOUSE_UP, this, function () {
                    Laya.timer.clear(_this, _this.moveDown);
                });
                Laya.timer.frameLoop(frameStep, this, this.moveDown);
                break;
            case Define.UP:
                this._bg.bt_up.on(Laya.Event.MOUSE_UP, this, function () {
                    Laya.timer.clear(_this, _this.moveUp);
                });
                Laya.timer.frameLoop(frameStep, this, this.moveUp);
                break;
            case Define.LEFT:
                this._bg.bt_left.on(Laya.Event.MOUSE_UP, this, function () {
                    Laya.timer.clear(_this, _this.moveLeft);
                });
                Laya.timer.frameLoop(frameStep, this, this.moveLeft);
                break;
            case Define.RIGHT:
                this._bg.bt_right.on(Laya.Event.MOUSE_UP, this, function () {
                    Laya.timer.clear(_this, _this.moveRight);
                });
                Laya.timer.frameLoop(frameStep, this, this.moveRight);
                break;
            default:
                break;
        }
    };
    gameMain.prototype.initStageBlock = function () {
        var bg = this._bg;
        var start = bg.getChildIndex(bg.getChildByName("stone1"));
        for (var i = 165; i > 0; --i) {
            var stoneName = "stone" + i;
            var stone = bg.getChildByName(stoneName);
            if (stone) {
                bg.setChildIndex(stone, start);
            }
        }
    };
    gameMain.prototype.handleMapNtf = function (msg) {
        console.log("here");
        this._bg = new gameBg(this);
        Laya.stage.addChild(this._bg);
        this.initStageBlock();
        this._self = new player();
        var self = this._self;
        var bg = this._bg;
        self.loadImage("comp/boy_front.png");
        bg.addChild(self);
        var height = bg.m_stone1.height;
        var width = bg.m_stone1.width;
        var re = self.getBounds();
        self.scaleX = width / re.width;
        self.scaleY = height / re.height;
        bg.m_score1.text = "0";
        bg.bt_down.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.DOWN]);
        bg.bt_up.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.UP]);
        bg.bt_left.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.LEFT]);
        bg.bt_right.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.RIGHT]);
        var startIndex = 0;
        for (var i = 0; i < msg.wall.length; ++i) {
            var index = i + 1;
            var type = msg.wall[i];
            var stoneName = "stone" + index;
            var stone = bg.getChildByName(stoneName);
            if ((index - 1) % 15 == 0 && stone) {
                startIndex = bg.getChildIndex(stone);
            }
            if (type == Define.STRICK) {
                var sp = new Laya.Sprite();
                sp.loadImage("comp/brick.png");
                bg.addChild(sp);
                var height_1 = bg.m_stone1.height;
                var width_1 = bg.m_stone1.width;
                sp.height = height_1;
                sp.width = width_1;
                var x = bg.m_stone1.x;
                var y = bg.m_stone1.y;
                var re_1 = sp.getBounds();
                sp.scaleX = width_1 / re_1.width;
                sp.scaleY = height_1 / re_1.height;
                var xi = 164 + (index % 15 - 2) * 21;
                var yi = 93 + (Math.floor(index / 15) - 1) * 20.5;
                sp.pos(xi, yi);
                this._stricks[index] = true;
                var last = bg.getChildAt(bg.numChildren - 1);
                bg.setChildIndex(last, startIndex);
            }
        }
        for (var i = 0; i < msg.pos.length; i = i + 4) {
            var uid = msg.pos[i];
            var x = msg.pos[i + 1];
            var y = msg.pos[i + 2];
            var index = msg.pos[i + 3];
            if (uid == this._uid) {
                if (x > 0 && y > 0) {
                    self.pos(x, y);
                }
                else {
                    var pos = this.calc_pos_xy(index);
                    self.pos(pos[0], pos[1]);
                }
            }
            else {
                this.createOtherPlayer(uid, x, y, index);
            }
        }
    };
    gameMain.prototype.rand = function (low, up) {
        return Math.floor(Math.random() * (up - low + 1) + low);
    };
    gameMain.prototype.handleSetSession = function (msg) {
        if (msg && msg.session) {
            this._session = Number(msg.session);
        }
        else {
            console.log("Not have session");
        }
    };
    gameMain.prototype.handleGameMessageNtf = function (msg) {
        if (!this._bg) {
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }
    };
    gameMain.prototype.handleQuitGameRep = function (msg) {
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
    gameMain.prototype.handleJoinRep = function (msg) {
        if (msg.result != 0) {
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    };
    gameMain.prototype.mainProcess = function (uid) {
        this._uid = uid;
        server.sendData("user.JoinReq", { uid: this._uid, roomid: 1000 });
    };
    return gameMain;
}());
//# sourceMappingURL=gameMain.js.map