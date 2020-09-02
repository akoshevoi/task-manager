import React from 'react';
import {useSelector} from 'react-redux';
import {generate} from 'shortid';
import {addingTask} from '../../redux/actions/actions';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TaskName from '../TaskName/TaskName';
import TaskDetail from '../TaskDetail/TaskDetail';

const Column = ({statusTask}) => {
  const tasks = useSelector(state => state.tasks);
  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        action={addingTask} 
        statusTask={statusTask} 
      />
      {tasks && tasks.map(task => {
        let uid = generate();      
        return (
          task.status === statusTask
          ? <TaskName key={uid} task={task} statusTask={statusTask} />
          : null
        )
      })}
      <TaskDetail currentTask={currentTask} isShow={isShow} />
    </div>
  )
};

export default Column;