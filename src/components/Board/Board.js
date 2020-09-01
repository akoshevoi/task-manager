import React from 'react';
import Column from '../Column/Column';

const Board = () => {
  const columnNames = ['start', 'in progress', 'done'];
  return (
    <div className='board'>
      {columnNames.map(name => (
        <Column key={name} name={name}/>
      ))}
    </div>
  );
};

export default Board;