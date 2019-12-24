import React, { Component } from 'react';
const Player = require('./players');
const board  = require('./board');


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
        }
    }
    setBoard(inputRows, inputColumns){
        board.initBoard(inputRows, inputColumns);
    }
    setNumOfPlayers(numOfPlayers){

    }
    playMove(){
        let colIndex = currentPlayer.move()
        do{
            colIndex = currentPlayer.move()                     // We ask currentPlayer to choose column. 
        } while (!board.move(colIndex, currentPlayer.color))        // If the column is full choose another one.
        
        
        
    }
    // togglePlayer = () => {
    //     this.setState({
    //         currentPlayer:this.state.currentPlayer == 1 ? this.state.player2 : this.state.player1,
    //     })
    // }
    
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Game;