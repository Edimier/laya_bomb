//import Event = Laya.Event;
class E extends Laya.Event{
    
}
// 程序入口
class GameMain{
    constructor()
    {
        
        Laya.init(600,400);
        let img:Laya.Sprite = new Laya.Sprite();
        Laya.stage.addChild(img);
        img.on("click",this,()=>{});
    }
}
new GameMain();