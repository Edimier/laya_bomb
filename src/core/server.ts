class Server extends Laya.EventDispatcher{
    private _socket:Laya.Socket;
    private _protoIDs;
    private _protoBuilderUserMap;
    private _protoBuilderGameMap;
    private _uid : number;
    private _connectReady:boolean = false;

    constructor(){
        super();
        this._socket = new Laya.Socket();
        this._socket.endian = Laya.Socket.BIG_ENDIAN;

        //加载协议映射表
        this._protoIDs = ProtoIDs.getMap();
        //加载协议处理
        let protoBuf =  Laya.Browser.window.protobuf;
        this._protoBuilderUserMap = protoBuf.load("res/proto/user.proto");
        this._protoBuilderGameMap = protoBuf.load("res/proto/game.proto");
    }

    // 测试
    public test(){
        
    }

    public connect(uid:number){
        this._uid = uid;
        //this.connect("ws://45.76.110.156:7001/ws");
        let addr = "ws://45.76.110.156:7001/ws";
        this._socket.connectByUrl(addr);
        this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this._socket.on(Laya.Event.ERROR, this, this.onConnectError);
    }

    public login(uid:number){
        //服务器有个一个基本的认证过程，以下是自己定义的认证方式
        //认证开始
        //let uid = 23;
        
        //认证结束
    }

    public onSocketOpen(){
        if(this._uid)
        {
            let token = "123";
            let uuid = "123";
            let channel_id = 123;
            let platformId = 123;
            let params = [this._uid,1,token,uuid,channel_id, platformId].join(':');

            let ba : Laya.Byte = new Laya.Byte();
            ba.endian = Laya.Socket.BIG_ENDIAN;
            ba.writeUint16(0);
            ba.writeUTFBytes(params);
            this._socket.send(ba.buffer);
            this._socket.flush();
            this._connectReady = true;
        } else {
            console.log("Not have uid!");
        }
        // this.sendData("user.UserInfoRequest", {uid:uid});
    }

    public onSocketClose(){
        console.log("socket close");
        this.event("CONNECT_CLOSE");
        this._connectReady = false;
    }

    public onMessageReveived(data: any){
        let bytes:Laya.Byte = new Laya.Byte();
        bytes.writeArrayBuffer(data);
        bytes.pos = 0;

        bytes.endian = Laya.Socket.BIG_ENDIAN;

		let len: number = bytes.getUint16();
		let nameId:number = bytes.getUint16();
		
		switch (nameId) {
			case 0:
                console.log("登录成功");
                this.event("LOGIN_SUCCESS", this._uid);
				break;
			case 1:
                console.log("登录失败");
                this.event("LOGIN_FAILED");
				break;
			case 2:
				console.log("收到心跳");
				break;
			default:
				let name: string = this._protoIDs[nameId];
				if (!name) {
					console.log('没有ID为' + nameId + '的协议!');
					break;
				}

				let index: number = name.indexOf('.');
				let module: string = name.substring(0, index);
				let action: string = name.substring(index + 1);
                let protoBuilderMap;

                if(module == "user"){
                    protoBuilderMap = this._protoBuilderUserMap;
                } else {
                    protoBuilderMap = this._protoBuilderGameMap;
                }
                protoBuilderMap.then( (root)=>{
                    let AwesomeMessage = root.lookup(name);
                    if(AwesomeMessage){
                        //console.log("Find name : " + name + ", id = " + nameId + ", module:" + module + ",action:" + action);
                        let decodeData = AwesomeMessage.decode( bytes.getUint8Array(4, bytes.length - 4));
                        this.event(name, decodeData);
                    } else {
                        console.log("Can not find name : " + name + ", id = " + nameId + ", module:" + module + ",action:" + action);
                    }
                })
        }
    }

    public onConnectError(e: Event){
        console.log("connect error");
        this.event("CONNECT_ERROR");
        this._connectReady = false;
    }

    public sendData(name: string, data: any, cb: Function = null): void {
        if(!this._connectReady){
            console.log("sendData socket close");
            this.event("CONNECT_CLOSE");
            return;
        }

        let index: number = name.indexOf('.');
        let module: string = name.substring(0, index);
		if(!data || !name){
            console.log(" send data not have name or data");
            return;
        }

        let protoBuilderMap;
        if(module == "user"){
            protoBuilderMap = this._protoBuilderUserMap;
        } else {
            protoBuilderMap = this._protoBuilderGameMap;
        }

        protoBuilderMap.then( (root)=>{
            let AwesomeMessage = root.lookup(name);
            if(AwesomeMessage){
                let message = AwesomeMessage.create(data);
                let errMsg = AwesomeMessage.verify(message);
                if (errMsg){
                    console.log(errMsg);
                    return;
                    //throw Error(errMsg);
                }
                let buffer = AwesomeMessage.encode(message).finish();
                let pkg: Laya.Byte = new Laya.Byte();
                pkg.endian = Laya.Byte.BIG_ENDIAN;
                pkg.writeUint16(buffer.length + 2);
                pkg.writeUint16(this._protoIDs[name]);
                pkg.writeArrayBuffer(buffer);

                this._socket.send(pkg.buffer);
                this._socket.flush();
            } else {
                console.log("encode error " + name);
            }
        })
	}
}

let server;