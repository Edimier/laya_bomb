
class Sound{
    private _playingBG : boolean;
    
    constructor(){
        this._playingBG = false;
    }

    public switchMusic():boolean{
        if( this._playingBG){
            this.StopPlayBgMusic();
        } else {
            this.PlayBgMusic();
        }
        return this._playingBG;
    }

    public PlayBgMusic(){
        if(this._playingBG){
            return;
        }

        this._playingBG = true;
        //Laya.SoundManager.playSound("comp/bomb.mp3", 0);
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