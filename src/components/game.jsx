import React, { Component } from 'react';
import Row from './row';
import Winner from './winner';
const Player = require('./players').Player;
const PC = require('./players').PC;
const board = require('./board');

let rowInput, colInput, bestOfHowManyGames;

do {
    rowInput = parseInt(prompt('Choose row number :'));
} while (rowInput < 4 || isNaN(rowInput));


do {
    colInput = parseInt(prompt('Choose colunm number :'));
} while (colInput < 4 || isNaN(colInput));

do {
    bestOfHowManyGames = parseInt(prompt('Best of how many games? :'));
} while (bestOfHowManyGames < 0 || isNaN(colInput) || bestOfHowManyGames % 2 === 0);

const winsToAchieve = bestOfHowManyGames / 2 + 0.5;


let numOfPlayers = parseInt(prompt('Enter 1 if you want to play versus pc, else enter 2 :'))

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
            matrix: [],
            roundOver: false,
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
            }, () => {
                if (this.state.currentPlayer.name === "computer") {
                    this.playMove()
                }
            });
        } else if (this.state.currentPlayer.value === 2) {
            this.setState({
                currentPlayer: this.state.player1
            });
        }

    };
    playMove(colIndex = -1) {
        if (!this.state.roundOver && !this.state.gameOver) {
            const { currentPlayer } = this.state;
            if (colIndex === -1) {
                colIndex = this.state.currentPlayer.move()
            }
            if (board.checkDraw(this.state.matrix, rowInput, colInput, 0) && this.state.gameOver === false) {
                
                console.log(this.state.matrix)
                console.log("DRAW!!");
            }
            let didMove = board.move(colIndex, currentPlayer.value);
            console.log("Board ", board.getMatrix())
            if (board.doWeHaveAWinner(this.state.matrix, rowInput, colInput)) {
                this.state.currentPlayer.wins++
                this.setState({
                    roundOver: true
                }, () => this.checkWinnerOfTournament())


            } else if (this.state.currentPlayer.name === "computer" && !didMove && !this.state.roundOver) {
                this.playMove()
            } else if (board.checkDraw(this.state.matrix, rowInput, colInput, 0)) {
                this.setState({
                    draw: true
                },() => setTimeout(() => {this.setBoard(rowInput, colInput); this.setState({draw: false})}, 2000))
            }
            else {
                this.toggleCurrentPlayer()
            }
        }
    };
    checkWinnerOfTournament = () => {
        if (this.state.player1.wins === winsToAchieve) {
            this.setState({
                gameOver: true
            })
        } else if (this.state.player2.wins === winsToAchieve) {
            this.setState({
                gameOver: true
            })
        } else {
            setTimeout(() => this.setBoard(rowInput, colInput), 2000)
            this.setState({
                roundOver: false
            }, () => {
                console.log("roundOver", this.state.roundOver);
                if (this.state.currentPlayer.name === "computer") {
                    setTimeout(() => this.playMove(), 2500)
                }
            })
        }
    }

    render() {
        const { player1, player2, currentPlayer, draw, roundOver, matrix } = this.state;
        return (
            <div className="App row m-0">
                {roundOver && <Winner winner={currentPlayer.name} />}
                <div className={'col-6 mt-4'}>
                    <div className={'details'}>
                        <h1>Welcome to Connect Four</h1>
                        {player1 && <p>Best of {bestOfHowManyGames} {player1.name} VS {player2.name} lets GO!<br />POINTS:</p>}
                        {player1 && <label className={'player'}>{player1.name} : {player1.wins}</label>}
                        {player2 && <label className={'ml-5 player'}>{player2.name} : {player2.wins}</label>}
                        {draw && <h1 className={'winner'}>DRAW!</h1>}
                    </div>
                </div>
                <div className={'col-6 mt-4'}>
                    <div className={'board'}>
                        <div>
                            <h2 className={'current-player'}>Current Player:<br/> {currentPlayer && currentPlayer.name}</h2>
                        </div>
                        <div style={{border: '1px solid',width:'400px'}}>
                            {matrix && matrix.map((row, i) => <Row key={i} row={row} playMove={this.playMove} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;