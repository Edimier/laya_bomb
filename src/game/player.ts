
class player extends Laya.Sprite{
    public _uid:number;
    public _nickname:string;
    public _blocks;
    public _die : boolean;

    constructor(){
        super();
        this._blocks = {};
        this._die = false;
    }
}