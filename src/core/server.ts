
//import ProtoBuf = dcodeIO.ProtoBuf;

class Server extends Laya.EventDispatcher{
    private socket:Laya.Socket;
    private protoBuf;
    private root;
    private _protoIDs;
    private _protoBuilderUserMap;
    private _protoBuilderGameMap;
    constructor(){
        super();
        this.socket = new Laya.Socket();
        this._protoIDs = ProtoIDs.getMap();
        this.protoBuf =  Laya.Browser.window.protobuf;
        this._protoBuilderUserMap = this.protoBuf.load("../laya/proto/user.proto");
    }

    private protoEncode(name:string, data:any):any{
        if(!data || !name){
            return;
        }

        let protoBuilderMap = this._protoBuilderUserMap;
        let buffer;

        protoBuilderMap.then( (root)=>{
            let AwesomeMessage = root.lookup(name);
            //let AwesomeMessage = root.lookup("user.UserInfoRequest");
            //let message = AwesomeMessage.create({uid: 123});

            let message = AwesomeMessage.create(data);
            // Verify the message if necessary (i.e. when possibly incomplete or invalid)
            let errMsg = AwesomeMessage.verify(message);
            if (errMsg){
                console.log(errMsg);
                return;
                //throw Error(errMsg);
            }
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            buffer = AwesomeMessage.encode(message).finish();
        })

        if(!buffer){
            console.log("123");
        }
        return buffer;
    }

    private protoDecode(data:any):any{
        if(!data){
            return;
        }

        let protoBuilderMap = this._protoBuilderUserMap;
        let name = "user.UserInfoRequest";
        let decodeData;

        protoBuilderMap.then( (root)=>{
           let AwesomeMessage = root.lookup(name);
           decodeData = AwesomeMessage.decode(data); 
        })

        if(decodeData){
            console.log(decodeData);
        }
        return decodeData;
    }

    public testProto(){
        let buffer = this.protoEncode("user.UserInfoRequest", {uid: 123});
        if(buffer){
            let decodeData = this.protoDecode(buffer);
            if(decodeData){
                console.log(decodeData);
            }
        }
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

                if ( module == "user"){
                    let Message = this._protoBuilderUserMap.lookup(name);
                    let message = this._protoBuilderUserMap.decode(body.buffer);
                    this.event(name, message);
                }
                else{
                    let Message = this._protoBuilderGameMap.lookup(name);
                    let message = this._protoBuilderGameMap.decode(body.buffer);
                    this.event(name, message);
                }


				

                // let AwesomeMessage = root.lookup("awesomepackage.AwesomeMessage");
                // let message = AwesomeMessage.create({
                //     awesomeField: "AwesomeString"
                // });

                // // Verify the message if necessary (i.e. when possibly incomplete or invalid)
                // let errMsg = AwesomeMessage.verify(message);
                // if (errMsg)
                //     throw Error(errMsg);

                // // Encode a message to an Uint8Array (browser) or Buffer (node)
                // let buffer = AwesomeMessage.encode(message).finish();

                // // ... do something with buffer
                // // Or, encode a plain object  也可以用这种方式创建这个数据然后编码
                // let buffer = AwesomeMessage.encode({
                //     awesomeField: "AwesomeString"
                // }).finish();

                // // ... do something with buffer
                // // Decode an Uint8Array (browser) or Buffer (node) to a message   解码处理
                // let message = AwesomeMessage.decode(buffer); 
        }
    }

    public onConnectError(e: Event){

    }

    public sendData(name: string, data: any, cb: Function = null): void {
		let head: string = name.substring(0, name.indexOf('.'));
        let Message;
        if(head == "user"){
            Message = this._protoBuilderUserMap.build(name);
        }
        else{
            Message = this._protoBuilderGameMap.build(name);
        }
		 
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