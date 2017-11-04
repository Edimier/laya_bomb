// 程序入口
let server = new Server();
class GameMain{
    constructor()
    {
        Laya.init(100,100);

        server.test();

        server.on("user.UserInfoResonpse", this, this.handle);
    }

    private handle(data:any){
        console.log("uid : " + data.uid);
        console.log("nickname : " + data.nickname);
    }
}
new GameMain();