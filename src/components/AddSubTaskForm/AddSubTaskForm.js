import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {checkRepeatingProjectName} from '../../utils/helpers';

const AddSubTaskForm = ({
  updateTasksArray,
  calculateProgressBarLength,
  currentTask,
  projects,
  dispatchActionAddSubTaskToTask,
  projectId
}) => {
  const [subTaskName, setSubTaskName] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSubTaskName(value);
  };

  const handleSubmit = async event => {
    if (!subTaskName.length){
      return;
    }

    event.preventDefault();
    
    const conditionSubmitForm = checkRepeatingProjectName(currentTask.subTasks, subTaskName);

    if (!conditionSubmitForm) {
      const subTask = {name: subTaskName, done:false}
      dispatchActionAddSubTaskToTask(currentTask, subTask);
      calculateProgressBarLength();
    }
    setSubTaskName('');
  };
  
  return (
    <form onSubmit={handleSubmit} className='add-task-form__form'>
      <TextField 
        label='Add SubTask' 
        name='subTaskName'
        value={subTaskName}
        onChange={handleChange}
        variant='filled'
        className='add-task-form__input'
        />
      <Button variant='contained' color='primary' type='submit'>
        Add SubTask
      </Button>
  </form> 
  );
};

export default AddSubTaskForm;