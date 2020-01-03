import React, { Component } from 'react';
import '../style/choose-mode.css';
import {Link} from 'react-router-dom';

class GameMode extends Component {   
    render() {
        console.log(this.props)
        return (
            <div className={'game-mode'}>
                <div>
                    <h1>Choose Game Mode</h1>
                </div>
                <form className={'choose-player radio-toolbar'}>
                    <div>
                    <input type="radio" id="radio-players" name="player" value="all" />
                        <label for="radio-players">1 VS. 1</label>

                        <input type="radio" id="radio-single" name="player" value="false" />
                        <label for="radio-single">1 VS. COMPUTER</label>
                    </div>
                    <div class="radio-toolbar">
                        <input type="radio" id="radio1" name="board" value="all" />
                        <label for="radio1">7 cols × 6 rows</label>

                        <input type="radio" id="radio2" name="board" value="false" />
                        <label for="radio2">5 cols × 4 rows</label>

                        <input type="radio" id="radio3" name="board" value="true" />
                        <label for="radio3">8 cols × 7 rows</label>
                    </div>
                </form>
                <Link to={'/game'} className={'start position-absolute'} >
                        Let's Begin
                </Link>
            </div>
        );
    }
}

export default GameMode;