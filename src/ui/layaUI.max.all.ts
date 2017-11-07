
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class gamebgUI extends View {
		public bt_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/star.png"}},{"type":"Button","props":{"y":10,"x":558,"width":30,"var":"bt_close","skin":"comp/btn_close.png","height":30}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gamebgUI.uiView);
        }
    }
}

module ui {
    export class loginUI extends View {
		public bt_input:Laya.TextInput;
		public bt_login:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,5,5,5","height":400}},{"type":"Label","props":{"y":170,"x":125,"width":160,"text":"请输入uid:","height":30,"fontSize":30,"font":"楷体","color":"#0b0707","bold":true}},{"type":"TextInput","props":{"y":172,"x":288,"width":200,"var":"bt_input","skin":"comp/textinput.png","sizeGrid":"4,4,4,4","restrict":"0123456789","prompt":"请输入1~100之间的整数","height":30}},{"type":"Button","props":{"y":267,"x":223.5,"width":153,"var":"bt_login","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"LOGIN","height":69}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginUI.uiView);
        }
    }
}

module ui {
    export class promptUI extends View {
		public bt_return:Laya.Button;
		public bt_prompt:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,5,5,5","height":400}},{"type":"Button","props":{"y":267,"x":223,"width":153,"var":"bt_return","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"RETURN","height":69}},{"type":"Label","props":{"y":109,"x":146,"width":324,"var":"bt_prompt","height":113,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.promptUI.uiView);
        }
    }
}
