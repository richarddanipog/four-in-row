import React, { Component } from 'react';
import  Cell  from './cell';


const Row = ({row}) => {
    return (
        <tr>
            {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i}  />)}
        </tr>
    );
};
export default Row ;