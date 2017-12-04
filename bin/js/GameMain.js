// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(1136, 640, laya.webgl.WebGL);
        this.initStage();
        this.loadResource();
    }
    GameMain.prototype.initStage = function () {
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#232628";
    };
    GameMain.prototype.loadResource = function () {
        var uiResArry = [
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/bombing.atlas", type: Laya.Loader.ATLAS },
            { url: "res/proto/user.proto" },
            { url: "res/proto/game.proto" },
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, function () {
            server = new Server();
            Laya.stage.addChild(new loginView());
            // let coin = new Laya.Sprite();
            // coin.loadImage("comp/coin.png");
            // coin.scale(0.1, 0.1);
            // let node = Laya.stage.addChild(coin);
            // Laya.Tween.to(coin, { x:100, y : 100 }, 3000, Laya.Ease.elasticInOut, null, 0);
            // Laya.timer.once(3000, this, ()=>{ Laya.stage.removeChild(node)  });
        }));
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map