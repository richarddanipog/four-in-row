import React, { Component } from 'react';
import Row from './row';
import Winner from './winner';


const Player = require('./players').Player;
const PC = require('./players').PC;
const board = require('./board');



let rowInput, colInput, bestOfHowManyGames, numOfPlayers, winsToAchieve;
export const getPlayers = (numOfPlayers1) => {
    numOfPlayers = numOfPlayers1
    return numOfPlayers
}
export const getColsAndRows = (cols, rows) => {
    colInput = cols;
    rowInput = rows;
    return colInput, rowInput
}
export const getBestOfHowManyGames = (numberOfHowManyGames) => {
    bestOfHowManyGames = numberOfHowManyGames
    winsToAchieve = bestOfHowManyGames / 2 + 0.5;
    return bestOfHowManyGames, winsToAchieve
}


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: null,
            player2: null,
            currentPlayer: null,
            matrix: [],
            roundOver: false,
            gameOver: false,
            lastMoveOfPlayer1: null,
            lastMoveOfPlayer2: null
        }
        this.playMove = this.playMove.bind(this);
    };


    moveBack = () => {
        if (this.state.currentPlayer.name == "player1" && numOfPlayers == 2) {
            board.moveBack(this.state.lastMoveOfPlayer2);
            const m = board.getMatrix();
            this.setState({
                matrix: m
            })
            this.toggleCurrentPlayer()
        } else if (this.state.currentPlayer.name == "player2" && numOfPlayers == 2) {
            board.moveBack(this.state.lastMoveOfPlayer1);
            const m = board.getMatrix();
            this.setState({
                matrix: m
            })
        } else if (this.state.currentPlayer.name == "player1" && numOfPlayers == 1) {
            board.moveBack(this.state.lastMoveOfPlayer2);
            board.moveBack(this.state.lastMoveOfPlayer1);
            const m = board.getMatrix();
            this.setState({
                matrix: m
            })
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
        if (numOfPlayers === 1) {
            this.setState({
                player1: new Player("red", "player1", 1),
                player2: new PC(colInput)
            }, () => { this.toggleCurrentPlayer(); console.log(this.state.player1.name, this.state.player2.name) })
        } else if (numOfPlayers === 2) {
            this.setState({
                player1: new Player("red", "player1", 1),
                player2: new Player("blue", "player2", 2)
            }, () => { this.toggleCurrentPlayer(); console.log(this.state.player1.name, this.state.player2.name) })
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
            if (currentPlayer.name == "player1") {
                this.setState({
                    lastMoveOfPlayer1: colIndex
                })
            }
            if (currentPlayer.name == "player2") {
                this.setState({
                    lastMoveOfPlayer2: colIndex
                })
            }
            if (colIndex === -1) {
                colIndex = currentPlayer.move();

                this.setState({
                    lastMoveOfPlayer2: colIndex
                })
            }

            let didMove = board.move(colIndex, currentPlayer.value);
            console.log(didMove)
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
                }, () => setTimeout(() => { this.setBoard(rowInput, colInput); this.setState({ draw: false }) }, 2000))
            } else if (didMove) {
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
            setTimeout(() => {
                this.setBoard(rowInput, colInput);
                this.setState({
                    roundOver: false
                }, () => {
                    if (this.state.currentPlayer.name === "computer") {
                        setTimeout(() => this.playMove())
                    }
                })
            }, 2000)
        }
    }

    render() {
        const { player1, player2, currentPlayer, draw, matrix, gameOver } = this.state;
        return (
            <div className="row m-0 text-center">
                {gameOver && <Winner winner={currentPlayer.name} />}
                <div className={'details'}>
                    <h1 style={{ color: 'orange' }}>LET'S PLAY!</h1>
                    {player1 && <label className={'player'}>{player1.name} : {player1.wins}</label>}
                    {player2 && <label className={'player'}>{player2.name} : {player2.wins}</label>}
                    <h4>Best Of {bestOfHowManyGames}</h4>
                    <hr />
                    <div className={'current-player'}>Current Player : {currentPlayer && currentPlayer.name}</div>
                    <div className={'move-back'}>
                        <a href="#" className={"btn btn-white btn-animateds"} onClick={() => this.moveBack()}>Undo</a>
                    </div>
                    {draw && <h1 className={'winner'}>DRAW!</h1>}
                </div>
                <div className={'board'}>
                    {matrix && matrix.map((row, i) => <Row key={i} row={row} playMove={this.playMove} />)}
                </div>
            </div>
        );
    }
}

export default Game;

