
class player extends Laya.Animation{
    public _uid:number;
    public _nickname:string;
    public _blocks;
    public _die : boolean;

    private _aniType : string;

    constructor(){
        super();
        this._blocks = {};
        this._die = false;
    }

    public initPlayer(aniType:string){
        this._aniType = aniType;
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "stand",1, 1),"stand");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "left",1, 4),"left");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "right",1, 4),"right");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "front",1, 4),"front");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "behind",1, 4),"behind");
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