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
        _this.num = 100;
        _this.socket = new Laya.Socket();
        _this._protoIDs = ProtoIDs.getMap();
        _this.protoBuf = Laya.Browser.window.protobuf;
        _this._protoBuilderUserMap = _this.protoBuf.load("../laya/proto/user.proto");
        return _this;
    }
    Server.prototype.connect = function (addr, port) {
        this.socket.connectByUrl(addr + ":" + port);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    };
    Server.prototype.onSocketOpen = function () {
        console.log("socket open");
    };
    Server.prototype.onSocketClose = function () {
        console.log("socket close");
    };
    Server.prototype.onMessageReveived = function (data) {
        var _this = this;
        var bytes = new Laya.Byte();
        bytes.writeArrayBuffer(data);
        var len = bytes.getUint16();
        var nameId = bytes.getUint16();
        switch (nameId) {
            case 0://登录成功
                console.log("登录成功");
                this.event("LOGIN_SUCCESS");
                break;
            case 1://登录失败
                console.log("登录失败");
                this.event("LOGIN_FAILED");
                break;
            case 2://心跳包
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
                    var decodeData = AwesomeMessage.decode(bytes.buffer);
                    _this.event(name_1, decodeData);
                });
        }
    };
    Server.prototype.onConnectError = function (e) {
        console.log("connect error");
    };
    Server.prototype.sendData = function (name, data, cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        var index = name.indexOf('.');
        var module = name.substring(0, index);
        if (!data || !name) {
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
            _this.socket.send(pkg.buffer);
            _this.socket.flush();
        });
    };
    return Server;
}(Laya.EventDispatcher));
//# sourceMappingURL=server.js.map