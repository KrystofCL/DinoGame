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
        if(this.keysDown[key] === undefined) this.keysDown[key] = false;
        return this.keysDown[key];
    }
}