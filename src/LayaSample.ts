// 程序入口

class GameMain{
    constructor()
    {
        Laya.init(600,400, laya.webgl.WebGL);
        this.initStage();
        this.loadResource();
    }

    private initStage(){
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.bgColor = "#232628";
    }

    private loadResource(){
        let uiResArry = [
            {url : "res/atlas/comp.atlas", type : Laya.Loader.ATLAS},
            {url : "res/proto/user.proto"},
            {url : "res/proto/game.proto"},
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, ()=>{
            server = new Server();
            //Laya.stage.addChild(new loginView());

            let test = new testMap();

            test.test();
            //this.test();
            //this.test2();
            //this.test3();
        }));
    }

    private initStageBlock(bg:gameBg){
        let start = bg.getChildIndex(bg.getChildByName("stone1"));
        for(let i = 165; i >0; --i){
            let stoneName = "stone" + i;
            let stone = bg.getChildByName(stoneName);
            if(stone){
                bg.setChildIndex(stone, start);
            }
        }
    }

    private test3():void{
        let bg = new gameBg();
        this.initStageBlock(bg);

        Laya.stage.addChild(bg);

        // let sp = new Laya.Sprite();
        // sp.loadImage("comp/brick.png");
        // bg.addChild(sp);

        // let height = bg.m_stone1.height;
        // let width = bg.m_stone1.width;
        // sp.height = height;
        // sp.width = width;

        // //console.log(height, width);
        // let x = bg.m_stone1.x;
        // let y = bg.m_stone1.y;
        // let re:Laya.Rectangle = sp.getBounds();

        // sp.scaleX =  width / re.width;
        // sp.scaleY =  height / re.height;
        // // sp.pos(164 + i * 21, 93);
        // sp.pos(164, 93 + 20.5);

        // let i = bg.getChildAt( bg.numChildren - 1);

        // //let startIndex = bg.getChildIndex( bg.getChildByName("stone1"));

        // console.log(bg.getChildIndex( bg.getChildByName("stone1")));
        // bg.setChildIndex(i, 1);
        // console.log(bg.getChildIndex( bg.getChildByName("stone1")));

        //let bricks:Array<Laya.Sprite> = new Array<Laya.Sprite>();

        function calc_pos_xy(index:number){
            let x = index%15 - 2;
            let y = Math.floor(index/15) - 1;
            if (x >= 0 && y >= 0){
                let a = 164 + x*21;
                let b = 83 + y*20.5;

                let yy = ((b - 83 )/20.5 + 1 ) * 15;
                let xx = ( a - 164 )/21 + 2 + ( Math.floor(yy/15) - 1) * 15;
                let iindex = xx + 15;
                console.log(x, y, index,a, b, xx, yy);
                return [a, b];
            } else {
                return [0, 0];
            }
        }

        let startIndex:number = 0;

        for(let i = 16; i < 150; ++i){

            let stoneName = "stone" + i;
            let stone = bg.getChildByName(stoneName);

            if((i-1)%15 ==0 && stone){
                startIndex = bg.getChildIndex( stone );
            }

            if (i > 15 && i % 15 != 0 && (i-1)%15 != 0 && ! stone){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/brick.png");
                bg.addChild(sp);

                let height = bg.m_stone1.height;
                let width = bg.m_stone1.width;
                sp.height = height;
                sp.width = width;
                let x = bg.m_stone1.x;
                let y = bg.m_stone1.y;
                let re:Laya.Rectangle = sp.getBounds();
                sp.scaleX =  width / re.width;
                sp.scaleY =  height / re.height;

                let xi = i%15 - 2;
                let yi = Math.floor(i/15) - 1;
                sp.pos(164 + xi * 21, 93 + yi * 20.5);

                let last = bg.getChildAt( bg.numChildren - 1 );
                bg.setChildIndex(last, startIndex);


                


                // sp.pos(164 + i * 21, 93);
                // sp.pos(164, 93 + i * 20.5);
            

                // if(i ==8){
                //     let stone = bg.getChildByName("stone152");
                //     let nu = bg.getChildIndex(stone);
                //     let last = bg.getChildAt( bg.numChildren - 1);
                //     bg.setChildIndex(stone, bg.numChildren-1);
                //     bg.setChildIndex(last, nu);
                // }
            }
        }


        // for(let i = 0; i < 9; ++i){
        //     let sp = new Laya.Sprite();
        //     bricks.push(sp);
        //     sp.loadImage("comp/brick.png");
        //     bg.addChild(sp);

        //     let height = bg.m_stone1.height;
        //     let width = bg.m_stone1.width;
        //     sp.height = height;
        //     sp.width = width;

        //     //console.log(height, width);
        //     let x = bg.m_stone1.x;
        //     let y = bg.m_stone1.y;
        //     let re:Laya.Rectangle = sp.getBounds();

        //     sp.scaleX =  width / re.width;
        //     sp.scaleY =  height / re.height;
        //     // sp.pos(164 + i * 21, 93);
        //     sp.pos(164, 93 + i * 20.5);
        //     if(i ==8){
        //         let stone = bg.getChildByName("stone152");
        //         let nu = bg.getChildIndex(stone);
        //         let last = bg.getChildAt( bg.numChildren - 1);
        //         bg.setChildIndex(stone, bg.numChildren-1);
        //         bg.setChildIndex(last, nu);
        //     }
        // }

        // let stone = bg.getChildByName("stone152");
        // let br = bg.getChildIndex(bricks[bricks.length - 1]);
        
        // console.log(bg.numChildren);
        // if(stone){
        //     console.log( bg.getChildIndex(stone));
        // }

        // console.log(Laya.stage.getChildIndex(stone));

        // Laya.stage.setChildIndex(stone, 1);







    }

    private test2(){
        let bg = new gameBg();
        Laya.stage.addChild(bg);
        let sp = new Laya.Sprite();
        sp.loadImage("comp/boy_front.png");
        bg.addChild(sp);
        
        let height = bg.m_stone1.height;
        let width = bg.m_stone1.width;
        sp.height = height;
        sp.width = width;

        //console.log(height, width);
        let x = bg.m_stone1.x;
        let y = bg.m_stone1.y;
        let re:Laya.Rectangle = sp.getBounds();

        sp.scaleX =  width / re.width;
        sp.scaleY =  height / re.height;

        function calc_pos_xy(index:number){
            let x = index%15 - 2;
            let y = Math.floor(index/15) - 1;
            if (x >= 0 && y >= 0){
                let a = 164 + x*21;
                let b = 83 + y*20.5;

                let yy = ((b - 83 )/20.5 + 1 ) * 15;
                let xx = ( a - 164 )/21 + 2 + ( Math.floor(yy/15) - 1) * 15;
                let iindex = xx + 15;
                console.log(x, y, index,a, b, xx, yy);
                return [a, b];
            } else {
                return [0, 0];
            }
        }

        function calc_pos_index(a:number,b:number):number{
            let yy = ((b - 83 )/20.5 + 1 ) * 15;
            let xx = ( a - 164 )/21 + 2 + ( Math.floor(yy/15) - 1) * 15;

            console.log(a, b, Math.round(xx + 15));

            return xx + 15;
        }

        let index = 17;

        function changePos(){
            let a = calc_pos_xy(index);
            if (a[0] > 0 && a[1] > 0){
                sp.pos(a[0], a[1]);
            }
            //console.log(a[0], a[1], index);
            index = index + 1;
        }

        bg.bt_test.on(Laya.Event.CLICK, this, changePos);

        let a = calc_pos_xy(1);

        sp.pos( x + width - 6, y + height);


        let DOWN = 1;
        let UP = 2;
        let LEFT = 3;
        let RIGHT = 4;

        let can_move_x:Array<number> = new Array();
        let can_move_y:Array<number> = new Array();

        can_move_x[0] = 164;
        can_move_y[0] = 83;
        for(let i = 1; i < 5; ++i){
            can_move_x[i] = can_move_x[i-1] + 41;
            can_move_y[i] = can_move_y[i-1] + 41;
        }

        for(let i = 5; i < 7; ++i){
            can_move_y[i] = can_move_y[i-1] + 41;
        }

        function canMove(posx, posy, opt):boolean{
            if(opt < 3){
                if(opt == DOWN){
                    if(posy + 1 > can_move_y[can_move_y.length - 1]){
                        return false
                    }
                } else {
                    if(posy - 1 < can_move_y[0]){
                        return false
                    }
                }
                for(let i in can_move_x){
                    if(posx > can_move_x[i] - 2 && posx < can_move_x[i] + 2){
                        return true;
                    }
                }
            } else {
                if(opt == LEFT){
                    if(posx - 1 < can_move_x[0]){
                        console.log(1)
                        return false
                    }
                } else {
                    if(posx + 1 > can_move_x[ can_move_x.length - 1]){
                        console.log(2)
                        return false
                    }
                }
                for(let i in can_move_y){
                    if(posy > can_move_y[i] - 2 && posy < can_move_y[i] + 2){
                        return true;
                    }
                }
            }
            return false;
        }
        
        function move(opt){
            console.log(sp.x, sp.y);
            if ( opt == DOWN){
                if(canMove(sp.x, sp.y, DOWN)){
                    sp.y = sp.y + 1;
                }
            } else if(opt == UP) {
                if(canMove(sp.x, sp.y, UP)){
                    sp.y = sp.y - 1;
                }
            } else if (opt == LEFT){
                if(canMove(sp.x, sp.y, LEFT)){
                    sp.x = sp.x - 1;
                }
            } else {
                if(canMove(sp.x, sp.y, RIGHT)){
                    sp.x = sp.x + 1;
                }
            }

            calc_pos_index(sp.x, sp.y);
        }

        function holdOn(opt){
            bg.bt_down.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clear(this, move);
            });

            bg.bt_up.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clear(this, move);
            });

             bg.bt_left.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clear(this, move);
            });

             bg.bt_right.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clear(this, move);
            });

            Laya.timer.frameLoop(5, this, move, [opt]);
        }

        bg.bt_down.on(Laya.Event.MOUSE_DOWN, this, holdOn, [DOWN]);
        bg.bt_up.on(Laya.Event.MOUSE_DOWN, this, holdOn, [UP]);
        bg.bt_left.on(Laya.Event.MOUSE_DOWN, this, holdOn, [LEFT]);
        bg.bt_right.on(Laya.Event.MOUSE_DOWN, this, holdOn, [RIGHT]);
    }

    private test(){
        let sp = new Laya.Sprite();
        sp.loadImage("comp/a2.png");
        Laya.stage.addChild(sp);
        sp.on(Laya.Event.MOUSE_DOWN, this, ()=>{
            // console.log("x:" + Laya.stage.mouseX);
            // console.log("y:" + Laya.stage.mouseY);
            sp.startDrag();
        });
    }
}
new GameMain();