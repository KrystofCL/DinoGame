class Input{
    constructor(){
        this.keysDown = []

        document.onkeydown = (event) => {
            this.keysDown[event.key.toLocaleLowerCase()] = true;
        }
        document.onkeyup = (event) => {
            this.keysDown[event.key.toLowerCase()] = false;
        }
    }
    KeyDown(key){
        if(this.keysDown[key.toLowerCase()] === undefined) this.keysDown[key.toLowerCase()] = false;
        return this.keysDown[key.toLowerCase()];
    }
}