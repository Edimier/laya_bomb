class Server extends Laya.EventDispatcher{
    private socket:Laya.Socket;
    private protoBuf;
    private root;
    private _protoIDs;
    private _protoBuilderUserMap;
    private _protoBuilderGameMap;

    private num:number;

    constructor(){
        super();
        this.num = 100;
        this.socket = new Laya.Socket();
        this._protoIDs = ProtoIDs.getMap();
        this.protoBuf =  Laya.Browser.window.protobuf;
        this._protoBuilderUserMap = this.protoBuf.load("../laya/proto/user.proto");
    }

    public connect(addr:string, port:number){
        this.socket.connectByUrl(addr + ":" + port);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    }

    public onSocketOpen(){
        console.log("socket open");
    }

    public onSocketClose(){
        console.log("socket close");
    }

    public onMessageReveived(data: any){
        let bytes:Laya.Byte = new Laya.Byte();
        bytes.writeArrayBuffer(data);

		let len: number = bytes.getUint16();
		let nameId = bytes.getUint16();
		
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
                    let decodeData = AwesomeMessage.decode(bytes.buffer);
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

            this.socket.send(pkg.buffer);
            this.socket.flush();
        })
	}
}