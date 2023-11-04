class Background extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.layers = [
            {speed: 25, offset: 0, texture: new Image()},
            {speed: 250, offset: 0, texture: new Image()},
            {speed: 500, offset: 0, texture: new Image()},
            {speed: 750, offset: 0, texture: new Image()},
            {speed: 1000, offset: 0, texture: new Image()}
        ];
        this.layers[0].texture.src = "assets/background/Layer_0.png";
        this.layers[1].texture.src = "assets/background/Layer_1.png";
        this.layers[2].texture.src = "assets/background/Layer_2.png";
        this.layers[3].texture.src = "assets/background/Layer_3.png";
        this.layers[4].texture.src = "assets/background/Layer_4.png";
    }

    Draw(){
        this.layers.forEach(layer => {
            for(let x = 0; x + layer.offset < this.game.c.width ; x += this.game.c.height * 2){
                this.game.ctx.drawImage(layer.texture, x + layer.offset, 0, this.game.c.height * 2, this.game.c.height);
            }
        });
    }
    Update(){
        this.layers.forEach(layer => {
            for(let x = 0; x < this.game.c.width ; x += this.game.c.height * 2){
                layer.offset -= layer.speed * this.game.time.deltaTime;
            }
            if(layer.offset < -this.game.c.height * 2) layer.offset -= this.game.c.height * 2;
        });
    }
}