class InfoDisplay{
    showLvl(lvl){
        document.getElementById("lvlDisp").textContent=lvl;
    }
    showSpeed(speed){
        document.getElementById("speedDisp").textContent = speed.toFixed(3) + " сим/мин";
    }
}