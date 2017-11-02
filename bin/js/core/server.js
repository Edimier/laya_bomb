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
        _this.socket = new Laya.Socket();
        _this._protoIDs = ProtoIDs.getMap();
        _this._protoBuilderMap = {};
        _this.protoBuf = Laya.Browser.window.protobuf;
        _this.protoBuf.load("../laya/proto/user.proto", _this.initUserProtoBuilder);
        _this.protoBuf.load("../laya/proto/game.proto", _this.initGameProtoBuilder);
        return _this;
    }
    Server.prototype.initUserProtoBuilder = function (err, root) {
        this._protoBuilderMap["user"] = root;
        this.testProto();
    };
    Server.prototype.initGameProtoBuilder = function (err, root) {
        this._protoBuilderMap["game"] = root;
    };
    Server.prototype.testProto = function () {
        var AwesomeMessage = this._protoBuilderMap["user"].lookup("user.UserInfoRequest");
        var message = AwesomeMessage.create({
            uid: 123
        });
        // Verify the message if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = AwesomeMessage.verify(message);
        if (errMsg)
            throw Error(errMsg);
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = AwesomeMessage.encode(message).finish();
        // ... do something with buffer
        // Or, encode a plain object  也可以用这种方式创建这个数据然后编码
        var buffer = AwesomeMessage.encode({
            awesomeField: "AwesomeString"
        }).finish();
        // ... do something with buffer
        // Decode an Uint8Array (browser) or Buffer (node) to a message   解码处理
        var message = AwesomeMessage.decode(buffer);
        console.log(message);
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
                var Message = this._protoBuilderMap[module].lookup(name_1);
                var message = this._protoBuilderMap[module].decode(body.buffer);
                this.event(name_1, message);
        }
    };
    Server.prototype.onConnectError = function (e) {
    };
    Server.prototype.sendData = function (name, data, cb) {
        if (cb === void 0) { cb = null; }
        var head = name.substring(0, name.indexOf('.'));
        var Message = this._protoBuilderMap[head].build(name);
        var message = new Message(data);
        var body = new Laya.Byte(message.encodeAB());
        var pkg = new Laya.Byte();
        pkg.writeUint16(body.length + 2);
        pkg.writeUint16(this._protoIDs[name]);
        pkg.writeArrayBuffer(body);
        this.socket.send(pkg);
        this.socket.flush();
    };
    return Server;
}(Laya.EventDispatcher));
//# sourceMappingURL=server.js.map