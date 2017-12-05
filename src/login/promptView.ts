
class promptView extends ui.promptUI{
    constructor(msg?:string){
        super();

        this.pos( (Laya.stage.width - 1136) / 2, (Laya.stage.height - 640) / 2);
        this.bt_return.on(Laya.Event.CLICK, this, this.handleClose);

        if(msg){
            this.bt_prompt.text = msg;
            this.bt_prompt.fontSize = 15;
        }
    }
    private handleClose(){
        this.removeSelf();
        this.destroy();
    }
}