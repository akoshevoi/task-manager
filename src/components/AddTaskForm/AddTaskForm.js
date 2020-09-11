import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addTaskToDB} from '../../api/projects';
import {searchElementInArray, checkRepeatingProjectName} from '../../utils/helpers';

const AddTaskForm = ({
  projects,
  projectId,
  statusTask,
  updateTasksArray
}) => {
  
  const [taskName, setTaskName] = useState('');
  
  const handleChange = event => {
    const value = event.target.value;
    setTaskName(value);
  };

  const handleSubmit = async event => {
    if (!taskName.length) {
      return;
    }

    event.preventDefault();

    const findingProject = searchElementInArray(projects.projectList, projectId, 'projectId');
    const conditionSubmitForm = checkRepeatingProjectName(findingProject.tasks.taskList, taskName);
    
    if (!conditionSubmitForm) {   
      await addTaskToDB(projectId, taskName, statusTask);
    }
    updateTasksArray();
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