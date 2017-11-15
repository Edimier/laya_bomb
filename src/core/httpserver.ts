class httpserver extends Laya.EventDispatcher{
		private hr: Laya.HttpRequest;
		public connect(addr:string, msg:string): void {
			this.hr = new Laya.HttpRequest();
			this.hr.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
			this.hr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
			this.hr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
			this.hr.send(addr, msg, 'post', 'text');
		}

		private onHttpRequestError(e: any): void {
            this.event("HTTPERROR")
			console.log(e);
		}

		private onHttpRequestProgress(e: any): void {
			//console.log(e)
		}

		private onHttpRequestComplete(e: any): void {
			this.event("HTTPCOMPLETE", e)
		}
	}
}