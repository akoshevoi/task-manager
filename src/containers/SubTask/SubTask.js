import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changingStatusSubTask} from '../../redux/actions/projects';
import {changeStatusSubTaskInDB} from '../../api/projects';

const SubTask = ({
  task, 
  currentTask, 
  projectName, 
  calculateProgressBarLength
}) => {
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  console.log(task);
  

  const handleChangeCheckbox = event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    //changeStatusSubTaskInDB(projects.activeProject, currentTask.name, )
    /*
    dispatch(changingStatusSubTask(
      projectName, currentTask, nameCheckbox, isCheckedCheckbox
    ));
    */
    calculateProgressBarLength();
  }
  return (
    <div className='sub-task'>
      <input 
        checked={task.done} 
        type='checkbox' 
        name={task.name} 
        onChange={handleChangeCheckbox}
        className='sub-task__checkbox'
      />
      <label className='sub-task__label'>{task.name}</label>
    </div>
  );
};

export default SubTask;