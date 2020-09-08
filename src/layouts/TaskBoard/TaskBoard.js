import React from 'react';
import {useParams} from 'react-router-dom';
import {generate} from 'shortid';
import Column from '../../containers/Column';
import withAuth from '../../HOC';

const TaskBoard = () => {
  let params = useParams();

  const columnNames = ['To Do', 'In Progress', 'Done'];
  return (
    <div className='board'>
      <h2 className='board__title'>{params.projectName}</h2>
      <div className="board__content">      
        {columnNames.map(name => {
            let uid = generate();
            return (
              <Column key={uid} statusTask={name}/>
            )
          })}
      </div>
    </div>
  );
};

export default withAuth(TaskBoard);