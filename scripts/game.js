class Game{
    constructor(canvas){
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.time = new Time();
        this.input = new Input();

        window.onresize = () => {this.ResizeCanvas();}
        this.ResizeCanvas();

        this.interval = setInterval(this.Update.bind(this));

        this.dinosaur = new Dinosaur(this, 0, 400, 100, 100);
        this.obstacles = [new Obstacle(this, 400, 400, 100, 100)];
    }

    ResizeCanvas(){
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
    }

    Update(){
        this.time.UpdateDeltaTime();
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.dinosaur.JumpUpdate();

        this.obstacles.forEach((x) => {
            x.Draw();
            x.Move(-1000 * this.time.deltaTime, 0);
            if(x.x < -x.w) x.x = this.c.width;
        });
        this.dinosaur.Draw();

        if(this.input.KeyDown(" ")) this.dinosaur.Jump();
    }
}