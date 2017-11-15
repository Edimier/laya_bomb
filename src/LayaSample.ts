// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(600,400, laya.webgl.WebGL);
        this.initStage();
        this.loadResource();
    }

    private initStage(){
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.bgColor = "#232628";
    }

    private loadResource(){
        let uiResArry = [
            {url : "res/atlas/comp.atlas", type : Laya.Loader.ATLAS},
            {url : "res/proto/user.proto"},
            {url : "res/proto/game.proto"},
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, ()=>{
            server = new Server();
            Laya.stage.addChild(new loginView());

        }));
    }
}
new GameMain();