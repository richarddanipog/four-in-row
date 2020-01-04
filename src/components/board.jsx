class Board {
    constructor() {
        this.matrixBoard = [];
    }
    getMatrix = () => {
        return this.matrixBoard
    }
    
    initBoard = (rowInput, colInput) => {
        this.matrixBoard = [];
        for (let row = 0; row < rowInput; row++) {
            let matrixRow = []
            for (let col = 0; col < colInput; col++) {
                matrixRow.push(null)
            }
            this.matrixBoard.push(matrixRow);
        }
        return this.matrixBoard
    }

    move = (colIndex, playerValue) => {
        const board = this.matrixBoard
        for (let row = board.length - 1; row >= 0; row--) {
            if (!(board[row][colIndex])) {
                board[row][colIndex] = playerValue;
                return board[row][colIndex]
            }
        } return false
    }

    moveBack = (colIndex) => {
        const board = this.matrixBoard
        for (let row = 0; row < board.length; row++) {
            if ((board[row][colIndex])) {
                board[row][colIndex] = 0;
                console.log(this.board)
                return board[row][colIndex]
            }
    }}
    
    checkDraw = (board, row, col) => {
        let counter = 0;

        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c] !== null) {
                    counter++;
                }
            }
        } if (counter === row*col){
            console.log(counter)
            return true
        } counter = 0;
         return false
    }
    checkVertical = (board, row, col) => {
        // Check only if row is 3 or greater
        for (let r = 3; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c] &&
                        board[r][c] === board[r - 2][c] &&
                        board[r][c] === board[r - 3][c]) {
                        return true;
                    }
                }
            }
        } return false;
    }

    checkHorizontal = (board, row, col) => {
        // Check only if column is 3 or less
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r][c + 1] &&
                        board[r][c] === board[r][c + 2] &&
                        board[r][c] === board[r][c + 3]) {
                        return true;
                    }
                }
            }
        } return false;
    }

    checkDiagonalRight = (board, row, col) => {
        // Check only if row is 3 or greater AND column is 3 or less
        for (let r = 3; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c + 1] &&
                        board[r][c] === board[r - 2][c + 2] &&
                        board[r][c] === board[r - 3][c + 3]) {
                        return true;
                    }
                }
            }
        } return false;
    }

    checkDiagonalLeft = (board, row, col) => {
        // Check only if row is 3 or greater AND column is 3 or greater
        for (let r = 3; r < row; r++) {
            for (let c = 3; c < col; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c - 1] &&
                        board[r][c] === board[r - 2][c - 2] &&
                        board[r][c] === board[r - 3][c - 3]) {
                        return true;
                    }
                }
            }
        } return false;
    }
    doWeHaveAWinner = (board, row, col) => {
        return this.checkVertical(board, row, col) || this.checkHorizontal(board, row, col) ||
            this.checkDiagonalRight(board, row, col) || this.checkDiagonalLeft(board, row, col)
    }
}


module.exports = new Board();

