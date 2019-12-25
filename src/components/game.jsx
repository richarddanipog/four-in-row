import React, { Component } from 'react';
import Cell from './cell';
const Player = require('./players').Player;
const PC = require('./players').PC;
const board = require('./board');

let rowInput, colInput;

do {
    rowInput = prompt('Choose row number :')
} while (rowInput < 4);


do {
    colInput = prompt('Choose colunm number :')
} while (colInput < 4);

let numOfPlayers = prompt('Enter 1 if you want to play versus pc, else enter 2 :')

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
        }
    }
    componentDidMount() {
        this.setBoard(rowInput, colInput);
        this.setNumOfPlayers(numOfPlayers);
    }
    setBoard(inputRows, inputColumns) {
        board.initBoard(inputRows, inputColumns);
    }
    setNumOfPlayers = (numOfPlayers) => {
        if (numOfPlayers == 1) {
            this.setState({
                player1: new Player("red", "player1", 1),
                player2: new PC(colInput)
            }, () => this.toggleCurrentPlayer())
        } else {
            this.setState({
                player1: new Player("red", "player1", 1),
                player2: new Player("blue", "player2", 2)
            })
        }
    }
    toggleCurrentPlayer = () => {
        if (this.currentPlayer.value == 1) {
            this.setState({
                currentPlayer: this.state.player2
            })
        } else {
            this.setState({
                currentPlayer: this.state.player1
            })
        }
    }
    playMove(colIndex = -1) {
        if (board.checkDraw) {
            return 'draw'
        }
        if (colIndex === -1) {
            colIndex = this.state.currentPlayer.move()
        }
        board.move(colIndex, this.state.currentPlayer.value)
        if (board.doWeHaveAWinner()) {
            this.toggleCurrentPlayer()
        }
    }
    render() {
        const board = [];
        console.log(this.state.player1)
        console.log(this.state.player2)
        console.log(this.state.currentPlayer)
        for (let r = 0; r < rowInput; r++) {
            const row = [];
            for (let c = 0; c < colInput; c++) {
                row.push(<Cell r={r} c={c} />)
            }
            board.push(<div>{row}</div>)
        }
        return (
            <div className="App">
                <h2>Current Player: {this.state.currentPlayer === null ? 'loading' : this.state.currentPlayer.name}</h2>
                <h1>Connect 4</h1>
                <h2>ROW : {rowInput}</h2>
                <h2>COL : {colInput}</h2>
                {board}
            </div>
        );
    }
}


export default Game;