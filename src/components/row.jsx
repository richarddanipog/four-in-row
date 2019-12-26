import React from 'react';
import  Cell  from './cell';


const Row = ({row,playMove}) => {
    return (
        <div className={'row'}>
            {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} playMove={playMove}/>)}
        </div>
    );
};
export default Row;