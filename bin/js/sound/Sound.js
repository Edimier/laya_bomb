var Sound = /** @class */ (function () {
    function Sound() {
        this._playingBG = false;
    }
    Sound.prototype.switchMusic = function () {
        if (this._playingBG) {
            this.StopPlayBgMusic();
        }
        else {
            this.PlayBgMusic();
        }
        return this._playingBG;
    };
    Sound.prototype.PlayBgMusic = function () {
        if (this._playingBG) {
            return;
        }
        this._playingBG = true;
        //Laya.SoundManager.playSound("comp/bomb.mp3", 0);
        Laya.SoundManager.playMusic("comp/bomb.mp3", 0);
    };
    Sound.prototype.StopPlayBgMusic = function () {
        if (this._playingBG) {
            this._playingBG = false;
            Laya.SoundManager.stopMusic();
            //this._chanle = Laya.SoundManager.playSound("comp/bomb.mp3", 0);
        }
    };
    Sound.prototype.PlayBombing = function () {
        Laya.SoundManager.playSound("comp/bombing.mp3", 1);
    };
    return Sound;
}());
var sound = new Sound();
//# sourceMappingURL=Sound.js.map