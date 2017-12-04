
class Sound{
    private _playingBG : boolean;
    private _soundImage : Laya.Sprite;
    private _soundImageType : number;
    private _soundImageX:number;
    private _soundImageY:number;

    constructor(){
        this._soundImageX = 0;
        this._soundImageY = 0;
        this._playingBG = false;
    }

    public initSound(x?:number, y?:number, s?:boolean){
        x = x ? x : this._soundImageX;
        y = y ? y : this._soundImageY;
        this._soundImageX = x;
        this._soundImageY = y;
        this.destroyImage();

        this._soundImage = new Laya.Sprite();
        this._soundImage.pos(x, y);

        if(s){
            this._soundImage.loadImage("comp/sound_open.png");
        } else {
            this._soundImage.loadImage("comp/sound_close.png");
        }
        //this._soundImage.scale(0.5,0.5);
        Laya.stage.addChild(this._soundImage);
        this._soundImage.once(Laya.Event.CLICK, this, this.switchMusic);
    }

    private destroyImage(){
        if(this._soundImage){
            this._soundImage.removeSelf();
            this._soundImage.destroy();
            this._soundImage = undefined;
        }
    }

    private chaneSoundImage(open:boolean){
        if(open){
            this.initSound(this._soundImageX, this._soundImageY, true);
        } else {
            this.initSound(this._soundImageX, this._soundImageY, false);
        }
    }

    public switchMusic():boolean{
        if( this._playingBG){
            this.StopPlayBgMusic();
            this.chaneSoundImage(false);
        } else {
            this.PlayBgMusic();
            this.chaneSoundImage(true);
        }
        return this._playingBG;
    }

    public PlayBgMusic(){
        if(this._playingBG){
            return;
        }

        this._playingBG = true;
        Laya.SoundManager.playMusic("comp/bomb.mp3", 0);
    }

    public StopPlayBgMusic(){
        if(this._playingBG){
            this._playingBG = false;
            Laya.SoundManager.stopMusic();
            //this._chanle = Laya.SoundManager.playSound("comp/bomb.mp3", 0);
        }
    }

    public PlayBombing(){
        Laya.SoundManager.playSound("comp/bombing.mp3", 1);
    }
}

let sound = new Sound();