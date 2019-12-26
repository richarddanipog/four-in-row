import React from 'react';


const Cell = ({ value, columnIndex, playMove}) => {
    let color = 'white';
    if (value === 1) {
        color = 'red';
    } else if (value === 2) {
        color = 'yellow';
    }

    return (
        <div className={'cell-wrapper'}>
            <span className={`cell ${color}`} onClick={() => playMove(columnIndex)}>
            </span>
        </div>
    );
};


export default Cell