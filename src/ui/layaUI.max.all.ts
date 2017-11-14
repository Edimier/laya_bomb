
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class gamebgUI extends View {
		public bt_game_bg:Laya.Image;
		public m_score1:Laya.Label;
		public m_scoreLable1:Laya.Image;
		public m_score2:Laya.Label;
		public m_scoreLable2:Laya.Image;
		public bt_up:Laya.Button;
		public bt_down:Laya.Button;
		public bt_right:Laya.Button;
		public bt_left:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bt_game_bg","skin":"comp/bg2.png","name":"gamebg"}},{"type":"Label","props":{"y":50,"x":202,"width":67,"var":"m_score1","height":25,"borderColor":"#40e20d"}},{"type":"Image","props":{"y":50,"x":146,"width":47,"var":"m_scoreLable1","skin":"comp/score.png","name":"scoreLable1","height":39}},{"type":"Label","props":{"y":50,"x":370,"width":67,"var":"m_score2","height":25,"borderColor":"#40e20d"}},{"type":"Image","props":{"y":50,"x":314,"width":47,"var":"m_scoreLable2","skin":"comp/score.png","name":"scoreLable2","height":39}},{"type":"Button","props":{"y":208,"x":80,"width":30,"var":"bt_up","skin":"comp/button.png","label":"up","height":30}},{"type":"Button","props":{"y":263,"x":80,"width":30,"var":"bt_down","skin":"comp/button.png","label":"down","height":30}},{"type":"Button","props":{"y":237,"x":111,"width":30,"var":"bt_right","skin":"comp/button.png","label":"right","height":30}},{"type":"Button","props":{"y":237,"x":49,"width":30,"var":"bt_left","skin":"comp/button.png","label":"lefit","height":30}}]};
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
