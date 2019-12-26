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

let numOfPlayers = parseInt(prompt('Enter 1 if you want to play versus pc, else enter 2 :'))

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
            matrix: [],
            gameOver: false
        }
        this.playMove = this.playMove.bind(this);
    };

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
        if (numOfPlayers === 1) {
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
        if (!this.state.currentPlayer) {
            this.setState({
                currentPlayer: this.state.player1
            });
        } else if (this.state.currentPlayer.value === 1) {
            this.setState({
                currentPlayer: this.state.player2
            });
        } else if (this.state.currentPlayer.value === 2) {
            this.setState({
                currentPlayer: this.state.player1
            });
        }
    };

    playMove(colIndex = -1) {
        // if(board.checkDraw){
        //     console.log("DRAW!!");
        //     return 
        // }
        const { currentPlayer } = this.state;

        if (colIndex === -1) {
            colIndex = this.state.currentPlayer.move()
        }
        board.move(colIndex, currentPlayer.value)
        console.log("Board ", board.getMatrix())
        if(board.doWeHaveAWinner(this.state.matrix,rowInput, colInput )){
            this.setState({
                gameOver: true
            })
        } else {
            this.toggleCurrentPlayer() 
        }
    };



    render() { 
        console.log("I WAS HERE")
        return (
            <div className="App">
                <h2>Current Player: {this.state.currentPlayer === null ? 'loading' : this.state.currentPlayer.name}</h2>
                <span>Row : {rowInput}</span>
                <span> Col : {colInput}</span>
                <span className={'board'}>
                    {this.state.matrix === [] ? 'LOADING' : this.state.matrix.map((row, i) => <Row key={i} row={row} playMove={this.playMove} />)}
                </span>

            </div>
        );
    }
}


export default Game;