class LineSetBase {
    get levelsCount() {
        throw new Error("levelsCount prop from LineSetBase not implemented");
    }
    getLevelRiseCondition(lvl) {
        throw new Error("levelRiseCondition method from LineSetBase not implemented");
    }
    getLine(lvl) {
        throw new Error("getLine method from LineSetBase not implemented");
    }
}

class LineSetQWERTYStart {
    constructor() {
        this.setLetters = [
            ["ffjj", "jjff", "fjfj", "jfjf", "fjjf", "jffj"],
            ["gghh", "hhgg", "ghgh", "hghg", "ghhg", "hggh"],
            ["ddkk", "kkdd", "dkdk", "kdkd", "dkkd", "kddk"],
            ["ssll", "llss", "slsl", "lsls", "slls", "lssl"],
            ["aass", "ddaa", "afaf", "gaga", "ahha", "jaaj"],

            ["rruu", "uurr", "ruru", "urur", "ruur", "urru"],
            ["ttyy", "yytt", "tyty", "ytyt", "tyyt", "ytty"],
            ["eeii", "iiee", "eiei", "ieie", "eiie", "ieei"],
            ["wwoo", "ooww", "wowo", "owow", "woow", "owwo"],
            ["qqpp", "ppqq", "qpqp", "pqpq", "qppq", "pqqp"],

            ["vvmm", "mmvv", "vmvm", "mvmv", "vmmv", "mvvm"],
            ["bbnn", "nnbb", "bnbn", "nbnb", "bnnb", "nbbn"],
            ["ccxx", "xxcc", "xcxc", "cxcx", "xccx", "cxxc"],
            ["zzvv", "bbzz", "znzn", "mzmz", "zccz", "xzzx"]
        ];

        this.setAriphmetics = [
            ["4477", "7744", "4747", "7474", "4774", "7447"],
            ["5665", "6556", "5656", "6565", "5665", "6556"],
            ["3388", "8833", "3838", "8383", "3883", "8338"],
            ["2299", "9922", "2929", "9292", "2992", "9229"],
            ["1100", "0011", "1010", "0101", "1001", "0110"],
            ["/", "-", "+", "=", "*", "%"]
        ];

        this.setPuctuations = [
            ";", ":", "'", '"', ",", ".", "?", "!", "(", ")", "-"
        ];

        this.setOther = [
            "@", "#", "$", "^", "&", "_", "[", "]", "{", "}", "\\", "|", "/", "<", ">"
        ];
    }
    get levelsCount() { return 22; }
    getLevelRiseCondition(lvl) {
        return lvl < this.levelsCount ? 60 : (60 + (lvl - this.levelsCount) * 10);
    }
    getLine(lvl) {
        lvl=lvl>=this.levelsCount?this.levelsCount-1:lvl;
        let resArr = [];
        let map = [];
        for (let i = 0; i < 4; i++) {
            map.push(this._randomInt(0, lvl + 1));
        }
        for(let index of map){
            if(index<this.setLetters.length){
                resArr.push(this._randomElement(this.setLetters[index]));
            }
            else if(index<this.setLetters.length+this.setAriphmetics.length-1){
                let t = index-this.setLetters.length;
                if(!UserSettings.exArphm)
                    resArr.push(this._randomElement(this.setAriphmetics[t]));
                else
                    resArr.push(this._randomElement(this.setLetters[this._randomInt(0, this.setLetters.length)]));
            }
            if(index>=this.setLetters.length+this.setAriphmetics.length-1){
                let t = this._randomElement(this.setLetters[this._randomInt(0, this.setLetters.length)]);
                if(!UserSettings.exPuncts){
                    resArr.push(t.concat(this._randomElement(this.setPuctuations)));
                }
            }
            if(!UserSettings.exOther && lvl>=this.levelsCount){
                for(let i=0;i<4;i++)
                    resArr.push(this._randomElement(this.setOther));
            }
        }
        if (!UserSettings.exCapital) {
            resArr = resArr.map((str) => str.replace(str[0], str[0].toUpperCase()));
        }
        this._mix(resArr);
        return resArr.join(" ");
    }
    _mix(arr){
        for(let i=0;i<arr.length;i++){
            let r = this._randomInt(i, arr.length);
            let t = arr[i];
            arr[i] = arr[r];
            arr[r]=t;
        }
    }
    _createSetFrom(arr, index = 0) {
        let res = [];
        let temp = arr[index];
        res.push(this._randomElement(temp));
        return res;
    }
    _randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    _randomInt(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }
}

class LineSetQWERTYRandom extends LineSetBase{
    get levelsCount() {
        return 1;
    }
    getLevelRiseCondition(lvl) {
        return 5;
    }
    getLine(lvl) {
        return "random stub";
    }
}

class LineSetQWERTYWords extends LineSetBase{
    get levelsCount() {
        return 1;
    }
    getLevelRiseCondition(lvl) {
        return 5;
    }
    getLine(lvl) {
        return "words stub";
    }
}

class LineSetQWERTYTexts extends LineSetBase{
    get levelsCount() {
        return 1;
    }
    getLevelRiseCondition(lvl) {
        return 5;
    }
    getLine(lvl) {
        return "texsts stub";
    }
}