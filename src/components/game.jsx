import React, { Component } from 'react';
import Row from './row';
const Player = require('./players').Player;
const PC = require('./players').PC;
const board = require('./board');

let rowInput, colInput;

do {
    rowInput = parseInt(prompt('Choose row number :'));
} while (rowInput < 4 || isNaN(rowInput));


do {

    colInput = parseInt(prompt('Choose colunm number :'));
} while (colInput< 4 || isNaN(colInput));


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
            }, () => this.toggleCurrentPlayer())
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
            }, () => {if (this.state.currentPlayer.name === "computer"){
                setTimeout(this.playMove(), 2000)
            }});
        } else if (this.state.currentPlayer.value === 2) {
            this.setState({
                currentPlayer: this.state.player1
            });
        }
        
    };
    playMove(colIndex = -1) {

        if (!this.state.gameOver) {
            const { currentPlayer } = this.state;
            if (colIndex === -1) {
                colIndex = this.state.currentPlayer.move()
            }
            if (board.checkDraw(this.state.matrix, rowInput, colInput, 0) && this.state.gameOver === false) {
                this.setState({
                    draw: true
                })
                console.log(this.state.matrix)
                console.log("DRAW!!");
        
            }
            let didMove = board.move(colIndex, currentPlayer.value);
            console.log("Board ", board.getMatrix())
            if (board.doWeHaveAWinner(this.state.matrix, rowInput, colInput)) {
                this.setState({
                    gameOver: true
                })
            } else if (this.state.currentPlayer.name === "computer" && !didMove && !this.state.gameOver) {
                this.playMove()
            } else if(board.checkDraw(this.state.matrix, rowInput, colInput, 0)){
                this.setState({
                    draw: true
                })
            }
            else {
                this.toggleCurrentPlayer()
            }
        }
    };

    render() {
        
        return (           
            <div className="App row m-0">
                <div className={'col-6'}>
                    <h1>Welcome to Four In a Row</h1>
                    <h2>Current Player: {this.state.currentPlayer === null ? 'loading' : this.state.currentPlayer.name}</h2>
                    {this.state.draw && <h1 className={'winner'}>DRAW!</h1>}
                    {this.state.gameOver && <h3 className={'winner'}>{this.state.currentPlayer.name} WINS!</h3>}
                </div>
                <div className={'col-6'}>
                    <div className={'board'}>
                        {this.state.matrix === [] ? 'LOADING' : this.state.matrix.map((row, i) => <Row key={i} row={row} playMove={this.playMove} />)}
                    </div>
                </div>

            </div>
        );
    }
}


export default Game;
