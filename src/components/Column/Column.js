import React from 'react';
import {useSelector} from 'react-redux';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import CardName from '../CardName/CardName';
import {generate} from 'shortid';

const Column = ({name}) => {
  const tasks = useSelector(state => state.tasks);
  console.log(tasks);
  return (
    <div className='column'>
      <h3 className='column__title'>{name}</h3>
      <AddTaskButton name={name}/>
      {tasks && tasks.map(task => {
        let uid = generate();
        return (
          task.status === name
          ? <CardName key={uid} task={task} name={name}/>
          : null
        )
      })}
    </div>
  )
};

export default Column;