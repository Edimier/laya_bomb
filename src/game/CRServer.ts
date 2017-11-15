
class CServer extends Server{
    public _over:boolean;

    public sendData(name: string, data: any, cb: Function = null): void {
        super.sendData(name, data, cb);
	}
}