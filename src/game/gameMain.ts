class Define{
    static UP:number = 1;
    static DOWN:number = 2;
    static LEFT:number = 3;
    static RIGHT:number = 4;

    static STONE:number = 1;
    static STRICK:number = 2;
    static EMPTYPLACE:number = 3;
    static PLAYER:number = 4;
}

class gameMain{
    private _players:Array<player>;
    private _uid:number;
    private _session:number;
    private _self:player;
    private _bg;

    private _can_move_x:Array<number>;
    private _can_move_y:Array<number>;
    private _stricks;

    constructor(){
        this._stricks = {};
        this._players = new Array<player>();
        server.on("user.JoinRep", this, this.handleJoinRep);
        server.on("game.GameMessageNtf", this, this.handleGameMessageNtf);
        server.on("game.QuitGameRep", this, this.handleQuitGameRep);
        server.on("game.SetSession", this, this.handleSetSession);
        server.on("game.MapNtf", this, this.handleMapNtf);
        server.on("game.OperateRep", this, this.handleOperate);
        server.on("game.OperateNtf", this, this.handleOperateNtf);
        server.on("game.GameEndNtf", this, this.handleGameEndNtf);

        this._can_move_x = new Array<number>();
        this._can_move_y = new Array<number>();

        this._can_move_x[0] = 164;
        this._can_move_y[0] = 83;

        for(let i = 1; i < 5; ++i){
            this._can_move_x[i] = this._can_move_x[i-1] + 41;
            this._can_move_y[i] = this._can_move_y[i-1] + 41;
        }
        for(let i = 5; i < 7; ++i){
            this._can_move_y[i] = this._can_move_y[i-1] + 41;
        }
    }

    private handleGameEndNtf(msg:any){

    }

    private handleOperateNtf(msg:any){

    }

    private handleOperate(msg:any){

    }

    private calc_pos_xy(index:number){
        let x = index%15 - 2;
        let y = Math.floor(index/15) - 1;
        return [164 + x*21, 83 + y*20.5];
    }

    private createOtherPlayer(uid, x, y, index){

    }

    private calc_pos_index(x:number,y:number):number{
        let yy = ((y - 83 )/20.5 + 1 ) * 15;
        let xx = ( x - 164 )/21 + 2 + ( Math.floor(yy/15) - 1) * 15;
        return Math.round(xx + 15);
    }

    private send_pos(x?:number, y?:number, pos_index?:number){
        // if(server){
        //     x = x ? x : this._self.x;
        //     y = y ? y : this._self.y;
        //     pos_index = pos_index ? pos_index : this.calc_pos_index(x, y);
        //     server.sendData("game.SelfMessageNtf",{session : this._session, pos : [x,y,pos_index]});
        // } else {

        // }
    }

    private can_move(posx, posy, opt):boolean{
        if(opt == Define.DOWN || opt == Define.UP){
            if(opt == Define.DOWN){
                if(posy + 1 > this._can_move_y[this._can_move_y.length - 1]){
                    console.log(1);
                    return false
                }
                if( this._stricks[this.calc_pos_index(posx, posy + 1)]){
                    console.log(2);
                    return false;
                }

            } else {
                if(posy - 1 < this._can_move_y[0]){
                    console.log(3);
                    return false
                }
                if( this._stricks[this.calc_pos_index(posx, posy - 1)]){
                    console.log(4);
                    return false;
                }
            }

            for(let i in this._can_move_x){
                if(posx > this._can_move_x[i] - 2 && posx < this._can_move_x[i] + 2){
                    console.log(5);
                    return true;
                }
            }
        } else {
            if(opt == Define.LEFT){
                if(posx - 1 < this._can_move_x[0]){
                    console.log(6);
                    return false
                }
                if( this._stricks[this.calc_pos_index(posx - 1, posy)]){
                    console.log(7);
                    return false;
                }
            } else {
                if(posx + 1 > this._can_move_x[ this._can_move_x.length - 1]){
                    console.log(8);
                    return false
                }
                if( this._stricks[this.calc_pos_index(posx + 1, posy)]){
                    console.log(8);
                    return false;
                }
            }
            for(let i in this._can_move_y){
                if(posy > this._can_move_y[i] - 2 && posy < this._can_move_y[i] + 2){
                    console.log(9);
                    return true;
                }
            }
        }
        console.log(10);
        return false;
    }

    private moveDown(){
        if(this.can_move(this._self.x, this._self.y, Define.DOWN)){
            this._self.y += 1;
            this.send_pos();
        }
    }

    private moveUp(){
        if(this.can_move(this._self.x, this._self.y, Define.UP)){
            this._self.y -= 1;
            this.send_pos();
        }
    }

    private moveLeft(){
        if(this.can_move(this._self.x, this._self.x, Define.LEFT)){
            this._self.x -= 1;
            this.send_pos();
        }
    }
    private moveRight(){
        if(this.can_move(this._self.x, this._self.x, Define.RIGHT)){
            this._self.x += 1;
            this.send_pos();
        }
    }

    private handleMove(opt){
        let frameStep = 5;
         switch (opt){
            case Define.DOWN:
                 this._bg.bt_down.on(Laya.Event.MOUSE_UP, this, ()=>{
                        Laya.timer.clear(this, this.moveDown);
                    });
                Laya.timer.frameLoop(frameStep, this, this.moveDown);
                break;
            case Define.UP:
                this._bg.bt_up.on(Laya.Event.MOUSE_UP, this, ()=>{
                        Laya.timer.clear(this, this.moveUp);
                    });
                Laya.timer.frameLoop(frameStep, this, this.moveUp);
                break;
            case Define.LEFT:
                this._bg.bt_left.on(Laya.Event.MOUSE_UP, this, ()=>{
                        Laya.timer.clear(this, this.moveLeft);
                    });
                Laya.timer.frameLoop(frameStep, this, this.moveLeft);
                break;
            case Define.RIGHT:
                this._bg.bt_right.on(Laya.Event.MOUSE_UP, this, ()=>{
                        Laya.timer.clear(this, this.moveRight);
                    });
                Laya.timer.frameLoop(frameStep, this, this.moveRight);
                break;
            default:
                break;
        }   
    }

    private initStageBlock(){
        let bg = this._bg;
        let start = bg.getChildIndex(bg.getChildByName("stone1"));
        for(let i = 165; i >0; --i){
            let stoneName = "stone" + i;
            let stone = bg.getChildByName(stoneName);
            if(stone){
                bg.setChildIndex(stone, start);
            }
        }
    }

    private handleMapNtf(msg:any){
        console.log("here");

        this._bg = new gameBg(this);
        Laya.stage.addChild(this._bg);
        this.initStageBlock();

        this._self = new player();
        let self = this._self;
        let bg:gameBg = this._bg;
        self.loadImage("comp/boy_front.png");
        bg.addChild(self);

        let height = bg.m_stone1.height;
        let width = bg.m_stone1.width;

        let re:Laya.Rectangle = self.getBounds();
        self.scaleX =  width / re.width;
        self.scaleY =  height / re.height;

        bg.m_score1.text = "0";

        bg.bt_down.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.DOWN]);
        bg.bt_up.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.UP]);
        bg.bt_left.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.LEFT]);
        bg.bt_right.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.RIGHT]);

        let startIndex:number = 0;
        for(let i = 0; i < msg.wall.length; ++i){
            let index = i + 1;
            let type = msg.wall[i];

            let stoneName = "stone" + index;
            let stone = bg.getChildByName(stoneName);
            if((index-1)%15 ==0 && stone){
                startIndex = bg.getChildIndex( stone );
            }

            if(type == Define.STRICK){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/brick.png");
                bg.addChild(sp);

                let height = bg.m_stone1.height;
                let width = bg.m_stone1.width;
                sp.height = height;
                sp.width = width;
                let x = bg.m_stone1.x;
                let y = bg.m_stone1.y;
                let re:Laya.Rectangle = sp.getBounds();
                sp.scaleX =  width / re.width;
                sp.scaleY =  height / re.height;

                let xi = 164 +  (index%15 - 2) * 21;
                let yi = 93 + (Math.floor(index/15) - 1) * 20.5;
                sp.pos(xi, yi);
                this._stricks[index] = true;

                let last = bg.getChildAt( bg.numChildren - 1 );
                bg.setChildIndex(last, startIndex);
            }
        }

        for(let i = 0; i < msg.pos.length; i = i + 4){
            let uid = msg.pos[i];
            let x = msg.pos[i+1];
            let y = msg.pos[i+2];
            let index = msg.pos[i+3];

            if(uid == this._uid){
                if(x > 0 && y > 0){
                    self.pos(x, y);
                } else {
                    let pos = this.calc_pos_xy(index);
                    self.pos(pos[0], pos[1]);
                }
            } else {
                this.createOtherPlayer(uid, x, y, index);
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
        if( ! this._bg){
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }
    }

    private handleQuitGameRep(msg:any){

    }

    public destroy(){
        server.sendData("game.QuitGameReq", {session:this._session, uid:this._uid});
        for(let p of this._players){
            p.removeSelf();
            p.destroy();
        }
        this._self.removeSelf();
        this._self.destroy();
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