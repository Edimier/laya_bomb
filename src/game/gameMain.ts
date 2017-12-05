class gameMain{
    private _players:Array<player>;
    //private _playersOtherCnt:number;
    private _uid:number;
    private _session:number;
    private _self:player;
    private _bg:gameBg;

    private _map;
    private _height : number;
    private _width : number;
    private _startx : number;
    private _starty : number;
    private _stricks;
    
    private _nickname : string;
    private _die : boolean;
    private _rank : number;
    private _row : number;
    private _val : number;
    private _val2 : number;

    private _timer : Laya.Timer;

    constructor(){
        this._startx = 250;
        this._starty = 100;
        this._stricks = {};
        this._val = 8;
        this._val2 = 16;
        this._die = false;

        this._timer = new Laya.Timer();

        this._players = new Array<player>();
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

    private handleNotifyKickout(msg:any){
        if(msg.reason == 1){
            Laya.stage.addChild(new promptView("您的账号已经在别处登陆！"));
        }
    }

    private handleLeaveTable(msg:any){
        if(msg){
            
            for(let i = 0; i < this._players.length; ++i){
                let p = this._players[i];
                if(p && p._uid == msg.uid){
             
                    p.removeSelf();
                    p.destroy();
                    this._players[i] = undefined;

                    console.log(this._bg.imge_head_other.numChildren);
                    this._bg.imge_head_other.removeChildAt(this._bg.imge_head_other.numChildren - 1);
                    let sp:Laya.Sprite = new Laya.Sprite();
                    sp.loadImage("comp/waitting.png");
                    this._bg.imge_head_other.addChild(sp);
                }
            }
            
        }
    }

    private handleGameEndNtf(msg:any){
        this.showGameOver();
        console.log("游戏结束！");
        this._timer.once(3000, this, this.closeBack);
    }

    private destroyBlock(blocks, index){
        if(blocks && blocks[index]){
            blocks[index].removeSelf();
            blocks[index].destroy();
            blocks[index] = undefined;
            this._map[index] = 3;

            let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
            let bombing = new ui.bombingUI();
            bombing.pos(pos[0], pos[1]);
            let node = Laya.stage.addChild(bombing);
            bombing.ani_bombing.play(0, false);
            Laya.timer.once(1500, this, ()=>{ Laya.stage.removeChild(node);});
        }
    }

    private changeToGray(p:player) : Laya.ColorFilter{
        let colorMatrix:any = 
        [
            0.3086, 0.6094, 0.0820, 0, 0,  //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0,  //B
            0, 0, 0, 1, 0, //A
        ];
        //创建灰色颜色滤镜
        let GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
        //添加灰色颜色滤镜效果
        p.filters = [GrayFilter];
        return GrayFilter;
    }

    private playBombSound(){
        Laya.SoundManager.playSound("comp/bombing.mp3", 1);
    }

    private showGameOver(){
        let gameOver = new Laya.Sprite();
        gameOver.loadImage("comp/game_over.png");
        Laya.stage.addChild(gameOver);
    }

    private handleOperateNtf(msg:any){
        if(msg){
            if (msg.result == 2){
                for(let i = 0; i < msg.opt.length; i = i + 3){
                    let uid = msg.opt[i];
                    let index = msg.opt[i + 1];

                    let bomb:Laya.Animation = new Laya.Animation();
                    bomb.loadAnimation("scale_bomb.ani");
                    this._bg.addChild(bomb);
                    let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                    bomb.pos(pos[0], pos[1] - this._val);
                    bomb.play();

                    this._bg.setChildIndex(this._bg.getChildAt( this._bg.numChildren - 1), this._bg.numChildren - 4);

                    if (uid == this._uid){
                        this._self._blocks[index] = bomb;
                    } else {
                        for(let p of this._players){
                            if(p && p._uid == uid){
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
                    this.playBombSound();
                    for(let i = 1; i < msg.opt.length; ++i){
                        this.destroyBlock(this._stricks, msg.opt[i]);
                    }
                    if(msg.score && msg.score > 0){
                        let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                        let coin = new Laya.Sprite();
                        coin.loadImage("comp/coin.png");
                        coin.pos(pos[0], pos[1]);
                        coin.scale(0.1, 0.1);
                        let node = Laya.stage.addChild(coin);
                        let tox = this._bg.m_score1.x;
                        let toy = this._bg.m_score1.y;
                        Laya.Tween.to(coin, { x:tox, y : toy }, 3000, Laya.Ease.elasticInOut, null, 0);
                        Laya.timer.once(2300, this, ()=>{ 
                            Laya.stage.removeChild(node);
                            this._bg.m_score1.text = msg.score.toString();
                        });
                    }
                } else {
                    for(let p of this._players){
                        if(p && p._uid == msg.uid){
                            this.destroyBlock(p._blocks, index);
                            this.playBombSound();
                            for(let i = 1; i < msg.opt.length; ++i){
                                this.destroyBlock(this._stricks, msg.opt[i]);
                            }
                            if(msg.score && msg.score > 0){
                                this._bg.m_score2.text = msg.score.toString();
                            }
                        }
                    }
                }
            } else if (msg.result == 4){
                for( let uid of msg.opt){
                    if ( uid == this._uid){
                        this._die = true;
                        let filter = this.changeToGray(this._self);
                        this._bg.imge_head_self.filters = [filter];
                        // let node = this._self.getChildAt(this._self.numChildren - 1) as Laya.Text;
                        // if(node){
                        //     node.text = "DIE";
                        //     node.color = "#ff0000";
                        //     this.showGameOver();
                        // }

                        this._bg.imge_head_self.loadImage("comp/die.png");
                    } else {
                        for(let p of this._players){
                            if(p && p._uid == uid){
                                p._die = true;
                                let filter = this.changeToGray(p);
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
    }

    private calc_pos_xy(i:number, width?:number, height?:number, basex?:number, basey?:number){
        let x = i % this._rank;
        let y = Math.floor(i/this._rank);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        return [basex + x * width, basey + y * height];
    }

    private createOtherPlayer(uid, index, nickname, seatid):boolean{
        let other = new player();
        other.initPlayer("carton" + seatid);
        let sp : Laya.Sprite = new Laya.Sprite();
        sp.loadImage("carton" + seatid + "/head.png");
        this._bg.imge_head_other.addChild(sp);
        other.interval = 50;
        other._uid = uid;
        other._nickname = nickname;
        //other.loadImage("comp/front.png");
        //this._bg.addChild(other);

        other.play(0, false, "stand");

        this._bg.m_lable2.text = nickname;

        let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
        other.pos(pos[0], pos[1] - this._val );
        this._players.push(other);
        return true;
    }

    private calc_pos_index(x:number, y:number):number{
        let yy = Math.floor( (y - this._starty )/(this._height - this._val) )* this._rank;
        let xx = ( x - this._startx )/this._width;
        let ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    }

    private send_pos(pos_index?:number){
        if(server){
            pos_index = pos_index ? pos_index : this.calc_pos_index(this._self.x, this._self.y + this._val2);
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
        if(this.can_move(this._self.x, this._self.y + this._val2 + this._height - this._val, Define.DOWN)){
            this._self.play(0, false, "front");
            this._self.y += this._height - this._val;
            this.send_pos();
        }
    }

    private moveUp(){
        if(this.can_move(this._self.x, this._self.y  + this._val2 - this._height + 10, Define.UP)){
            this._self.play(0, false, "behind");
            this._self.y -= this._height - this._val;
            this.send_pos();
            
        }
    }

    private moveLeft(){
        if(this.can_move(this._self.x - this._width, this._self.y + this._val2, Define.LEFT)){
            this._self.play(0, false, "left");
            this._self.x -= this._width;
            this.send_pos();
            
        }
    }
    private moveRight(){
        if(this.can_move(this._self.x + this._width, this._self.y + this._val2, Define.RIGHT)){
            this._self.play(0, false, "right");
            this._self.x += this._width;
            this.send_pos();
        }
    }

    private handleMove(opt){
        if( this._die ){
            return;
        }
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

    // 投放炸弹
    private handleBomb(){
        if( this._die ){
            return;
        }
        let index = this.calc_pos_index(this._self.x, this._self.y + this._val2);
        
        //console.log("handleBomb")
        server.sendData("game.OperateReq", {session:this._session, optn:2, opt:[this._uid, index + 1, 1]});
    }

    private handleKeyDown(e: Laya.Event){
        //console.log(e.keyCode);
        if(e.keyCode==37){//左
            this.handleMove(Define.LEFT);
       }else if(e.keyCode==39){//右
           this.handleMove(Define.RIGHT);
       }else if(e.keyCode==38){//上
           this.handleMove(Define.UP);
       }else if(e.keyCode==40){//下
           this.handleMove(Define.DOWN);
       }else if(e.keyCode == 65){
           //console.log(11111)
           this.handleBomb();
       }
    }

    private initButton(){
        let bg:gameBg = this._bg;
        bg.m_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.m_up.on(Laya.Event.CLICK, this, this.handleMove,[Define.UP]);
        bg.m_left.on(Laya.Event.CLICK, this, this.handleMove,[Define.LEFT]);
        bg.m_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);

        Laya.stage.on(Laya.Event.KEY_UP, this, this.handleKeyDown);
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

    private handleEnterTable(msg:any){
        if(msg.uid == this._uid){
            this._bg = new gameBg();
            this._self = new player();
            let self = this._self;
            self.initPlayer("carton" + msg.seatid);
            this._bg.imge_head_self.loadImage("carton" + msg.seatid + "/head.png");
            
            self.interval = 50;
            self.scaleY = 0.85;
            this._bg.bt_close.on(Laya.Event.CLICK, this, this.closeBack);
            Laya.stage.addChild(this._bg);

        } else {
            this.createOtherPlayer(msg.uid, msg.index, msg.nickname, msg.seatid);
        }
    }

    private handleMapNtf(msg:any){
        this._map = msg.wall;
        
        this._rank = msg.rank;
        this._row = msg.row;

        this.initButton();

        sound.initSound(1040, 120, true);
        sound.PlayBgMusic();

        let bg:gameBg = this._bg;

        bg.m_lable1.align = "center";
        bg.m_lable1.fontSize = 18;
        bg.m_lable1.bold = true;

        bg.m_lable2.align = "center";
        bg.m_lable2.fontSize = 10;

        for(let i = 0; i < msg.wall.length; ++i){
            let type = msg.wall[i];
            let x = i % this._rank;
            let y = Math.floor(i/this._rank);

            if(type == Define.STRICK){
                if(i % 2 == 0){
                    let sp2 = new Laya.Sprite();
                    bg.addChild(sp2);
                    sp2.loadImage("comp/shadow.png");
                    sp2.scale(0.5,0.5);
                    let height2 = 30;  //sp.height - 10;
                    let width2 = 28; //sp.width;
                    sp2.pos(this._startx + x * width2 - 1, this._starty + y * height2 + 6);
                }

                let sp = new Laya.Sprite();
                bg.addChild(sp);
                
                sp.loadImage("comp/strick.png");
                sp.scale(0.1,0.1);
                let height = 30;  //sp.height - 10;
                let width = 28; //sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
                this._stricks[i] = sp;
            } else if(type == Define.STONE){
                let sp = new Laya.Sprite();
                bg.addChild(sp);
                sp.loadImage("comp/stone2.png");
                sp.scale(0.1,0.1);
              
                let height = 30;  //sp.height - 10;
                let width = 28; //sp.width;
                this._height = 38; //sp.height;
                this._width = 28; //sp.width;

                sp.pos(this._startx + x * width, this._starty + y * height);
            } else if(type == Define.EMPTYPLACE && i % 2 == 0){
                let sp = new Laya.Sprite();
                bg.addChild(sp);
                
                sp.loadImage("comp/shadow.png");
                sp.scale(0.5,0.5);
                let height = 30;  //sp.height - 10;
                let width = 28; //sp.width;
                this._height = 38; //sp.height;
                this._width = 28; //sp.width;

                sp.pos(this._startx + x * width - 1, this._starty + y * height + 6);
            }
        }

        for(let name of ["up", "down", "left", "right", "bomb"]){
            let node = bg.getChildByName(name);
            if(node){
                bg.setChildIndex( node, bg.numChildren - 1 );
            }
        }

        let self = this._self;

        let createOtherSuccess:boolean;
        for(let p of msg.pos){
            let uid = p.uid;
            let index = p.index
            let nickname = p.nickname;

            if(uid == this._uid){
                bg.addChild(self);
                self.play(0, true, "stand");
                let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                self.pos(pos[0], pos[1] - this._val);
                bg.m_lable1.text = nickname;

            }
        }

        for(let p of this._players){
            if(p && p._uid != this._uid){
                bg.addChild(p);
                createOtherSuccess = true;
            }
        }

        if( ! createOtherSuccess){
            if(bg.imge_head_other.numChildren > 0){
                bg.imge_head_other.removeChildAt(this._bg.imge_head_other.numChildren - 1);
            }
            let sp:Laya.Sprite = new Laya.Sprite();
            sp.loadImage("comp/waitting.png");
            bg.imge_head_other.addChild(sp);
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

    private handleCartonEff(p:player, tox:number, toy : number){
        let x = p.x;
        let y = p.y;
        if(x < tox){
            p.play(0, false, "right");
        } else if(x > tox){
            p.play(0, false, "left");
        } else if(y > toy){
            p.play(0, false, "behind");
        } else if( y < toy){
            p.play(0, false, "front");
        }
        p.pos(tox, toy);
    }

    private handleGameMessageNtf(msg:any){
        for(let i = 0; i < msg.pmsg.length; i = i + 2){
            let uid = msg.pmsg[i];
            let index = msg.pmsg[i + 1];

            for(let p of this._players){
                if(p && p._uid == uid){
                    let pos = this.calc_pos_xy(index, this._width, this._height - this._val);
                    this.handleCartonEff(p, pos[0], pos[1] - this._val);
                }
            }
        }
    }

    private handleQuitGameRep(msg:any){

    }

    public closeBack(){
        if(server){
            server.sendData("game.QuitGameReq", {session:this._session, roomid:1000, status:0});
            server.logout();
        }

        sound.StopPlayBgMusic();

        for(let p of this._players){
            if(p){
                p.removeSelf();
                p.destroy();
            }
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

    public mainProcess(msg:any){
        this._uid = msg.uid;
        this._nickname = msg.nickname
        server.sendData("user.JoinReq", {uid:this._uid, roomid:1000});
    }
}