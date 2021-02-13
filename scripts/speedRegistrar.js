class SpeedRegistrar {
    constructor() {
        this._started = false;
        this._lastTime = 0;
        this._sumTime = 0;
        this._count = 0;
    }
    regOn() {
        this._lastTime = new Date().getTime();
        this._started = true;
    }
    regOff() {
        this._started = false;
    }
    step() {
        if (this._started) {
            let time = new Date().getTime();
            this._sumTime += time - this._lastTime;
            this._count++;
            this._lastTime = time;
        }
    }
    reset(){
        this._started = false;
        this._lastTime = new Date().getTime();
        this._sumTime = 0;
        this._count = 0;
    }
    getStat(){
        return {
            time: this._sumTime,
            count: this._count
        };
    }
    get stepsPerMin() {
        let res = 60 / this.secPerStep;
        return isFinite(res) ? res : 0;
    }
    get secPerStep() {
        let res = this._sumTime / this._count / 1000;
        return isFinite(res) ? res : 0;
    }
}