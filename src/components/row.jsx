import React from 'react';
import  Cell  from './cell';


const Row = ({row,playMove}) => {
    return (
        <td className={'row'}>
            {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} playMove={playMove}/>)}
        </td>
    );
};
export default Row;