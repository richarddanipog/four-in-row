import React, { Component } from 'react';
import '../style/choose-mode.css';
import { Link } from 'react-router-dom';
import { getPlayers, getColsAndRows, getBestOfHowManyGames } from './game'


class GameMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: 0
        }
    }

    handleChange = () => {
        this.setState({ check: this.state.check + 1 })
    }
    render() {
        return (
            <div className={'game-mode'}>
                <div className={'mt-3'}>
                    <h1>Choose Game Mode</h1>
                </div>
                <form className={'choose-player radio-toolbar'}>
                    <div>
                        <input type="radio" id="radio-players" name="player" onChange={this.handleChange} />
                        <label onClick={() => getPlayers(2)} for="radio-players">
                            <i className="fas fa-user" /> VS. <i className="fas fa-user" /></label>

                        <input type="radio" id="radio-single" name="player" onChange={this.handleChange} />
                        <label onClick={() => getPlayers(1)} for="radio-single"><i className="fas fa-user" /> VS. <i className="fas fa-robot" /></label>
                    </div>
                    <div className="radio-toolbar">
                        <input type="radio" id="radio1" name="board" onChange={this.handleChange} />
                        <label onClick={() => getColsAndRows(7, 6)} for="radio1">7 cols × 6 rows</label>

                        <input type="radio" id="radio2" name="board" value="false" onChange={this.handleChange} />
                        <label onClick={() => getColsAndRows(5, 4)} for="radio2">5 cols × 4 rows</label>

                        <input type="radio" id="radio3" name="board" value="true" onChange={this.handleChange} />
                        <label onClick={() => getColsAndRows(8, 7)} for="radio3">8 cols × 7 rows</label>
                    </div>
                    <div className="radio-toolbar">
                        <input type="radio" id="game1" name="numOfGames" value="all" onChange={this.handleChange} />
                        <label onClick={() => getBestOfHowManyGames(1)} for="game1">Single Game</label>

                        <input type="radio" id="game2" name="numOfGames" value="false" onChange={this.handleChange} />
                        <label onClick={() => getBestOfHowManyGames(3)} for="game2">Best of 3</label>

                        <input type="radio" id="game3" name="numOfGames" value="true" onChange={this.handleChange} />
                        <label onClick={() => getBestOfHowManyGames(5)} for="game3">Best of 5</label>
                    </div>
                </form>
                {this.state.check >= 3 && <Link to={'/game'} className={'start position-absolute'} >
                    Let's Begin
                </Link>}
            </div>
        );
    }
}

export default GameMode;