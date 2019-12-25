import React, { Component } from 'react';
import Cell from './cell';
const Player = require('./players');
const board = require('./board');

let rowInput, colInput;

do {
  rowInput = prompt('Choose row number :')
} while (rowInput < 4);


do {
  colInput = prompt('Choose colunm number :')
} while (colInput < 4);


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
        }
    }
    setBoard(inputRows, inputColumns) {
        board.initBoard(inputRows, inputColumns);
    }
    setNumOfPlayers(numOfPlayers) {

    }
    // playMove() {
    //     let colIndex = currentPlayer.move()
    //     do {
    //         colIndex = currentPlayer.move()                         // We ask currentPlayer to choose column. 
    //     } while (!board.move(colIndex, currentPlayer.color))        // If the column is full choose another one.



    // }
    // togglePlayer = () => {
    //     this.setState({
    //         currentPlayer:this.state.currentPlayer == 1 ? this.state.player2 : this.state.player1,
    //     })
    // }

    render() {
        const board = [];
        this.setBoard(rowInput,colInput);
        for (let r = 0; r < rowInput; r++) {
          const row = [];
          for (let c = 0; c < colInput; c++) {
            row.push(<Cell r={r} c={c}/>)
          }
          board.push(<div>{row}</div>)
        }
        return (
          <div className="App">
    
            <h1>Connect 4</h1>
            <h2>ROW : {rowInput}</h2>
            <h2>COL : {colInput}</h2>
            {board}
          </div>
        );
    }
}


export default Game;