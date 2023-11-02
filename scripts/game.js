class Game{
    #score = 0;
    constructor(canvas){
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.time = new Time();
        this.input = new Input();

        window.onresize = () => {this.ResizeCanvas();}
        this.ResizeCanvas();

        this.dinosaur = new Dinosaur(this, 100, 400, 100, 100, 50);
        this.obstacles = [];
        this.nextObstacleSpawn = 0;

        //#region assets
        this.assets = {
            dinosaur: {
                standing: new Image(),
                crouching: new Image()
            },
            obstacles: {
                cactus: new Image(),
                meteor: new Image()
            }
        }
        this.assets.dinosaur.standing.src = "assets/dinosaur-standing.png";
        this.assets.dinosaur.crouching.src = "assets/dinosaur-crouching.png";
        this.assets.obstacles.cactus.src = "assets/cactus.png";
        this.assets.obstacles.meteor.src = "assets/meteor.png";
        //#endregion


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
        if(this.input.KeyDown("S")) this.dinosaur.crouching = true;
        else                        this.dinosaur.crouching = false;

        if(this.nextObstacleSpawn <= 0){
            let spawnY = 400
            if(Math.random() < .25) spawnY = 350;
            this.obstacles.push(new Obstacle(this, this.c.width, spawnY, 100, 100, (spawnY == 400)));
            this.nextObstacleSpawn = Math.random() + .75;
        }
        this.nextObstacleSpawn -= this.time.deltaTime;
    }
}