class Server extends Laya.EventDispatcher{
    private _socket:Laya.Socket;
    private _protoIDs;
    private _protoBuilderUserMap;
    private _protoBuilderGameMap;

    constructor(){
        super();
        this._socket = new Laya.Socket();
        this._socket.endian = Laya.Socket.BIG_ENDIAN;

        //加载协议映射表
        this._protoIDs = ProtoIDs.getMap();

        //加载协议处理
        let protoBuf =  Laya.Browser.window.protobuf;
        this._protoBuilderUserMap = protoBuf.load("../laya/proto/user.proto");
        this._protoBuilderGameMap = protoBuf.load("../laya/proto/user.proto");
    }

    // 测试
    public test(){
        this.connect("ws://45.76.110.156:7001/ws");   
    }

    public connect(addr){
        this._socket.connectByUrl(addr);
        this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this._socket.on(Laya.Event.ERROR, this, this.onConnectError);
    }

    public onSocketOpen(){

        //服务器有个一个基本的认证过程，以下是自己定义的认证方式
        //认证开始
        let uid = 23;
        let token = "123";
        let uuid = "123";
        let channel_id = 123;
        let platformId = 123;
		let params = [uid,1,token,uuid,channel_id, platformId].join(':');

        let ba : Laya.Byte = new Laya.Byte();
        ba.endian = Laya.Socket.BIG_ENDIAN;
        ba.writeUint16(0);
        ba.writeUTFBytes(params);
		this._socket.send(ba.buffer);
		this._socket.flush();
        //认证结束

        this.sendData("user.UserInfoRequest", {uid:uid});
    }

    public onSocketClose(){
        console.log("socket close");
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
                    let decodeData = AwesomeMessage.decode( bytes.getUint8Array(4, bytes.length - 4));
                    this.event(name, decodeData);
                })
        }
    }

    public onConnectError(e: Event){
        console.log("connect error");
    }

    public sendData(name: string, data: any, cb: Function = null): void {
        let index: number = name.indexOf('.');
        let module: string = name.substring(0, index);
		if(!data || !name){
            console.log("here");
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
        })
	}
}