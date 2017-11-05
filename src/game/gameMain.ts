
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
    }

    private GameMessageNtf(msg:any){
        if( ! this._bg){
            this._bg = new gameBg(this);
            Laya.stage.addChild(this._bg);
        }

        function rand(low: number, up: number) {
            return Math.floor(Math.random() * (up - low + 1) + low);
        }

        this._self = new player();
        Laya.stage.addChild(this._self);
        this._self.graphics.drawCircle(rand(0,600), rand(0,400), 20, "#FF0000");

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

    public main(){
        this.initSelf();
    }
}