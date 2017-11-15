class gameMain{
    private _players:Array<player>;
    private _uid:number;
    private _session:number;
    private _self:player;
    private _bg:gameBg;

    private _map;
    private _height;
    private _width;
    private _startx;
    private _starty;
    private _stricks;

    constructor(){
        this._startx = 90;
        this._starty = 80;

        this._stricks = {};

        this._players = new Array<player>();
        server.on("user.JoinRep", this, this.handleJoinRep);
        server.on("game.GameMessageNtf", this, this.handleGameMessageNtf);
        server.on("game.QuitGameRep", this, this.handleQuitGameRep);
        server.on("game.SetSession", this, this.handleSetSession);
        server.on("game.MapNtf", this, this.handleMapNtf);
        server.on("game.OperateNtf", this, this.handleOperateNtf);
        server.on("game.GameEndNtf", this, this.handleGameEndNtf);
    }

    private handleGameEndNtf(msg:any){
        console.log("游戏结束！");
    }

    private destroyBlock(blocks, index){
        if(blocks && blocks[index]){
            blocks[index].removeSelf();
            blocks[index].destroy();
            blocks[index] = undefined;
            this._map[index] = 3;
        }
    }

    private handleOperateNtf(msg:any){
        if(msg){
            if (msg.result == 2){
                for(let i = 0; i < msg.opt.length; i = i + 3){
                    let uid = msg.opt[i];
                    let index = msg.opt[i + 1];

                    let bomb = new Laya.Sprite();
                    bomb.loadImage("comp/bomb.png");
                    this._bg.addChild(bomb);
                    let pos = this.calc_pos_xy(index, this._width, this._height - 10);
                    bomb.pos(pos[0], pos[1]-10);
                    this._bg.setChildIndex(this._bg.getChildAt( this._bg.numChildren - 1), this._bg.numChildren - 2);

                    if (uid == this._uid){
                        this._self._blocks[index] = bomb;
                    } else {
                        for(let p of this._players){
                            if(p._uid == uid){
                                p._blocks[index] = bomb;
                                break;
                            }
                        }
                    }
                }
            } else if(msg.result == 3){
                let index = msg.opt[0];
                if(msg.uid == this._uid){
                    this.destroyBlock(this._self._blocks, index);
                    for(let i = 1; i < msg.opt.length; ++i){
                        this.destroyBlock(this._stricks, msg.opt[i]);
                    }
                    if(msg.score && msg.score > 0){
                        this._bg.m_score1.text = msg.score.toString();
                    }
                } else {
                    for(let p of this._players){
                        if(p._uid == msg.uid){
                            this.destroyBlock(p._blocks, index);
                            for(let i = 1; i < msg.opt.length; ++i){
                                this.destroyBlock(this._stricks, msg.opt[i]);
                            }
                            if(msg.score && msg.score > 0){
                                this._bg.m_score2.text = msg.score.toString();
                            }
                        }
                    }
                }
            }
        }
    }

    private calc_pos_xy(i:number, width?:number, height?:number, basex?:number, basey?:number){
        let x = i % 15;
        let y = Math.floor(i/15);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        return [basex + x * width, basey + y * height];
    }

    private createOtherPlayer(uid, index){
        let other = new player();
        other._uid = uid;
        other.loadImage("comp/front.png");
        this._bg.addChild(other);
        let pos = this.calc_pos_xy(index, this._width, this._height - 20);
        other.pos(pos[0], pos[1]);
        this._players.push(other);
    }

    private calc_pos_index(x:number, y:number):number{
        let yy = Math.floor( (y - this._starty )/(this._height - 10) )* 15;
        let xx = ( x - this._startx )/this._width;
        let ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    }

    private send_pos(pos_index?:number){
        if(server){
            pos_index = pos_index ? pos_index : this.calc_pos_index(this._self.x, this._self.y + 20);
            server.sendData("game.SelfMessageNtf", {session:this._session, pos:pos_index});
        }
    }

    private can_move(posx, posy, opt):boolean{
        let index = this.calc_pos_index(posx, posy);
        if(this._map[index] && this._map[index] == Define.EMPTYPLACE){
            return true;
        }
        return false;
    }

    private moveDown(){
        if(this.can_move(this._self.x, this._self.y + 20 + this._height - 10, Define.DOWN)){
            this._self.y += this._height - 10;
            this.send_pos();
        }
    }

    private moveUp(){
        if(this.can_move(this._self.x, this._self.y  + 20 - this._height + 10, Define.UP)){
            this._self.y -= this._height - 10;
            this.send_pos();
        }
    }

    private moveLeft(){
        if(this.can_move(this._self.x - this._width, this._self.y + 20, Define.LEFT)){
            this._self.x -= this._width;
            this.send_pos();
        }
    }
    private moveRight(){
        if(this.can_move(this._self.x + this._width, this._self.y + 20, Define.RIGHT)){
            this._self.x += this._width;
            this.send_pos();
        }
    }

    private handleMove(opt){
         switch (opt){
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
    }

    private handleBomb(){
        let index = this.calc_pos_index(this._self.x, this._self.y + 20);
        server.sendData("game.OperateReq", {session:this._session, optn:2, opt:[this._uid, index + 1, 1]});
    }

    private initButton(){
        let bg:gameBg = this._bg;
        bg.m_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.m_up.on(Laya.Event.CLICK, this, this.handleMove,[Define.UP]);
        bg.m_left.on(Laya.Event.CLICK, this, this.handleMove,[Define.LEFT]);
        bg.m_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);
        bg.bt_bomb.on(Laya.Event.CLICK, this, this.handleBomb);

        bg.m_down.on(Laya.Event.MOUSE_DOWN, this, ()=>{ this._bg.m_down.alpha = 1;});
        bg.m_up.on(Laya.Event.MOUSE_DOWN, this, ()=>{this._bg.m_up.alpha = 1;});
        bg.m_left.on(Laya.Event.MOUSE_DOWN, this, ()=>{this._bg.m_left.alpha = 1;});
        bg.m_right.on(Laya.Event.MOUSE_DOWN, this, ()=>{this._bg.m_right.alpha = 1;});
        bg.bt_bomb.on(Laya.Event.MOUSE_DOWN, this, ()=>{this._bg.bt_bomb.alpha = 1;});

        bg.m_down.on(Laya.Event.MOUSE_UP, this, ()=>{this._bg.m_down.alpha = 0.5;});
        bg.m_up.on(Laya.Event.MOUSE_UP, this, ()=>{this._bg.m_up.alpha = 0.5;});
        bg.m_left.on(Laya.Event.MOUSE_UP, this, ()=>{this._bg.m_left.alpha = 0.5;});
        bg.m_right.on(Laya.Event.MOUSE_UP, this, ()=>{this._bg.m_right.alpha = 0.5;});
        bg.bt_bomb.on(Laya.Event.MOUSE_UP, this, ()=>{this._bg.bt_bomb.alpha = 0.5;});
    }

    private handleMapNtf(msg:any){
        this._map = msg.wall;
        this._bg = new gameBg();
        this._self = new player();

        this._bg.bt_close.on(Laya.Event.CLICK, this, this.closeBack);
        Laya.stage.addChild(this._bg);
        this.initButton();

        let bg:gameBg = this._bg;

        for(let i = 0; i < msg.wall.length; ++i){
            let type = msg.wall[i];
            let x = i % 15;
            let y = Math.floor(i/15);

            if(type == Define.STRICK){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/strick.png");
                bg.addChild(sp);
                let height = sp.height - 10;
                let width = sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
                //this._self._blocks[i] = sp;
                this._stricks[i] = sp;
            } else if(type == Define.STONE){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/stone.png");
                bg.addChild(sp);
                let height = sp.height - 10;
                let width = sp.width;
                this._height = sp.height;
                this._width = sp.width;

                sp.pos(this._startx + x * width, this._starty + y * height);
            }
        }

        for(let name of ["up", "down", "left", "right", "bomb"]){
            let node = bg.getChildByName(name);
            if(node){
                bg.setChildIndex( node, bg.numChildren - 1 );
            }
        }

        for(let i = 0; i < msg.pos.length; i = i + 2){
            let uid = msg.pos[i];
            let index = msg.pos[i+1];

            if(uid == this._uid){
                let self = this._self;
                self.loadImage("comp/front.png");
                bg.addChild(self);
                let pos = this.calc_pos_xy(index, this._width, this._height - 20);
                self.pos(pos[0], pos[1]);
            } else {
                this.createOtherPlayer(uid, index);
            }
        }
    }

    

    private rand(low: number, up: number) {
        return Math.floor(Math.random() * (up - low + 1) + low);
    }
    
    private handleSetSession(msg:any){
        if(msg && msg.session){
            this._session = Number(msg.session);
        } else {
            console.log("Not have session");
        }
    }

    private handleGameMessageNtf(msg:any){
        for(let i = 0; i < msg.pmsg.length; i = i + 2){
            let uid = msg.pmsg[i];
            let index = msg.pmsg[i + 1];

            for(let p of this._players){
                if(p._uid == uid){
                    let pos = this.calc_pos_xy(index, this._width, this._height - 20);
                    p.pos(pos[0], pos[1]);
                }
            }
        }
    }

    private handleQuitGameRep(msg:any){

    }

    public closeBack(){
        server.sendData("game.QuitGameReq", {session:this._session, uid:this._uid});
        server.logout();
        server = undefined;

        for(let p of this._players){
            p.removeSelf();
            p.destroy();
        }
        this._self.removeSelf();
        this._self.destroy();

        Laya.stage.addChild(new loginView());
    }

    private handleJoinRep(msg:any){
        if(msg.result != 0){
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    }

    public mainProcess(uid:number){
        this._uid = uid;
        server.sendData("user.JoinReq", {uid:this._uid, roomid:1000});
    }
}