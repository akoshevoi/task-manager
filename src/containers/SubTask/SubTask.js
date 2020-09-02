import React from 'react';
import {useDispatch} from 'react-redux';
import {changingStatusSubTask} from '../../redux/actions/actions';

const SubTask = ({task, currentTask, calculateProgressBarLength}) => {
  const dispatch = useDispatch();

  const handleChangeCheckbox = event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    dispatch(changingStatusSubTask(currentTask, nameCheckbox, isCheckedCheckbox));
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