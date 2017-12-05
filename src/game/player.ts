
class player extends Laya.Animation{
    public _uid:number;
    public _nickname:string;
    public _blocks;
    private _blocksCnt:number;
    private _blockLimit:number;

    public _die : boolean;

    private _aniType : string;

    public _score : number;

    constructor(){
        super();
        this._blocksCnt = 0;
        this._blockLimit = 3;
        this._score = 0;
        this._blocks = {};
        this._die = false;
    }

    public incBlock() : boolean{
        if(this._blocksCnt + 1 > this._blockLimit){
            return false;
        } else {
            this._blocksCnt += 1;
            return true;
        }
    }

    public tryIncBlock() : boolean{
        if(this._blocksCnt + 1 > this._blockLimit){
            return false;
        } else {
            return true;
        }
    }

    public descBlock(){
        if(this._blocksCnt > 0){
            this._blocksCnt -= 1;
        }
    }

    public initPlayer(aniType:string){
        this._aniType = aniType;
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "stand",1, 1),this._aniType + "stand");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "left",1, 4),this._aniType + "left");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "right",1, 4),this._aniType + "right");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "front",1, 4),this._aniType + "front");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "behind",1, 4),this._aniType + "behind");
    }

    public Play(start?:any, loop?: boolean, name?: string, showWarn?: boolean){
        this.play(start, loop, this._aniType + name, showWarn);
    }

    private aniUrls(aniType:string, aniName:string, start:number, end:number){
        let urls:any = [];
        for(var i:number = start;i <= end; ++i){
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(aniType + "/" + aniName + i + ".png");
        }
        return urls;
    }
}