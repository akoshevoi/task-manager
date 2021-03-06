import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {checkRepeatingProjectName} from '../../utils/helpers';

const AddTaskForm = ({
  user,
  projectId,
  projectName,
  statusTask,
  dispatchActionAddTask,
  tasks
}) => {
  const [taskName, setTaskName] = useState('');
  
  const handleChange = event => {
    const value = event.target.value;
    setTaskName(value);
  };

  const handleSubmit = event => {
    if (!taskName.length) {
      return;
    }
    event.preventDefault();

    const conditionSubmitForm = checkRepeatingProjectName(tasks.taskList, taskName);
    if (!conditionSubmitForm) {  
      dispatchActionAddTask(user.uid, projectId, projectName, taskName, statusTask);
    }
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className='add-task-form__form'>
      <TextField 
        label='Add Task' 
        name='taskName'
        value={taskName}
        onChange={handleChange}
        variant='filled'
        className='add-task-form__input'
        />
      <Button variant='contained' color='primary' type='submit'>
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;