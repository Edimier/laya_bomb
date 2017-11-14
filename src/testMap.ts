class testMap{
    private _self : player;
    private _bg : gameBg;
    private _can_move_x:Array<number>;
    private _can_move_y:Array<number>;
    
    private _uid;
    private _map;
    private _height;
    private _width;
    private _startx;
    private _starty;

    constructor(){
        this._uid = 23;
        this._self = new player();
        this._self._uid = 23;

        this._startx = 140;
        this._starty = 80;
    }
    private calc_pos_xy(i:number, width?:number, height?:number, basex?:number, basey?:number){
        let x = i % 15;
        let y = Math.floor(i/15);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        //console.log(x,y);
        return [basex + x * width, basey + y * height];
    }

    private createOtherPlayer(uid, x, y, index){
    }

    private calc_pos_index(x:number, y:number):number{
        let yy = Math.floor( (y - this._starty )/(this._height - 10) )* 15;
        let xx = ( x - this._startx )/this._width;
        let ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    }

    private send_pos(x?:number, y?:number, pos_index?:number){
    }
    

    private can_move(posx, posy, opt):boolean{
        let index = this.calc_pos_index(posx, posy);
        if(this._map[index] && this._map[index] == Define.EMPTYPLACE){
            return true;
        }
        return false;
    }

    private moveDown(){
        if(this.can_move(this._self.x, this._self.y + 20 + this._height - 10, Define.DOWN)){
            this._self.y += this._height - 10;
            this.send_pos();
        }
    }

    private moveUp(){
        if(this.can_move(this._self.x, this._self.y  + 20 - this._height + 10, Define.UP)){
            this._self.y -= this._height - 10;
            this.send_pos();
        }
    }

    private moveLeft(){
        if(this.can_move(this._self.x - this._width, this._self.y + 20, Define.LEFT)){
            this._self.x -= this._width;
            this.send_pos();
        }
    }
    private moveRight(){
        if(this.can_move(this._self.x + this._width, this._self.y + 20, Define.RIGHT)){
            this._self.x += this._width;
            this.send_pos();
        }
    }

    private handleMove(opt){
         switch (opt){
            case Define.DOWN:
                this.moveDown();
                break;
            case Define.UP:
                this.moveUp();
                break;
            case Define.LEFT:
               this.moveLeft();
                break;
            case Define.RIGHT:
                this.moveRight();
                break;
            default:
                break;
        }   
    }

    public test(){
        let msg = {
            wall : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,2,3,3,3,3,3,3,3,3,1,1,3,1,3,1,3,1,3,1,2,1,3,1,3,1,1,3,3,3,2,3,2,3,3,3,3,3,3,3,1,1,3,1,3,1,2,1,3,1,3,1,3,1,2,1,1,2,3,2,3,3,3,3,3,3,3,3,3,3,1,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,1,3,3,3,3,2,3,3,3,2,2,3,2,3,1,1,3,1,2,1,2,1,3,1,3,1,2,1,2,1,1,3,3,3,3,3,2,2,2,2,3,3,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            //wall : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            pos : [23,0,0,16]
        }

        this.handleMapNtf(msg);
    }

    private handleBomb(){
        let bomb = new Laya.Sprite();
        bomb.loadImage("comp/bomb.png");
        this._bg.addChild(bomb);
        bomb.pos(this._self.x, this._self.y);

        //console.log( this.calc_pos_index(this._self.x, this._self.y + 20));

        this._bg.setChildIndex(this._bg.getChildAt( this._bg.numChildren - 1), this._bg.numChildren - 2);
        bomb.timerOnce(3000, this, ()=>{
            
            bomb.removeSelf();
            bomb.destroy();
        });
    }

    private handleMapNtf(msg:any){
        this._map = msg.wall;
        this._bg = new gameBg();
        Laya.stage.addChild(this._bg);
        let bg = this._bg;

        this._can_move_x = new Array<number>();
        this._can_move_y = new Array<number>();

        // bg.bt_down.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.DOWN]);
        // bg.bt_up.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.UP]);
        // bg.bt_left.on(Laya.Event.MOUSE_DOWN, this, this.handleMove,[Define.LEFT]);
        // bg.bt_right.on(Laya.Event.MOUSE_DOWN, this, this.handleMove, [Define.RIGHT]);

        bg.bt_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.bt_up.on(Laya.Event.CLICK, this, this.handleMove,[Define.UP]);
        bg.bt_left.on(Laya.Event.CLICK, this, this.handleMove,[Define.LEFT]);
        bg.bt_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);
        bg.bt_bomb.on(Laya.Event.CLICK, this, this.handleBomb);

        let startIndex:number = 0;
        for(let i = 0; i < msg.wall.length; ++i){
            let type = msg.wall[i];
            let x = i % 15;
            let y = Math.floor(i/15);

            if(type == Define.STRICK){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/strick.png");
                bg.addChild(sp);
                let height = sp.height - 10;
                let width = sp.width;

                sp.pos(this._startx + x * width, this._starty + y * height);
            } else if(type == Define.STONE){
                let sp = new Laya.Sprite();
                sp.loadImage("comp/stone.png");
                bg.addChild(sp);
                let height = sp.height - 10;
                let width = sp.width;
                this._height = sp.height;
                this._width = sp.width;

                sp.pos(this._startx + x * width, this._starty + y * height);

                sp.on(Laya.Event.CLICK, this, ()=>{
                    this.calc_pos_index(Laya.stage.mouseX, Laya.stage.mouseY);
                })

                //console.log(sp.x, sp.y, i);
                //this.calc_pos_index(sp.x, sp.y);
            }
        }

        for(let i = 0; i < msg.pos.length; i = i + 4){
            let uid = msg.pos[i];
            let x = msg.pos[i+1];
            let y = msg.pos[i+2];
            let index = msg.pos[i+3];

            if(uid == this._uid){
                let self = this._self;
                self.loadImage("comp/front.png");
                bg.addChild(self);
                if(x > 0 && y > 0){
                    self.pos(x, y);
                } else {
                    let pos = this.calc_pos_xy(index, this._width, this._height - 20);
                    self.pos(pos[0], pos[1]);
                }
            } else {
                this.createOtherPlayer(uid, x, y, index);
            }
        }
    }
}