
class CServer extends Server{
    public _over:boolean;
    constructor(){
        super();
        this._over = false;
    }

    public sendData(name: string, data: any, cb: Function = null): void {
        if( !this._over){
            super.sendData(name, data, cb);
        }
	}
}