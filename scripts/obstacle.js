class Obstacle extends GameObject{
    constructor(game, x, y, w, h){
        super(game, x, y, w, h);
    }
    Draw(){
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "red";
        this.game.ctx.rect(this.x, this.y, this.w, this.h);
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }
}