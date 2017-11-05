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
        _this._connectReady = false;
        _this._socket = new Laya.Socket();
        _this._socket.endian = Laya.Socket.BIG_ENDIAN;
        //加载协议映射表
        _this._protoIDs = ProtoIDs.getMap();
        //加载协议处理
        var protoBuf = Laya.Browser.window.protobuf;
        _this._protoBuilderUserMap = protoBuf.load("../laya/proto/user.proto");
        _this._protoBuilderGameMap = protoBuf.load("../laya/proto/user.proto");
        return _this;
    }
    // 测试
    Server.prototype.test = function () {
    };
    Server.prototype.connect = function (uid) {
        this._uid = uid;
        //this.connect("ws://45.76.110.156:7001/ws");
        var addr = "ws://45.76.110.156:7001/ws";
        this._socket.connectByUrl(addr);
        this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this._socket.on(Laya.Event.ERROR, this, this.onConnectError);
    };
    Server.prototype.login = function (uid) {
        //服务器有个一个基本的认证过程，以下是自己定义的认证方式
        //认证开始
        //let uid = 23;
        //认证结束
    };
    Server.prototype.onSocketOpen = function () {
        if (this._uid) {
            var token = "123";
            var uuid = "123";
            var channel_id = 123;
            var platformId = 123;
            var params = [this._uid, 1, token, uuid, channel_id, platformId].join(':');
            var ba = new Laya.Byte();
            ba.endian = Laya.Socket.BIG_ENDIAN;
            ba.writeUint16(0);
            ba.writeUTFBytes(params);
            this._socket.send(ba.buffer);
            this._socket.flush();
            this._connectReady = true;
        }
        else {
            console.log("Not have uid!");
        }
        // this.sendData("user.UserInfoRequest", {uid:uid});
    };
    Server.prototype.onSocketClose = function () {
        console.log("socket close");
        this.event("CONNECT_CLOSE");
        this._connectReady = false;
    };
    Server.prototype.onMessageReveived = function (data) {
        var _this = this;
        var bytes = new Laya.Byte();
        bytes.writeArrayBuffer(data);
        bytes.pos = 0;
        bytes.endian = Laya.Socket.BIG_ENDIAN;
        var len = bytes.getUint16();
        var nameId = bytes.getUint16();
        switch (nameId) {
            case 0:
                console.log("登录成功");
                this.event("LOGIN_SUCCESS");
                break;
            case 1:
                console.log("登录失败");
                this.event("LOGIN_FAILED");
                break;
            case 2:
                console.log("收到心跳");
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
                var protoBuilderMap = void 0;
                if (module == "user") {
                    protoBuilderMap = this._protoBuilderUserMap;
                }
                else {
                    protoBuilderMap = this._protoBuilderGameMap;
                }
                protoBuilderMap.then(function (root) {
                    var AwesomeMessage = root.lookup(name_1);
                    var decodeData = AwesomeMessage.decode(bytes.getUint8Array(4, bytes.length - 4));
                    _this.event(name_1, decodeData);
                });
        }
    };
    Server.prototype.onConnectError = function (e) {
        console.log("connect error");
        this.event("CONNECT_ERROR");
        this._connectReady = false;
    };
    Server.prototype.sendData = function (name, data, cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        if (!this._connectReady) {
            console.log("sendData socket close");
            this.event("CONNECT_CLOSE");
            return;
        }
        var index = name.indexOf('.');
        var module = name.substring(0, index);
        if (!data || !name) {
            console.log("here");
            return;
        }
        var protoBuilderMap;
        if (module == "user") {
            protoBuilderMap = this._protoBuilderUserMap;
        }
        else {
            protoBuilderMap = this._protoBuilderGameMap;
        }
        protoBuilderMap.then(function (root) {
            var AwesomeMessage = root.lookup(name);
            var message = AwesomeMessage.create(data);
            var errMsg = AwesomeMessage.verify(message);
            if (errMsg) {
                console.log(errMsg);
                return;
                //throw Error(errMsg);
            }
            var buffer = AwesomeMessage.encode(message).finish();
            var pkg = new Laya.Byte();
            pkg.endian = Laya.Byte.BIG_ENDIAN;
            pkg.writeUint16(buffer.length + 2);
            pkg.writeUint16(_this._protoIDs[name]);
            pkg.writeArrayBuffer(buffer);
            _this._socket.send(pkg.buffer);
            _this._socket.flush();
        });
    };
    return Server;
}(Laya.EventDispatcher));
var server = new Server();
//# sourceMappingURL=server.js.map