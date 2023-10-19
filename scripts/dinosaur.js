class Dinosaur extends GameObject{
    #baseY;
    #JumpForce = 2_250;
    #jumping = false;
    constructor(game, x, y, w, h){
        super(game, x, y, w, h);
        this.#baseY = y;
        this.force = 0;
        this.forceChange = 10_000;
    }
    JumpUpdate(){
        if(this.#jumping){
            this.y -= this.force * this.game.time.deltaTime;
            this.force -= this.forceChange * this.game.time.deltaTime;
            if(this.y > this.#baseY){
                this.y = this.#baseY;
                this.#jumping = false;
            }
        }
    }
    Jump(){
        if(!this.#jumping){
            this.force = this.#JumpForce;
            this.#jumping = true;
        }
    }
    Draw(){
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "black";
        this.game.ctx.rect(this.x, this.y, this.w, this.h);
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }
}