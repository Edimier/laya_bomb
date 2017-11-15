class loginView extends ui.loginUI{
    constructor(){
        super();
        this.pos( (Laya.stage.width-600)/2, (Laya.stage.height-400)/2);
        this.bt_login.on(Laya.Event.CLICK, this, this.handleLogin);
        server.on("LOGIN_SUCCESS", this, this.loginSuccess);
        server.on("LOGIN_FAILED", this, this.loginFailed);
        //server.on("CONNECT_CLOSE", this, this.connectClose);
        server.on("CONNECT_ERROR", this, this.connectClose);
    }

    private handleLogin(){
        server.connect();
        this.bt_login.disabled = true;
    }

    private destroySelf(){
        this.removeSelf();
        this.destroy();
    }

    private loginSuccess(uid:any){
        let game_main = new gameMain();
        game_main.mainProcess(uid);
        this.destroySelf();
    }

    private loginFailed(){
        Laya.stage.addChild(new  promptView("登陆失败！"));
        this.bt_login.disabled = false;
    }

    private connectClose(){
        Laya.stage.addChild(new promptView("连接已经断开，请重新登陆！"));
        this.bt_login.disabled = false;
    }
}