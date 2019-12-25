import React, { Component } from 'react';

class Cell extends Component {
    render() {
        return (
        <div className={'cell'}>{this.props.r},{this.props.c}</div>
        );
    }
}

export default Cell;