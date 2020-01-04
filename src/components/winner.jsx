import React, { Component } from 'react';
import{Link} from 'react-router-dom';

class Winner extends Component {
    render() {
        const { winner } = this.props;
        return (
            <div className={'win-wrapper'}>
                <div className={'win'}>
                    <h1>{winner}<br /> WINS!</h1>
                </div>
                <div className={'mt-5'}>
                    <Link to="/game-mode">NEW GAME</Link>
                </div>
            </div>
        );
    }
}

export default Winner;