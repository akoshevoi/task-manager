import React, {useEffect} from 'react';

const SubTask = ({
  task, 
  latestTask,
  projects,
  calculateProgressBarLength,
  updateTasksArray,
  dispatchActionChangeStatusSubTask
}) => {
  const handleChangeCheckbox = event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    dispatchActionChangeStatusSubTask(latestTask, nameCheckbox, isCheckedCheckbox);
  }

  useEffect(() => {
    calculateProgressBarLength(latestTask.subTasks.subTasksList);
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