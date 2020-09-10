import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addSubTaskToDB} from '../../api/projects';
import {useSelector} from 'react-redux';
import {checkRepeatingProjectName} from '../../utils/helpers';

const AddSubTaskForm = ({
  currentTask, 
  calculateProgressBarLength, 
  projectName, 
  dispatchAction,
  action
}) => {
  const [subTaskName, setSubTaskName] = useState('');
  const projects = useSelector(state => state.projects);
  const project = projects.projectList.find(project => project.projectId === projects.activeProject);
  const task = project.tasks.taskList.find(task => task.name === currentTask.name);
  
  const handleChange = event => {
    const value = event.target.value;
    setSubTaskName(value);
  };

  const handleSubmit = async event => {
    if (!subTaskName.length){
      return;
    }

    event.preventDefault();

    const conditionSubmitForm = checkRepeatingProjectName(task.subtasks, subTaskName);

    if (!conditionSubmitForm) {
      const subTask = {name: subTaskName, done:false}
      await addSubTaskToDB(projects.activeProject, currentTask.name, subTask);
      //dispatchAction(action(projectName, currentTask, {name: subTask, done: false}));
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