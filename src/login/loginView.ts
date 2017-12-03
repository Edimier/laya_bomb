class loginView extends ui.loginUI{

    private _http:HTTPServer;

    private _success:boolean;

    private flag:boolean;

    constructor(){
        super();
        
        this._success = false;
        this._http = new HTTPServer();

        this.pos( (Laya.stage.width - 1136)/2, (Laya.stage.height - 640)/2);
        this.bt_login.on(Laya.Event.CLICK, this, this.handleLogin);
        server.on("LOGIN_SUCCESS", this, this.loginSuccess);
        //server.on("LOGIN_FAILED", this, this.loginFailed);
        server.on("CONNECT_ERROR", this, this.connectClose);
        
        this._http.on("HTTPCOMPLETE", this, this.httpLoginSuccess)
        this._http.on("HTTPERROR", this, this.httpLoginFailed)
        
    }


    private handleLogin(){
        this.bt_login.disabled = true;
        this._http.connect("http://47.96.161.239", "tmp=1");
        this.bt_login.disabled = true;
    }

    private destroySelf(){
        this.removeSelf();
        this.destroy();
    }

    private loginSuccess(msg:any){
        this.bt_login.disabled = true;

        if (this._success){
            return;
        }
        this._success = true;
        
        let game_main = new gameMain();
        game_main.mainProcess(msg);
        this.destroySelf();
    }

    private httpLoginSuccess(data:any){
        let msg = JSON.parse(data);
        if (msg.uid){
            this.bt_login.disabled = true;
            server.connect(Number(msg.uid), msg.nickname);
        } else {
            console.log("http get uid error!")
        }
    }

    private httpLoginFailed(){
        Laya.stage.addChild(new  promptView("登陆失败！"));
        this.bt_login.disabled = false;
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