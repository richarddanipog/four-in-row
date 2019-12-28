import React, { Component } from 'react';

class Winner extends Component {
    render() {
        const { winner } = this.props;
        return (
            <div className={'win-wrapper'}>
                <div className={'win'}>
                    <h1>{winner}<br /> WINS!</h1>
                </div>
                <div className={'mt-5'}>
                    <a href="/">NEW GAME</a>
                </div>
            </div>
        );
    }
}

export default Winner;