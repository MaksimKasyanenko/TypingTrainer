class InfoDisplay{
    showLvl(lvl){
        document.getElementById("lvlDisp").textContent= parseInt(lvl)+1;
    }
    showSpeed(speed){
        document.getElementById("speedDisp").textContent = speed.toFixed(3) + " сим/мин";
    }
}