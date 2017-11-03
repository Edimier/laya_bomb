/// <reference path="../libs/proto"/>
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
var ProtoBuf = dcodeIO.ProtoBuf;
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super.call(this) || this;
        _this.socket = new Laya.Socket();
        _this._protoIDs = ProtoIDs.getMap();
        _this.protoBuf = Laya.Browser.window.protobuf;
        _this._protoBuilderUserMap = _this.protoBuf.load("../laya/proto/user.proto");
        return _this;
    }
    Server.prototype.protoEncode = function (name, data) {
        if (!data || !name) {
            return;
        }
        var protoBuilderMap = this._protoBuilderUserMap;
        var buffer;
        protoBuilderMap.then(function (root) {
            var AwesomeMessage = root.lookup(name);
            //let AwesomeMessage = root.lookup("user.UserInfoRequest");
            //let message = AwesomeMessage.create({uid: 123});
            var message = AwesomeMessage.create(data);
            // Verify the message if necessary (i.e. when possibly incomplete or invalid)
            var errMsg = AwesomeMessage.verify(message);
            if (errMsg) {
                console.log(errMsg);
                return;
                //throw Error(errMsg);
            }
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            buffer = AwesomeMessage.encode(message).finish();
        });
        if (!buffer) {
            console.log("123");
        }
        return buffer;
    };
    Server.prototype.protoDecode = function (data) {
        if (!data) {
            return;
        }
        var protoBuilderMap = this._protoBuilderUserMap;
        var name = "user.UserInfoRequest";
        var decodeData;
        protoBuilderMap.then(function (root) {
            var AwesomeMessage = root.lookup(name);
            decodeData = AwesomeMessage.decode(data);
        });
        if (decodeData) {
            console.log(decodeData);
        }
        return decodeData;
    };
    Server.prototype.testProto = function () {
        var buffer = this.protoEncode("user.UserInfoRequest", { uid: 123 });
        if (buffer) {
            var decodeData = this.protoDecode(buffer);
            if (decodeData) {
                console.log(decodeData);
            }
        }
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
                var body = new Laya.Byte();
                bytes.readBytes(body);
                if (module == "user") {
                    var Message = this._protoBuilderUserMap.lookup(name_1);
                    var message = this._protoBuilderUserMap.decode(body.buffer);
                    this.event(name_1, message);
                }
                else {
                    var Message = this._protoBuilderGameMap.lookup(name_1);
                    var message = this._protoBuilderGameMap.decode(body.buffer);
                    this.event(name_1, message);
                }
        }
    };
    Server.prototype.onConnectError = function (e) {
    };
    Server.prototype.sendData = function (name, data, cb) {
        if (cb === void 0) { cb = null; }
        var head = name.substring(0, name.indexOf('.'));
        var Message;
        if (head == "user") {
            Message = this._protoBuilderUserMap.build(name);
        }
        else {
            Message = this._protoBuilderGameMap.build(name);
        }
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