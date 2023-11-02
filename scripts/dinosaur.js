class Dinosaur extends GameObject{
    #baseY;
    #baseH;
    #crouchH;
    #JumpForce = 2_250;
    #jumping = false;
    constructor(game, x, y, w, h, crouchH){
        super(game, x, y, w, h);
        this.#baseY = y;
        this.#baseH = h;
        this.#crouchH = crouchH;
        this.force = 0;
        this.forceChange = 10_000;
        this.crouching = false;
        //debug variables
        this.debug = {
            showCollider: false
        }
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
        if(this.crouching){
            this.y = this.#baseY + (this.#baseH - this.#crouchH);
            this.h = this.#crouchH;
        }
        else{
            this.h = this.#baseH;
            this.y = this.#baseY;
        }

        this.game.ctx.beginPath();
        if(this.debug.showCollider){
            this.game.ctx.fillStyle = "red";
            this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        if(!this.crouching) this.game.ctx.drawImage(this.game.assets.dinosaur.standing, this.x, this.y, this.w, this.h);
        else                this.game.ctx.drawImage(this.game.assets.dinosaur.crouching, this.x, this.y, this.w, this.h);
        this.game.ctx.closePath();
    }
}