class Game{
    constructor(element){
        this.c = element;
        this.ctx = this.c.getContext("2d");
        this.time = new Time();

        window.onresize = this.ResizeCanvas();
        this.ResizeCanvas();

        this.interval = setInterval(this.Update.bind(this))
    }

    ResizeCanvas(){
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
    }

    Update(){
        this.time.UpdateDeltaTime();
        console.log(this.time.deltaTime);
    }
}