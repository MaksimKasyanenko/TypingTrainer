class QuestService {
    constructor(questFactory) {
        this.questFactory = questFactory;
        this.currentLevel = UserSettings.startLevel;
        this._questArr = this.questFactory.build(this.currentLevel);
    }
    onLineEntered(averageSpeed) {
        if (averageSpeed >= 120) {
            this.currentLevel++;
            document.getElementById("lvlDisp").textContent = this.currentLevel+1;
            this._questArr = this.questFactory.build(this.currentLevel);
        }
    }
    reset() {
        this.currentLevel = UserSettings.startLevel;
        this._questArr = undefined;
    }
    getLine() {
        if(!this._questArr)this._questArr = this.questFactory.build(this.currentLevel);
        return this._questArr[this.currentLevel < this._questArr.length ? this.currentLevel : this._questArr.length - 1];
    }
}