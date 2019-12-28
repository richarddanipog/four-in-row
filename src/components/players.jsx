
class Player{
    constructor(color, name, value){
        this.color = color;
        this.name = name;
        this.value = value;
        this.wins = 0
    }
    move(){}
}

class PC extends Player{
    constructor(colIndex){
        super();
        this.color = "blue";
        this.name = "computer";
        this.colIndex = colIndex;
        this.value = 2
        this.wins = 0
    }
    move(){
        let randomColIndex = Math.floor((Math.random()*this.colIndex))
        return randomColIndex
    }
}

module.exports = {Player, PC};