import React, {useEffect} from 'react';
//import {changeStatusSubTaskInDB} from '../../api/projects';

const SubTask = ({
  task, 
  currentTask, 
  projects,
  calculateProgressBarLength,
  updateTasksArray,
  changeStatusSubTask
}) => {
  const handleChangeCheckbox = async event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    changeStatusSubTask(currentTask, nameCheckbox, isCheckedCheckbox);
    //await changeStatusSubTaskInDB(projects.activeProject, currentTask.name, nameCheckbox, isCheckedCheckbox);
    updateTasksArray();
  }

  useEffect(() => {
    calculateProgressBarLength(currentTask.subTasks);
  })

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