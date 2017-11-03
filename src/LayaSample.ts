// 程序入口
let server = new Server();
class GameMain{
    constructor()
    {
        Laya.init(100,100);
        server.on("user.UserInfoRequest", this, (msg)=>{
            console.log(" main recieve " + msg);
        });

        server.test();
    }
}
new GameMain();