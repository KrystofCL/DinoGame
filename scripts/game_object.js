class GameObject{
    constructor(game, x, y, w, h){
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Move(x = 0, y = 0){
        this.x += x;
        this.y += y;
    }

    Collides(object){
        return (this.x < object.x + object.w && this.x + this.w > object.x &&
                this.y < object.y + object.h && this.y + this.h > object.y)
    }
}