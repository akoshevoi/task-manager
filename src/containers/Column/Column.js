import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';
import {useParams} from 'react-router-dom';
import {generate} from 'shortid';
import AddTaskForm from '../../components/AddTaskForm';
import TaskName from '../TaskName';
import TaskDetail from '../TaskDetail';

const Column = ({statusTask}) => {
  let params = useParams();

  useSelector(state => state.projects);
  const taskList = useSelector(state => {
    const projects = state.projects;
    const project = projects.find(project => project.name === params.projectName);
    return project.tasks.taskList;
  });

  const dispatch = useDispatch();

  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  const dispatchAction = (...args) => {
    dispatch(addingTask(...args))
  }  

  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        statusTask={statusTask} 
        projectName={params.projectName} 
        dispatchAction={dispatchAction}
      />
       {taskList && taskList.map(task => {
        let uid = generate();   
        return (
          task.status === statusTask
          ? <TaskName 
              key={uid} 
              task={task} 
              statusTask={statusTask} 
              projectName={params.projectName} 
            />
          : null
        )
      })} 
      <TaskDetail 
        currentTask={currentTask} 
        isShow={isShow} 
        projectName={params.projectName} 
      />
    </div>
  )
};

export default Column;