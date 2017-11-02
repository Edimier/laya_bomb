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
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super.call(this) || this;
        _this.protoBuf = Laya.Browser.window.protobuf;
        _this.socket = new Laya.Socket();
        //this.protoBuf.load("../laya/proto/awesome.proto", this.protoLoadDone);
        _this._protoIDs = ProtoIDs.getMap();
        _this._protoBuilderMap = {
            user: _this.protoBuf.loadProto(Laya.loader.load("../laya/proto/awesome.proto")),
            game: _this.protoBuf.loadProto(Laya.loader.load("../laya/proto/awesome.proto")),
        };
        return _this;
    }
    Server.prototype.protoLoadDone = function (err, root) {
        this.root = root;
    };
    Server.prototype.connect = function (addr, port) {
        this.socket.connectByUrl(addr + ":" + port);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    };
    Server.prototype.onSocketOpen = function () {
    };
    Server.prototype.onSocketClose = function () {
    };
    Server.prototype.onMessageReveived = function (bytes) {
        var len = bytes.readUnsignedShort();
        var nameId = bytes.readUnsignedShort();
        switch (nameId) {
            case 0://登录成功
                console.log("登录成功");
                // this.onHeartTimer();
                // this._heartTimer.start();
                // this.dispatchEventWith(EventNames.USER_LOGIN_RESPONSE, false, { code: 0 });
                this.event("LOGIN_SUCCESS");
                break;
            case 1://登录失败
                console.log("登录失败");
                // if (this.showLogs) console.log('login failed.');
                // let errorId: number = parseInt(bytes.readUTFBytes(bytes.bytesAvailable));
                // this.dispatchEventWith(EventNames.USER_LOGIN_RESPONSE, false, { code: 1, errorId });
                this.event("LOGIN_FAILED");
                break;
            case 2://心跳包
                console.log("收到心跳");
                // if (this._heartTimeout) {
                // 	clearTimeout(this._heartTimeout);
                // 	this._heartTimeout = null;
                // }
                // this._lastHeart = this.tsLocal;
                // let tsServer: number = bytes.readInt();
                // this.tsServerOffset = this.tsLocal - tsServer;
                // //console.log('on server tsServer:' + this.tsServer);
                // if (!this._serverTimer.running) {
                // 	this._serverTimer.start();
                // 	this.checkDate(false);
                // }
                break;
            default:
                var name_1 = this._protoIDs[nameId];
                if (!name_1) {
                    console.log('没有ID为' + nameId + '的协议!');
                    break;
                }
                var index = name_1.indexOf('.');
                var module = name_1.substring(0, index);
                var action = name_1.substring(index + 1);
                //let id = bytes.readUnsignedInt();
                //console.log('%s callId:%d', name, id);
                //let body: egret.ByteArray = new egret.ByteArray();
                var body = new Laya.Byte();
                bytes.readBytes(body);
                var Message = this._protoBuilderMap[module].build(name_1);
                var message = Message.decode(body['buffer']);
                this.event(name_1, message);
                var AwesomeMessage = root.lookup("awesomepackage.AwesomeMessage");
        }
    };
    Server.prototype.onConnectError = function (e) {
    };
    return Server;
}(Laya.EventDispatcher));
//# sourceMappingURL=server.js.map