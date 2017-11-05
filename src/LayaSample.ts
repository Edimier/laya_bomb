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
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
    }

    private loadResource(){
        let uiResArry = [
            {url : "res/atlas/comp.atlas", type : Laya.Loader.ATLAS},
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, ()=>{
            Laya.stage.addChild(new loginView() );
        }));
    }
}
new GameMain();