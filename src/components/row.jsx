import React, { Component } from 'react';
import  Cell  from './cell';


const Row = ({row,playMove}) => {
    return (
        <tr>
            {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} playMove={playMove} />)}
        </tr>
    );
};
export default Row ;