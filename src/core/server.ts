class Server extends Laya.EventDispatcher{
    
    private socket:Laya.Socket;
    private protoBuf;
    private root;
    private _protoIDs;
    private _protoBuilderMap;
    constructor(){
        super();
        this.socket = new Laya.Socket();
        this._protoIDs = ProtoIDs.getMap();
        this._protoBuilderMap = {};
        this.protoBuf =  Laya.Browser.window.protobuf;
        this.protoBuf.load("../laya/proto/user.proto", this.initUserProtoBuilder);
        this.protoBuf.load("../laya/proto/game.proto", this.initGameProtoBuilder);
    }

    private initUserProtoBuilder(err, root){
        this._protoBuilderMap["user"] = root;
        this.testProto();
    }

    private initGameProtoBuilder(err, root){
        this._protoBuilderMap["game"] = root;
    }

    public testProto():void{
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
    }

    public connect(addr:string, port:number){
        this.socket.connectByUrl(addr + ":" + port);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    }

    public onSocketOpen(){
        
    }

    public onSocketClose(){

    }

    public onMessageReveived(bytes: any){

		let len: number = bytes.readUnsignedShort();
		let nameId = bytes.readUnsignedShort();
		
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
				let name: string = this._protoIDs[nameId];
				if (!name) {
					console.log('没有ID为' + nameId + '的协议!');
					break;
				}

				let index: number = name.indexOf('.');
				let module: string = name.substring(0, index);
				let action: string = name.substring(index + 1);

                let body: Laya.Byte = new Laya.Byte();
				bytes.readBytes(body);

				let Message = this._protoBuilderMap[module].lookup(name);
                let message = this._protoBuilderMap[module].decode(body.buffer);
                this.event(name, message);

                // var AwesomeMessage = root.lookup("awesomepackage.AwesomeMessage");
                // var message = AwesomeMessage.create({
                //     awesomeField: "AwesomeString"
                // });

                // // Verify the message if necessary (i.e. when possibly incomplete or invalid)
                // var errMsg = AwesomeMessage.verify(message);
                // if (errMsg)
                //     throw Error(errMsg);

                // // Encode a message to an Uint8Array (browser) or Buffer (node)
                // var buffer = AwesomeMessage.encode(message).finish();

                // // ... do something with buffer
                // // Or, encode a plain object  也可以用这种方式创建这个数据然后编码
                // var buffer = AwesomeMessage.encode({
                //     awesomeField: "AwesomeString"
                // }).finish();

                // // ... do something with buffer
                // // Decode an Uint8Array (browser) or Buffer (node) to a message   解码处理
                // var message = AwesomeMessage.decode(buffer); 
        }
    }

    public onConnectError(e: Event){

    }

    public sendData(name: string, data: any, cb: Function = null): void {
		let head: string = name.substring(0, name.indexOf('.'));
		let Message = this._protoBuilderMap[head].build(name);
		let message = new Message(data);
		
		let body: Laya.Byte= new Laya.Byte(message.encodeAB());

		let pkg: Laya.Byte = new Laya.Byte();

        pkg.writeUint16(body.length + 2);
        pkg.writeUint16(this._protoIDs[name]);
        pkg.writeArrayBuffer(body);

        this.socket.send(pkg);
		this.socket.flush();
	}
}