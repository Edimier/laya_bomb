// 程序入口

class GameMain{
    constructor()
    {
        Laya.init(600,400, laya.webgl.WebGL);
        this.initStage();
        this.loadResource();        
    }

    private initStage(){
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";
    }

    private loadResource(){
        let uiResArry = [
            {url : "res/atlas/comp.atlas", type : Laya.Loader.ATLAS},
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, ()=>{
            //this._gameMain.main();

            Laya.stage.addChild(new loginView());
        }));
    }
}
new GameMain();