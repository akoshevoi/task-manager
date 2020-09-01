import React from 'react';
import {useSelector} from 'react-redux';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import CardName from '../CardName/CardName';

const Column = ({name}) => {
  const tasks = useSelector(state => state);
  
  return (
    <div className='column'>
      <h3 className='column__title'>{name}</h3>
      <AddTaskButton name={name}/>
      {tasks.map(task => (
        task.status === name
        ? <CardName key={task} task={task}/>
        : null
      ))}
    </div>
  );
};

export default Column;