class Board {
    constructor() {
        this.matrixBoard = [];
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

    move = (colorIndex, playerColor) => {
        const board = this.state.matrixBoard
        for (let row = board.length - 1; row >= 0; row--) {
            if (!(board[row][colorIndex])) {
                board[row][colorIndex] = playerColor;
            } else {
                return alert('You can\'t play this move, try somthing else.');
            }
        }
        return board[row][colorIndex]
    }

    doWeHaveAWinner = () => {

    }
}

module.exports = new Board();