class gameBg extends ui.gamebgUI{
    private _players:Array<player>;
    private _uid:number;
    private _session:number;
    private _self:player;
    //private _node:laya.display.Node;

    constructor(){
        super();
        this._players = new Array<player>();
        this.bt_close.on(Laya.Event.CLICK, this, this.handleClose);

        this.initSelf();

        server.on("game.GameMessageNtf", this, this.GameMessageNtf);
        server.on("game.QuitGameRep", this, this.QuitGameRep);
    }

    private handleClose(){
        server.sendData("game.QuitGameReq", {session:this._session, uid:this._uid});
        Laya.stage.addChild(new loginView());

        this._self.removeSelf();
        this._self.destroy();

        this.removeSelf();
        this.destroy();
    }

    private GameMessageNtf(msg:any){

    }

    private QuitGameRep(msg:any){

    }

    private initSelf(){
        function rand(low: number, up: number) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }

        this._self = new player();
        //this._self.graphics.drawCircle(rand(0,600), rand(0,400), 20, "#FF0000");
        this._self.graphics.drawCircle(30, 30, 20, "#FF0000");
        Laya.stage.addChild(this._self);
    }
}