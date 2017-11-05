// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, laya.webgl.WebGL);
        this.initStage();
        this.loadResource();
    }
    GameMain.prototype.initStage = function () {
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
    };
    GameMain.prototype.loadResource = function () {
        var uiResArry = [
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, function () {
            //this._gameMain.main();
            Laya.stage.addChild(new loginView());
        }));
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map