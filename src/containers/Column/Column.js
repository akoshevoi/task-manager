import React, {useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {generate} from 'shortid';
import AddTaskForm from '../AddTaskForm';
import TaskName from '../TaskName';
import TaskDetail from '../TaskDetail';
import {
  useParams,
} from 'react-router-dom';

const Column = ({statusTask}) => {
  let params = useParams();
  
  const taskList = useSelector(state => {
    const projects = state.projects;
    const project = projects.find(project => project.name === params.projectName);
    return project.tasks.taskList;
  });

  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm statusTask={statusTask} projectName={params.projectName} />
       {taskList && taskList.map(task => {
        let uid = generate();     
        return (
          task.status === statusTask
          ? <TaskName key={uid} task={task} statusTask={statusTask} projectName={params.projectName} />
          : null
        )
      })} 
      <TaskDetail currentTask={currentTask} isShow={isShow} projectName={params.projectName} />
    </div>
  )
};

export default Column;