class loginView extends ui.loginUI{
    constructor(){
        super();
        if( ! server){
            server = new CServer();
        }
        this.pos( (Laya.stage.width-600)/2, (Laya.stage.height-400)/2);
        this.bt_login.on(Laya.Event.CLICK, this, this.handleLogin);
        server.on("LOGIN_SUCCESS", this, this.loginSuccess);
        server.on("LOGIN_FAILED", this, this.loginFailed);
        //server.on("CONNECT_CLOSE", this, this.connectClose);
        server.on("CONNECT_ERROR", this, this.connectClose);
    }

    private handleLogin(){
        let data = this.bt_input.text;
        if(data){
            let uid = Number(data);
            if(uid < 1 || uid > 100){
                Laya.stage.addChild(new  promptView("输入的 uid 不在1~100之间！！"));
            } else {
                server.connect(uid);
            }
        } else {
            Laya.stage.addChild(new  promptView("请输入uid"));
        }
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
    }

    private connectClose(){
        Laya.stage.addChild(new promptView("连接已经断开，请重新登陆！"));
    }
}