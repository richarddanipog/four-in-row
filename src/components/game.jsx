import React, { Component } from 'react';
import Row from './row';
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
            matrix: [],
        }
    }

    componentDidMount() {
        this.setBoard(rowInput, colInput);
        this.setNumOfPlayers(numOfPlayers);
    };

    setBoard = (inputRows, inputColumns) => {
        const m = board.initBoard(inputRows, inputColumns);
        this.setState({
            matrix: m
        })
    };

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
    };

    toggleCurrentPlayer = () => {
        if (!this.currentPlayer) {
            this.setState({
                currentPlayer: this.state.player1
            })
        } else
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
        console.log('i played', colIndex)
        if (colIndex === -1) {
            colIndex = this.state.currentPlayer.move()
        }

        board.move(colIndex, 1);
        console.log("f", board.getMatrix())
        if (board.doWeHaveAWinner()) {
            this.toggleCurrentPlayer()
        }
    }
    render() {
        return (
            <div className="App">
                <h2>Current Player: {this.state.currentPlayer === null ? 'loading' : this.state.currentPlayer.name}</h2>
                <h1>Connect 4</h1>
                <h2>ROW : {rowInput}</h2>
                <h2>COL : {colInput}</h2>
                {this.state.matix === [] ? 'LOADING' : this.state.matrix.map((row, i) => <Row key={i} row={row} playMove={this.playMove}/>)}
            </div>
        );
    }
}


export default Game;