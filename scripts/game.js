class Game{
    #score = 0;
    constructor(canvas){
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.time = new Time();
        this.input = new Input();

        window.onresize = () => {this.ResizeCanvas();}
        this.ResizeCanvas();

        this.background = new Background(this);
        this.dinosaur = new Dinosaur(this, 100,  this.c.height * .75, window.innerHeight * .1, window.innerHeight * .1);
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
        this.assets.dinosaur.standing.src = "assets/dinosaur/standing.png";
        this.assets.dinosaur.crouching.src = "assets/dinosaur/crouching.png";
        this.assets.obstacles.cactus.src = "assets/obstacles/cactus.png";
        this.assets.obstacles.meteor.src = "assets/obstacles/meteor.png";
        //#endregion

        this.loaded = false;
        this.interval = setInterval(this.Update.bind(this));
    }

    ResizeCanvas(){
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
        
        if(this.loaded){
            this.dinosaur.ChangeScale(this.c.height * .75, this.c.height * .1, this.c.height * .1)
            this.obstacles.forEach(x => {
                let y = this.c.height * .75;
                if(!x.grounded) y -= this.dinosaur.h - this.dinosaur.crouchH;
                x.ChangeScale(y, this.c.height * .1, this.c.height * .1);
            });
        }
        else this.loaded = true;
    }

    Update(){
        this.time.UpdateDeltaTime();
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.background.Draw();
        this.background.Update();
        this.obstacles.forEach((x, index) => {
            x.Move(-1000 * this.time.deltaTime, 0);
            if(x.x < -x.w){
                x.x = this.c.width;
                this.obstacles.splice(index, 1);
                this.#score++;
            }
            if(this.dinosaur.Collides(x)){
                console.log("game over");
                alert("GAME OVER \nScore: " + this.#score + "\nPress OK to try again");
                location.reload();
            } 
            x.Draw();
        });
        this.dinosaur.JumpUpdate();
        this.dinosaur.Draw();

        if(this.input.KeyDown(" ")) this.dinosaur.Jump();
        if(this.input.KeyDown("S")) this.dinosaur.crouching = true;
        else                        this.dinosaur.crouching = false;

        if(this.nextObstacleSpawn <= 0){
            let spawnY = this.c.height * .75;
            if(Math.random() < .25) spawnY -= (this.dinosaur.h - this.dinosaur.crouchH) * 1.5;
            this.obstacles.push(new Obstacle(this, this.c.width, spawnY, this.c.height * .1, this.c.height * .1, (spawnY == this.c.height * .75)));
            this.nextObstacleSpawn = Math.random() + .75;
        }
        this.nextObstacleSpawn -= this.time.deltaTime;
    }
}