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
        var _this = this;
        var uiResArry = [
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, function () {
            //this._gameMain.main();
            //Laya.stage.addChild(new loginView());
            _this.test();
        }));
    };
    GameMain.prototype.test = function () {
        var sp = new Laya.Sprite();
        sp.loadImage("comp/a2.png");
        Laya.stage.addChild(sp);
        sp.on(Laya.Event.MOUSE_DOWN, this, function () {
            console.log("x:" + Laya.stage.mouseX);
            console.log("y:" + Laya.stage.mouseY);
            sp.startDrag();
        });
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map