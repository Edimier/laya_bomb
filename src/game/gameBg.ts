
class gameBg extends ui.gamebgUI{
    private _father:gameMain;
    constructor(f:gameMain){
        super();
        this._father = f;
        this.bt_close.on(Laya.Event.CLICK, this, this.handleClose);
    }

    private handleClose(){
        server.logout();
        Laya.stage.addChild(new loginView());
        if(this._father){
            this._father.destroy();
        }
        this.removeSelf();
        this.destroy();
    }
}