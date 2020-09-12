import React, {useEffect} from 'react';

const SubTask = ({
  task, 
  currentTask, 
  projects,
  calculateProgressBarLength,
  updateTasksArray,
  dispatchActionChangeStatusSubTask
}) => {
  const handleChangeCheckbox = async event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    dispatchActionChangeStatusSubTask(currentTask, nameCheckbox, isCheckedCheckbox);
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