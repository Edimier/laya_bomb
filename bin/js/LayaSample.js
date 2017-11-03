// 程序入口
var server = new Server();
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(100, 100);
        server.on("user.UserInfoRequest", this, function (msg) {
            console.log(" main recieve " + msg);
        });
        server.test();
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map