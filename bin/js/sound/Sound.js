var Sound = /** @class */ (function () {
    function Sound() {
        this._soundImageX = 0;
        this._soundImageY = 0;
        this._playingBG = false;
    }
    Sound.prototype.initSound = function (x, y, s) {
        x = x ? x : this._soundImageX;
        y = y ? y : this._soundImageY;
        this._soundImageX = x;
        this._soundImageY = y;
        this.destroyImage();
        this._soundImage = new Laya.Sprite();
        this._soundImage.pos(x, y);
        if (s) {
            this._soundImage.loadImage("comp/sound_open.png");
        }
        else {
            this._soundImage.loadImage("comp/sound_close.png");
        }
        //this._soundImage.scale(0.5,0.5);
        Laya.stage.addChild(this._soundImage);
        this._soundImage.once(Laya.Event.CLICK, this, this.switchMusic);
    };
    Sound.prototype.destroyImage = function () {
        if (this._soundImage) {
            this._soundImage.removeSelf();
            this._soundImage.destroy();
            this._soundImage = undefined;
        }
    };
    Sound.prototype.chaneSoundImage = function (open) {
        if (open) {
            this.initSound(this._soundImageX, this._soundImageY, true);
        }
        else {
            this.initSound(this._soundImageX, this._soundImageY, false);
        }
    };
    Sound.prototype.switchMusic = function () {
        if (this._playingBG) {
            this.StopPlayBgMusic();
            this.chaneSoundImage(false);
        }
        else {
            this.PlayBgMusic();
            this.chaneSoundImage(true);
        }
        return this._playingBG;
    };
    Sound.prototype.PlayBgMusic = function () {
        if (this._playingBG) {
            return;
        }
        this._playingBG = true;
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