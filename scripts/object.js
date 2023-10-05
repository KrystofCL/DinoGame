class Object{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Move(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
}