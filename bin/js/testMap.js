var testMap = /** @class */ (function () {
    function testMap() {
        this._uid = 23;
        this._self = new player();
        this._self._uid = 23;
        this._startx = 140;
        this._starty = 80;
    }
    testMap.prototype.calc_pos_xy = function (i, width, height, basex, basey) {
        var x = i % 15;
        var y = Math.floor(i / 15);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        //console.log(x,y);
        return [basex + x * width, basey + y * height];
    };
    testMap.prototype.createOtherPlayer = function (uid, x, y, index) {
    };
    testMap.prototype.calc_pos_index = function (x, y) {
        var yy = Math.floor((y - this._starty) / (this._height - 10)) * 15;
        var xx = (x - this._startx) / this._width;
        var ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    };
    testMap.prototype.send_pos = function (x, y, pos_index) {
    };
    testMap.prototype.can_move = function (posx, posy, opt) {
        var index = this.calc_pos_index(posx, posy);
        if (this._map[index] && this._map[index] == Define.EMPTYPLACE) {
            return true;
        }
        return false;
    };
    testMap.prototype.moveDown = function () {
        if (this.can_move(this._self.x, this._self.y + 20 + this._height - 10, Define.DOWN)) {
            this._self.y += this._height - 10;
            this.send_pos();
        }
    };
    testMap.prototype.moveUp = function () {
        if (this.can_move(this._self.x, this._self.y + 20 - this._height + 10, Define.UP)) {
            this._self.y -= this._height - 10;
            this.send_pos();
        }
    };
    testMap.prototype.moveLeft = function () {
        if (this.can_move(this._self.x - this._width, this._self.y + 20, Define.LEFT)) {
            this._self.x -= this._width;
            this.send_pos();
        }
    };
    testMap.prototype.moveRight = function () {
        if (this.can_move(this._self.x + this._width, this._self.y + 20, Define.RIGHT)) {
            this._self.x += this._width;
            this.send_pos();
        }
    };
    testMap.prototype.handleMove = function (opt) {
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
    testMap.prototype.test = function () {
        var msg = {
            wall: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 1, 3, 1, 3, 1, 1, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 3, 1, 2, 1, 3, 1, 3, 1, 3, 1, 2, 1, 1, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 2, 3, 1, 1, 3, 1, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 2, 1, 1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            //wall : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            pos: [23, 0, 0, 16]
        };
        this.handleMapNtf(msg);
    };
    testMap.prototype.handleBomb = function () {
        var bomb = new Laya.Sprite();
        bomb.loadImage("comp/bomb.png");
        this._bg.addChild(bomb);
        bomb.pos(this._self.x, this._self.y);
        console.log(this.calc_pos_index(this._self.x, this._self.y + 20));
        this._bg.setChildIndex(this._bg.getChildAt(this._bg.numChildren - 1), this._bg.numChildren - 2);
        bomb.timerOnce(3000, this, function () {
            bomb.removeSelf();
            bomb.destroy();
        });
    };
    testMap.prototype.handleMapNtf = function (msg) {
        var _this = this;
        this._map = msg.wall;
        this._bg = new gameBg();
        Laya.stage.addChild(this._bg);
        var bg = this._bg;
        this._can_move_x = new Array();
        this._can_move_y = new Array();
        // bg.bt_down.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.DOWN]);
        // bg.bt_up.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.UP]);
        // bg.bt_left.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.LEFT]);
        // bg.bt_right.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.RIGHT]);
        bg.bt_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.bt_up.on(Laya.Event.CLICK, this, this.handleMove, [Define.UP]);
        bg.bt_left.on(Laya.Event.CLICK, this, this.handleMove, [Define.LEFT]);
        bg.bt_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);
        bg.bt_bomb.on(Laya.Event.CLICK, this, this.handleBomb);
        var startIndex = 0;
        for (var i = 0; i < msg.wall.length; ++i) {
            var type = msg.wall[i];
            var x = i % 15;
            var y = Math.floor(i / 15);
            if (type == Define.STRICK) {
                var sp = new Laya.Sprite();
                sp.loadImage("comp/strick.png");
                bg.addChild(sp);
                var height = sp.height - 10;
                var width = sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
            }
            else if (type == Define.STONE) {
                var sp = new Laya.Sprite();
                sp.loadImage("comp/stone.png");
                bg.addChild(sp);
                var height = sp.height - 10;
                var width = sp.width;
                this._height = sp.height;
                this._width = sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
                sp.on(Laya.Event.CLICK, this, function () {
                    _this.calc_pos_index(Laya.stage.mouseX, Laya.stage.mouseY);
                });
                //console.log(sp.x, sp.y, i);
                //this.calc_pos_index(sp.x, sp.y);
            }
        }
        for (var i = 0; i < msg.pos.length; i = i + 4) {
            var uid = msg.pos[i];
            var x = msg.pos[i + 1];
            var y = msg.pos[i + 2];
            var index = msg.pos[i + 3];
            if (uid == this._uid) {
                var self_1 = this._self;
                self_1.loadImage("comp/front.png");
                bg.addChild(self_1);
                if (x > 0 && y > 0) {
                    self_1.pos(x, y);
                }
                else {
                    var pos = this.calc_pos_xy(index, this._width, this._height - 20);
                    self_1.pos(pos[0], pos[1]);
                }
            }
            else {
                this.createOtherPlayer(uid, x, y, index);
            }
        }
    };
    return testMap;
}());
//# sourceMappingURL=testMap.js.map