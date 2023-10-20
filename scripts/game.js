class Game{
    #score = 0;
    constructor(canvas){
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.time = new Time();
        this.input = new Input();

        window.onresize = () => {this.ResizeCanvas();}
        this.ResizeCanvas();

        this.dinosaur = new Dinosaur(this, 100, 400, 100, 100);
        this.obstacles = [];
        this.nextObstacleSpawn = 0;

        this.interval = setInterval(this.Update.bind(this));
    }

    ResizeCanvas(){
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
    }

    Update(){
        this.time.UpdateDeltaTime();
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.obstacles.forEach((x, index) => {
            x.Move(-1000 * this.time.deltaTime, 0);
            if(x.x < -x.w){
                x.x = this.c.width;
                this.obstacles.splice(index, 1);
                this.#score++;
            }
            if(this.dinosaur.Collides(x)){
                console.log("game over");
            } 
            x.Draw();
        });

        this.dinosaur.JumpUpdate();
        this.dinosaur.Draw();

        if(this.input.KeyDown(" ")) this.dinosaur.Jump();

        if(this.nextObstacleSpawn <= 0){
            this.obstacles.push(new Obstacle(this, this.c.width, 400, 100, 100));
            this.nextObstacleSpawn = Math.random() + .75;
        }
        this.nextObstacleSpawn -= this.time.deltaTime;
    }
}