class Obstacle extends GameObject{
    constructor(game, x, y, w, h, grounded){
        super(game, x, y, w, h);
        this.grounded = grounded;
        //debug variables
    }
    Draw(){
        this.game.ctx.beginPath();
        if(this.grounded)   this.game.ctx.drawImage(this.game.assets.obstacles.cactus, this.x, this.y, this.w, this.h);
        else                this.game.ctx.drawImage(this.game.assets.obstacles.meteor, this.x, this.y, this.w, this.h);
        this.game.ctx.closePath();
    }
    ChangeScale(y, w, h){
        this.y = y;
        this.w = w;
        this.h = h;
    }
}