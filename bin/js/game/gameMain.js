var gameMain = /** @class */ (function () {
    function gameMain() {
        this._startx = 250;
        this._starty = 100;
        this._stricks = {};
        this._val = 8;
        this._val2 = 16;
        this._die = false;
        this._timer = new Laya.Timer();
        this._players = new Array();
        server.on("user.JoinRep", this, this.handleJoinRep);
        server.on("game.GameMessageNtf", this, this.handleGameMessageNtf);
        server.on("game.QuitGameRep", this, this.handleQuitGameRep);
        server.on("game.SetSession", this, this.handleSetSession);
        server.on("game.MapNtf", this, this.handleMapNtf);
        server.on("game.OperateNtf", this, this.handleOperateNtf);
        server.on("game.GameEndNtf", this, this.handleGameEndNtf);
        server.on("game.LeaveTable", this, this.handleLeaveTable);
        server.on("game.EnterTable", this, this.handleEnterTable);
        server.on("user.NotifyKickout", this, this.handleNotifyKickout);
    }
    gameMain.prototype.handleNotifyKickout = function (msg) {
        if (msg.reason == 1) {
            Laya.stage.addChild(new promptView("您的账号已经在别处登陆！"));
        }
    };
    gameMain.prototype.handleLeaveTable = function (msg) {
        if (msg) {
            for (var i = 0; i < this._players.length; ++i) {
                var p = this._players[i];
                if (p && p._uid == msg.uid) {
                    p.removeSelf();
                    p.destroy();
                    this._players[i] = undefined;
                    this._bg.imge_head_other.removeChildAt(this._bg.imge_head_other.numChildren - 1);
                    var sp = new Laya.Sprite();
                    sp.loadImage("comp/waitting.png");
                    this._bg.imge_head_other.addChild(sp);
                }
            }
        }
    };
    gameMain.prototype.handleGameEndNtf = function (msg) {
        this.showGameOver();
        console.log("游戏结束！");
        this._timer.once(3000, this, this.closeBack);
    };
    gameMain.prototype.destroyBlock = function (blocks, index) {
        if (blocks && blocks[index]) {
            blocks[index].removeSelf();
            blocks[index].destroy();
            blocks[index] = undefined;
            this._map[index] = 3;
            var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
            var bombing = new ui.bombingUI();
            bombing.pos(pos[0], pos[1]);
            var node_1 = Laya.stage.addChild(bombing);
            bombing.ani_bombing.play(0, false);
            Laya.timer.once(1500, this, function () { Laya.stage.removeChild(node_1); });
        }
    };
    gameMain.prototype.changeToGray = function (p) {
        var colorMatrix = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ];
        //创建灰色颜色滤镜
        var GrayFilter = new Laya.ColorFilter(colorMatrix);
        //添加灰色颜色滤镜效果
        p.filters = [GrayFilter];
        return GrayFilter;
    };
    gameMain.prototype.playBombSound = function () {
        Laya.SoundManager.playSound("comp/bombing.mp3", 1);
    };
    gameMain.prototype.showGameOver = function () {
        var gameOver = new Laya.Sprite();
        gameOver.loadImage("comp/game_over.png");
        Laya.stage.addChild(gameOver);
    };
    gameMain.prototype.handleOperateNtf = function (msg) {
        var _this = this;
        if (msg) {
            if (msg.result == 2) {
                for (var i = 0; i < msg.opt.length; i = i + 3) {
                    var uid = msg.opt[i];
                    var index = msg.opt[i + 1];
                    var bomb = new Laya.Animation();
                    bomb.loadAnimation("scale_bomb.ani");
                    this._bg.addChild(bomb);
                    var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                    bomb.pos(pos[0], pos[1] - this._val);
                    bomb.play();
                    this._bg.setChildIndex(this._bg.getChildAt(this._bg.numChildren - 1), this._bg.numChildren - 4);
                    if (uid == this._uid) {
                        this._self._blocks[index] = bomb;
                    }
                    else {
                        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                            var p = _a[_i];
                            if (p && p._uid == uid) {
                                p._blocks[index] = bomb;
                                break;
                            }
                        }
                    }
                }
            }
            else if (msg.result == 3) {
                var index = msg.opt[0];
                if (msg.uid == this._uid) {
                    this.destroyBlock(this._self._blocks, index);
                    this.playBombSound();
                    for (var i = 1; i < msg.opt.length; ++i) {
                        this.destroyBlock(this._stricks, msg.opt[i]);
                    }
                    if (msg.score && msg.score > 0) {
                        var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                        var coin = new Laya.Sprite();
                        coin.loadImage("comp/coin.png");
                        coin.pos(pos[0], pos[1]);
                        coin.scale(0.1, 0.1);
                        var node_2 = Laya.stage.addChild(coin);
                        var tox = this._bg.m_score1.x;
                        var toy = this._bg.m_score1.y;
                        Laya.Tween.to(coin, { x: tox, y: toy }, 3000, Laya.Ease.elasticInOut, null, 0);
                        Laya.timer.once(2300, this, function () {
                            Laya.stage.removeChild(node_2);
                            _this._bg.m_score1.text = msg.score.toString();
                        });
                    }
                }
                else {
                    for (var _b = 0, _c = this._players; _b < _c.length; _b++) {
                        var p = _c[_b];
                        if (p && p._uid == msg.uid) {
                            this.destroyBlock(p._blocks, index);
                            this.playBombSound();
                            for (var i = 1; i < msg.opt.length; ++i) {
                                this.destroyBlock(this._stricks, msg.opt[i]);
                            }
                            if (msg.score && msg.score > 0) {
                                this._bg.m_score2.text = msg.score.toString();
                            }
                        }
                    }
                }
            }
            else if (msg.result == 4) {
                for (var _d = 0, _e = msg.opt; _d < _e.length; _d++) {
                    var uid = _e[_d];
                    if (uid == this._uid) {
                        this._die = true;
                        var filter = this.changeToGray(this._self);
                        this._bg.imge_head_self.filters = [filter];
                        // let node = this._self.getChildAt(this._self.numChildren - 1) as Laya.Text;
                        // if(node){
                        //     node.text = "DIE";
                        //     node.color = "#ff0000";
                        //     this.showGameOver();
                        // }
                        this._bg.imge_head_self.loadImage("comp/die.png");
                    }
                    else {
                        for (var _f = 0, _g = this._players; _f < _g.length; _f++) {
                            var p = _g[_f];
                            if (p && p._uid == uid) {
                                p._die = true;
                                var filter = this.changeToGray(p);
                                this._bg.imge_head_other.filters = [filter];
                                this._bg.imge_head_other.loadImage("comp/die.png");
                                // let node = this._self.getChildAt(p.numChildren - 1) as Laya.Text;
                                // if(node){
                                //     node.text = "DIE";
                                //     node.color = "#ff0000";
                                // }
                            }
                        }
                    }
                }
            }
        }
    };
    gameMain.prototype.calc_pos_xy = function (i, width, height, basex, basey) {
        var x = i % this._rank;
        var y = Math.floor(i / this._rank);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        return [basex + x * width, basey + y * height];
    };
    gameMain.prototype.createOtherPlayer = function (uid, index, nickname, image) {
        var other = new player();
        other.initPlayer("carton" + image);
        var sp = new Laya.Sprite();
        sp.loadImage("carton" + image + "/head.png");
        this._bg.imge_head_other.addChild(sp);
        other.interval = 50;
        other.scaleY = 0.85;
        other._uid = uid;
        other._nickname = nickname;
        this._bg.addChild(other);
        other.Play(0, false, "stand");
        this._bg.m_lable2.text = nickname;
        var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
        other.pos(pos[0], pos[1] - this._val);
        this._players.push(other);
        return true;
    };
    gameMain.prototype.calc_pos_index = function (x, y) {
        var yy = Math.floor((y - this._starty) / (this._height - this._val)) * this._rank;
        var xx = (x - this._startx) / this._width;
        var ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    };
    gameMain.prototype.send_pos = function (pos_index) {
        if (server) {
            pos_index = pos_index ? pos_index : this.calc_pos_index(this._self.x, this._self.y + this._val2);
            server.sendData("game.SelfMessageNtf", { session: this._session, pos: pos_index });
        }
    };
    gameMain.prototype.can_move = function (posx, posy, opt) {
        var index = this.calc_pos_index(posx, posy);
        if (this._map[index] && this._map[index] == Define.EMPTYPLACE) {
            return true;
        }
        return false;
    };
    gameMain.prototype.moveDown = function () {
        if (this.can_move(this._self.x, this._self.y + this._val2 + this._height - this._val, Define.DOWN)) {
            this._self.Play(0, false, "front");
            this._self.y += this._height - this._val;
            this.send_pos();
        }
    };
    gameMain.prototype.moveUp = function () {
        if (this.can_move(this._self.x, this._self.y + this._val2 - this._height + 10, Define.UP)) {
            this._self.Play(0, false, "behind");
            this._self.y -= this._height - this._val;
            this.send_pos();
        }
    };
    gameMain.prototype.moveLeft = function () {
        if (this.can_move(this._self.x - this._width, this._self.y + this._val2, Define.LEFT)) {
            this._self.Play(0, false, "left");
            this._self.x -= this._width;
            this.send_pos();
        }
    };
    gameMain.prototype.moveRight = function () {
        if (this.can_move(this._self.x + this._width, this._self.y + this._val2, Define.RIGHT)) {
            this._self.Play(0, false, "right");
            this._self.x += this._width;
            this.send_pos();
        }
    };
    gameMain.prototype.handleMove = function (opt) {
        if (this._die) {
            return;
        }
        switch (opt) {
            case Define.DOWN:
                this.moveDown();
                break;
            case Define.UP:
                this.moveUp();
                break;
            case Define.LEFT:
                this.moveLeft();
                break;
            case Define.RIGHT:
                this.moveRight();
                break;
            default:
                break;
        }
    };
    // 投放炸弹
    gameMain.prototype.handleBomb = function () {
        if (this._die) {
            return;
        }
        var index = this.calc_pos_index(this._self.x, this._self.y + this._val2);
        server.sendData("game.OperateReq", { session: this._session, optn: 2, opt: [this._uid, index + 1, 1] });
    };
    gameMain.prototype.handleKeyDown = function (e) {
        if (e.keyCode == 37) {
            this.handleMove(Define.LEFT);
        }
        else if (e.keyCode == 39) {
            this.handleMove(Define.RIGHT);
        }
        else if (e.keyCode == 38) {
            this.handleMove(Define.UP);
        }
        else if (e.keyCode == 40) {
            this.handleMove(Define.DOWN);
        }
        else if (e.keyCode == 65) {
            this.handleBomb();
        }
    };
    gameMain.prototype.initButton = function () {
        var _this = this;
        var bg = this._bg;
        bg.m_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.m_up.on(Laya.Event.CLICK, this, this.handleMove, [Define.UP]);
        bg.m_left.on(Laya.Event.CLICK, this, this.handleMove, [Define.LEFT]);
        bg.m_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);
        Laya.stage.on(Laya.Event.KEY_UP, this, this.handleKeyDown);
        bg.bt_bomb.on(Laya.Event.CLICK, this, this.handleBomb);
        bg.m_down.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_down.alpha = 1; });
        bg.m_up.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_up.alpha = 1; });
        bg.m_left.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_left.alpha = 1; });
        bg.m_right.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_right.alpha = 1; });
        bg.bt_bomb.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.bt_bomb.alpha = 1; });
        bg.m_down.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_down.alpha = 0.5; });
        bg.m_up.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_up.alpha = 0.5; });
        bg.m_left.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_left.alpha = 0.5; });
        bg.m_right.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_right.alpha = 0.5; });
        bg.bt_bomb.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.bt_bomb.alpha = 0.5; });
    };
    gameMain.prototype.handleEnterTable = function (msg) {
        if (msg.uid == this._uid) {
            console.log("error handleEnterTable");
        }
        else {
            this._bg.imge_head_other.destroyChildren();
            this.createOtherPlayer(msg.uid, msg.index, msg.nickname, msg.image);
        }
    };
    gameMain.prototype.handleMapNtf = function (msg) {
        this._map = msg.wall;
        this._bg = new gameBg();
        this._rank = msg.rank;
        this._row = msg.row;
        this._bg.bt_close.on(Laya.Event.CLICK, this, this.closeBack);
        Laya.stage.addChild(this._bg);
        this.initButton();
        sound.initSound(1040, 120, true);
        sound.PlayBgMusic();
        var bg = this._bg;
        bg.m_lable1.align = "center";
        bg.m_lable1.fontSize = 18;
        bg.m_lable1.bold = true;
        bg.m_lable2.align = "center";
        bg.m_lable2.fontSize = 10;
        var height = 30; //sp.height - 10;
        var width = 28; //sp.width;
        this._height = 38; //sp.height;
        this._width = 28; //sp.width;
        for (var i = 0; i < msg.wall.length; ++i) {
            var type = msg.wall[i];
            var x = i % this._rank;
            var y = Math.floor(i / this._rank);
            if (type == Define.STRICK) {
                if (i % 2 == 0) {
                    var sp2 = new Laya.Sprite();
                    bg.addChild(sp2);
                    sp2.loadImage("comp/shadow.png");
                    sp2.scale(0.5, 0.5);
                    sp2.pos(this._startx + x * width - 1, this._starty + y * height + 6);
                }
                var sp = new Laya.Sprite();
                bg.addChild(sp);
                sp.loadImage("comp/strick.png");
                sp.scale(0.1, 0.1);
                sp.pos(this._startx + x * width, this._starty + y * height);
                //this._self._blocks[i] = sp;
                this._stricks[i] = sp;
            }
            else if (type == Define.STONE) {
                var sp = new Laya.Sprite();
                bg.addChild(sp);
                sp.loadImage("comp/stone2.png");
                sp.scale(0.1, 0.1);
                sp.pos(this._startx + x * width, this._starty + y * height);
            }
            else if (type == Define.EMPTYPLACE && i % 2 == 0) {
                var sp = new Laya.Sprite();
                bg.addChild(sp);
                sp.loadImage("comp/shadow.png");
                sp.scale(0.5, 0.5);
                sp.pos(this._startx + x * width - 1, this._starty + y * height + 6);
            }
        }
        for (var _i = 0, _a = ["up", "down", "left", "right", "bomb"]; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var node = bg.getChildByName(name_1);
            if (node) {
                bg.setChildIndex(node, bg.numChildren - 1);
            }
        }
        this._self = new player();
        var self = this._self;
        var createOtherSuccess;
        for (var _b = 0, _c = msg.pos; _b < _c.length; _b++) {
            var p = _c[_b];
            var uid = p.uid;
            var index = p.index;
            var nickname = p.nickname;
            var image = p.image;
            if (uid == this._uid) {
                self.initPlayer("carton" + image);
                this._bg.imge_head_self.loadImage("carton" + image + "/head.png");
                self.interval = 50;
                self.scaleY = 0.85;
                bg.addChild(self);
                self.Play(0, true, "stand");
                var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                self.pos(pos[0], pos[1] - this._val);
                bg.m_lable1.text = nickname;
            }
            else {
                createOtherSuccess = this.createOtherPlayer(uid, index, nickname, image);
            }
        }
        if (!createOtherSuccess) {
            if (this._bg.imge_head_other.numChildren > 0) {
                this._bg.imge_head_other.removeChildAt(this._bg.imge_head_other.numChildren - 1);
            }
            var sp = new Laya.Sprite();
            sp.loadImage("comp/waitting.png");
            this._bg.imge_head_other.addChild(sp);
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
    gameMain.prototype.handleCartonEff = function (p, tox, toy) {
        var x = p.x;
        var y = p.y;
        if (x < tox) {
            p.Play(0, false, "right");
        }
        else if (x > tox) {
            p.Play(0, false, "left");
        }
        else if (y > toy) {
            p.Play(0, false, "behind");
        }
        else if (y < toy) {
            p.Play(0, false, "front");
        }
        p.pos(tox, toy);
    };
    gameMain.prototype.handleGameMessageNtf = function (msg) {
        for (var i = 0; i < msg.pmsg.length; i = i + 2) {
            var uid = msg.pmsg[i];
            var index = msg.pmsg[i + 1];
            for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                var p = _a[_i];
                if (p && p._uid == uid) {
                    var pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                    this.handleCartonEff(p, pos[0], pos[1] - this._val);
                }
            }
        }
    };
    gameMain.prototype.handleQuitGameRep = function (msg) {
    };
    gameMain.prototype.closeBack = function () {
        if (server) {
            server.sendData("game.QuitGameReq", { session: this._session, roomid: 1000, status: 0 });
            server.logout();
        }
        sound.StopPlayBgMusic();
        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p) {
                p.removeSelf();
                p.destroy();
            }
        }
        this._self.removeSelf();
        this._self.destroy();
        Laya.stage.addChild(new loginView());
    };
    gameMain.prototype.handleJoinRep = function (msg) {
        if (msg.result != 0) {
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    };
    gameMain.prototype.mainProcess = function (msg) {
        this._uid = msg.uid;
        this._nickname = msg.nickname;
        server.sendData("user.JoinReq", { uid: this._uid, roomid: 1000 });
    };
    return gameMain;
}());
//# sourceMappingURL=gameMain.js.map