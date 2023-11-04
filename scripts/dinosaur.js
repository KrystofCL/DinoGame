class Dinosaur extends GameObject{
    #baseH;
    #JumpForce = 2_250;
    #jumping = false;
    constructor(game, x, y, w, h){
        super(game, x, y, w, h);
        this.baseY = y;
        this.#baseH = h;
        this.crouchH = h / 2;
        this.force = 0;
        this.forceChange = 10_000;
        this.crouching = false;
        this.lastCrouch = false;
        //debug variables
        this.debug = {
            showCollider: false
        }
    }
    Jump(){
        if(!this.#jumping){
            this.force = this.#JumpForce;
            this.#jumping = true;
        }
    }
    JumpUpdate(){
        if(this.#jumping){
            this.crouching = false; //Prevents from jumping while crouching
            this.y -= this.force * this.game.time.deltaTime;
            this.force -= this.forceChange * this.game.time.deltaTime;
            if(this.y > this.baseY){
                this.y = this.baseY;
                this.#jumping = false;
            }
        }
    }
    Draw(){
        if(this.crouching && !this.lastCrouch){
            this.y = this.baseY + (this.#baseH - this.crouchH);
            this.h = this.crouchH;
            this.lastCrouch = true;
        }
        else if(!this.crouching && this.lastCrouch){
            this.h = this.#baseH;
            this.y = this.baseY;
            this.lastCrouch = false;
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

    ChangeScale(y, w, h){
        this.y = y;
        this.w = w;
        this.h = h;
        this.baseY = y;
        this.#baseH = h;
        this.crouchH = h/2;
    }
}