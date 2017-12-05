
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class bombingUI extends View {
		public ani_bombing:Laya.Animation;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Animation","props":{"y":4,"x":-1,"width":146,"var":"ani_bombing","source":"bombing/01.png,bombing/02.png,bombing/03.png,bombing/04.png,bombing/05.png,bombing/06.png,bombing/07.png,bombing/08.png,bombing/09.png,bombing/10.png,bombing/11.png,bombing/12.png,bombing/13.png,bombing/14.png,bombing/15.png,bombing/16.png,bombing/17.png,bombing/18.png,bombing/19.png,bombing/20.png,bombing/21.png,bombing/22.png,bombing/23.png","scaleY":0.3,"scaleX":0.3,"pivotY":36,"pivotX":29,"height":142,"autoPlay":false}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bombingUI.uiView);
        }
    }
}

module ui {
    export class gamebgUI extends View {
		public bt_game_bg:Laya.Image;
		public m_up:Laya.Button;
		public m_down:Laya.Button;
		public m_right:Laya.Button;
		public m_left:Laya.Button;
		public bt_bomb:Laya.Button;
		public m_lable2:Laya.Label;
		public bt_close:Laya.Button;
		public m_score1:Laya.Label;
		public m_lable1:Laya.Label;
		public m_score2:Laya.Label;
		public imge_head_self:Laya.Sprite;
		public imge_head_other:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1136,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bt_game_bg","skin":"comp/bg2.png","name":"gamebg"}},{"type":"Button","props":{"y":322,"x":95,"width":80,"var":"m_up","skin":"comp/button.png","name":"up","label":"up","height":80,"alpha":0.5}},{"type":"Button","props":{"y":480,"x":95,"width":80,"var":"m_down","skin":"comp/button.png","name":"down","label":"down","height":80,"alpha":0.5}},{"type":"Button","props":{"y":401,"x":174,"width":80,"var":"m_right","skin":"comp/button.png","name":"right","label":"right","height":80,"alpha":0.5}},{"type":"Button","props":{"y":399,"x":18,"width":80,"var":"m_left","skin":"comp/button.png","name":"left","label":"left","height":80,"alpha":0.5}},{"type":"Button","props":{"y":407,"x":946,"width":100,"var":"bt_bomb","skin":"comp/button.png","name":"bomb","label":"bomb","height":100,"alpha":0.5}},{"type":"Label","props":{"y":148,"x":899,"width":111,"var":"m_lable2","height":48,"gray":true}},{"type":"Button","props":{"y":29,"x":1030,"width":80,"var":"bt_close","skin":"comp/back.png","height":80}},{"type":"Image","props":{"y":56,"x":192,"width":34,"skin":"comp/coin.png","height":34}},{"type":"Label","props":{"y":65,"x":228,"width":75,"var":"m_score1","text":"0","height":27,"fontSize":20,"font":"SimHei","align":"center"}},{"type":"Label","props":{"y":145,"x":53,"width":111,"var":"m_lable1","height":48}},{"type":"Label","props":{"y":65,"x":739,"width":67,"var":"m_score2","text":"0","height":25,"fontSize":20,"font":"SimHei","align":"center"}},{"type":"Image","props":{"y":56,"x":826,"width":34,"skin":"comp/coin.png","height":34}},{"type":"Sprite","props":{"y":28,"x":53,"width":111,"var":"imge_head_self","height":111}},{"type":"Sprite","props":{"y":28,"x":899,"width":111,"var":"imge_head_other","height":111}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gamebgUI.uiView);
        }
    }
}

module ui {
    export class loginUI extends View {
		public bt_login:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/loginBg3.png"}},{"type":"Label","props":{"y":547,"x":798,"width":278,"var":"bt_login","text":"点我游客登陆","height":45,"fontSize":40,"font":"SimSun","color":"#f3ea16","align":"center"}},{"type":"Image","props":{"y":38,"x":83,"skin":"comp/title.png"}}]};
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

        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1136,"skin":"comp/bg.png","sizeGrid":"30,5,5,5","height":640}},{"type":"Button","props":{"y":389,"x":491,"width":153,"var":"bt_return","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"RETURN","height":69}},{"type":"Label","props":{"y":130,"x":170,"width":817,"var":"bt_prompt","height":113,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.promptUI.uiView);
        }
    }
}
