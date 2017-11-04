// 程序入口
var server = new Server();
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(100, 100);
        server.test();
        server.on("user.UserInfoResonpse", this, this.handle);
    }
    GameMain.prototype.handle = function (data) {
        console.log("uid : " + data.uid);
        console.log("nickname : " + data.nickname);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map