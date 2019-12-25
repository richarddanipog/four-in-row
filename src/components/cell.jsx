import React from 'react';


const Cell = ({ value, columnIndex, playMove}) => {
    console.log("gggggg")
    let color = 'white';
    if (value == 1) {
        color = 'red';
    } else if (value === 2) {
        color = 'yellow';
    }

    return (
        <td>
            <div className={"cell"} onClick={() => playMove(columnIndex)}>
                <div className={color}>ss</div>
            </div>
        </td>
    );
};


export default Cell