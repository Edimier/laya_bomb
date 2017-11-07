
class gameMain{
    private _players:Array<player>;
    private _uid:number;
    private _session:number;
    private _self:player;
    private _bg;

    constructor(){
        this._players = new Array<player>();

        server.on("game.GameMessageNtf", this, this.GameMessageNtf);
        server.on("game.QuitGameRep", this, this.QuitGameRep);
        server.on("game.SetSession", this, this.SetSession);
        server.on("user.JoinRep", this, this.JoinRep);
    }
    
    private SetSession(msg:any){
        if(msg && msg.session){
            this._session = Number(msg.session);
        } else {
            console.log("Not have session");
        }
    }

    private GameMessageNtf(msg:any){
        if( ! this._bg){
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }

        function rand(low: number, up: number) {
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

        console.log(msg.pmsg.length);

        for(let i = 0; i < msg.pmsg.length; i = i + 3){
            console.log(msg.pmsg[ i ]);
            console.log(msg.pmsg[i + 1]);
            console.log(msg.pmsg[i + 2]);
            console.log(this._uid);
            console.log(typeof this._uid);
            console.log(typeof msg.pmsg[ i ]);
            if( msg.pmsg[i] != this._uid){
                let find:boolean = false;
                for(let p of this._players){
                    if(p._uid == msg.pmsg[i]) {
                        if(p.x != msg.pmsg[i+1] && p.y != msg.pmsg[i+2]){
                            p.pos(msg.pmsg[i+1], msg.pmsg[i+2]);
                        }
                        find = true;
                        break;
                    }
                }
                if( ! find){
                    let p = new player();
                    Laya.stage.addChild(p);
                    //p.graphics.drawCircle(msg.pmsg[i+1], msg.pmsg[i+2], 20, "#FF0000");

                    let res = "comp/a" + rand(1,4) + ".png";

                    p.loadImage(res);
                    
                    p.pos(msg.pmsg[i+1], msg.pmsg[i+2]);

                    p._uid = msg.pmsg[i];

                    this._players.push(p);
                }
            } else {
                if( ! this._self){
                    this._self = new player();
                    Laya.stage.addChild(this._self);
                    let res = "comp/a" + rand(1,4) + ".png";
                    this._self.loadImage(res);
                    this._self.pos(msg.pmsg[i+1], msg.pmsg[i+2]);
                    this._self.on(Laya.Event.MOUSE_DOWN, this, ()=>{
                        this._self.startDrag();
                        server.sendData("game.SelfMessageNtf", {session:this._session, uid:this._uid, pos:[Laya.stage.mouseX, Laya.stage.mouseY]});
                    });
                    //this._self.graphics.drawCircle(msg.pmsg[i+1], msg.pmsg[i+2], 20, "#FF0000");
                }
            }
        }
    }

    private QuitGameRep(msg:any){

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

    private initSelf(){
        this._bg = new gameBg(this);
        Laya.stage.addChild(this._bg);

        function rand(low: number, up: number) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }

        this._self = new player();
        Laya.stage.addChild(this._self);
        this._self.graphics.drawCircle(rand(0,600), rand(0,400), 20, "#FF0000");

        server.sendData("user.JoinReq", {uid:this._uid});
    }

    private JoinRep(msg:any){
        if(msg.result != 0){
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    }

    public main(uid:number){
        this._uid = uid;

//         required int32 uid = 1;
//         required int32 clientid = 2;
//         required int32 result = 3;
//         required int32 roomid = 4;
// }

        server.sendData("user.JoinReq", {uid:this._uid, roomid:1000});

        //this.initSelf();
    }
}