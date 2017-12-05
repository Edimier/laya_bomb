var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var player = /** @class */ (function (_super) {
    __extends(player, _super);
    function player() {
        var _this = _super.call(this) || this;
        _this._blocks = {};
        _this._die = false;
        return _this;
    }
    player.prototype.initPlayer = function (aniType) {
        this._aniType = aniType;
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "stand", 1, 1), this._aniType + "stand");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "left", 1, 4), this._aniType + "left");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "right", 1, 4), this._aniType + "right");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "front", 1, 4), this._aniType + "front");
        Laya.Animation.createFrames(this.aniUrls(this._aniType, "behind", 1, 4), this._aniType + "behind");
    };
    player.prototype.Play = function (start, loop, name, showWarn) {
        this.play(start, loop, this._aniType + name, showWarn);
    };
    player.prototype.aniUrls = function (aniType, aniName, start, end) {
        var urls = [];
        for (var i = start; i <= end; ++i) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(aniType + "/" + aniName + i + ".png");
        }
        return urls;
    };
    return player;
}(Laya.Animation));
//# sourceMappingURL=player.js.map