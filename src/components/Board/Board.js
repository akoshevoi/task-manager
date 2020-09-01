import React from 'react';
import Column from '../Column/Column';
import {generate} from 'shortid';

const Board = () => {
  const columnNames = ['To Do', 'In Progress', 'Done'];
  return (
    <div className='board'>
      {columnNames.map(name => {
        let uid = generate();
        return (
          <Column key={uid} name={name}/>
        )
        })}
    </div>
  );
};

export default Board;