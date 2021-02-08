class QuestProvider {
    constructor(lvl){
        this.lvl=lvl?lvl:0;
    }
    onLineEntered(stat){
        stat.time;
        stat.count;
        this.lvl++;
    }
    resetLvl(){
        this.lvl = 0;
    }
    getLine() {
        let arr = [,
            "ff jj",
            "gg hh",
            "fg hj",
            "dk kd fd jk gk hd"
        ];
       return arr[this.lvl<arr.length?this.lvl:arr.length-1];
    }
}