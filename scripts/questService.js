class QuestService {
    constructor(lineSet, infoDisplay) {
        if(!lineSet || !infoDisplay)throw new ArgumentIsEmptyError();
        this.infoDisplay=infoDisplay;
        this.lineSet = lineSet;
        this.currentLevel = UserSettings.startLevel;
    }
    set lineSet(val){
        if(!val)throw new ArgumentIsEmptyError();
        this.__ls__=val;
    }
    get lineSet(){
        return this.__ls__;
    }
    onLineEntered(averageSpeed) {
        if (averageSpeed >= 120 && UserSettings.autoLvl) {
            this.currentLevel++;
            this.infoDisplay.showLvl(this.currentLevel+1);
        }
    }
    reset() {
        this.currentLevel = UserSettings.startLevel;
        this.infoDisplay.textContent = this.currentLevel+1;
    }
    getLine() {
        return this.lineSet.getLine(this.currentLevel);
    }
}