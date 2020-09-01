import React from 'react';
import {useSelector} from 'react-redux';
import {generate} from 'shortid';
import {addingTask} from '../../redux/actions/actions';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import CardName from '../CardName/CardName';

const Column = ({statusTask}) => {
  const tasks = useSelector(state => state.tasks);

  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        action={addingTask} 
        statusTask={statusTask} 
        //payload={{name: 'task1', status: 'to do'}}
      />
      {tasks && tasks.map(task => {
        let uid = generate();      
        return (
          task.status === statusTask
          ? <CardName key={uid} task={task} statusTask={statusTask} id={task.name}/>
          : null
        )
      })}
    </div>
  )
};

export default Column;