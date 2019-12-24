import React, { Component } from 'react';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrixBoard =[]
        }
    }
    initBoard = (rowInput, colInput) => {
        for (let row = 0; row < rowInput; row++) {
            let matrixRow = []
            for (let col = 0; col < colInput; col++) {
                matrixBoard.push(null)
            }
            this.state.matrixBoard.push(matrixRow);
        }
        return this.state.matrixBoard
    }

    makeAMove = (colorIndex,playerColor) =>{
        
    }

    doWeHaveAWinner = () => {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Board;