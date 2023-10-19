class Time{
    #lastTime;
    constructor(){
        this.deltaTime = 0;
        this.#lastTime = 0;
    }

    UpdateDeltaTime(){
        this.deltaTime = (performance.now()-this.#lastTime)/1000;
        this.#lastTime = performance.now();
        return this.deltaTime;
    }
}