import React from 'react';
import {generate} from 'shortid';
import Column from '../Column/Column';

const Board = () => {
  const columnNames = ['To Do', 'In Progress', 'Done'];
  return (
    <div className='board'>
      {columnNames.map(name => {
        let uid = generate();
        return (
          <Column key={uid} statusTask={name}/>
        )
        })}
    </div>
  );
};

export default Board;