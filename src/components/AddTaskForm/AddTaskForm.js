import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addTaskToDB, getProjectFromDB} from '../../api/projects';
import {searchElementInArray, checkRepeatingProjectName} from '../../utils/helpers';
import {settingTaskArrayFromDbToStore} from '../../redux/actions/projects';

const AddTaskForm = ({
  statusTask,
  projectName, 
  dispatchAction
}) => {
  
  const [taskName, setTaskName] = useState('');
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  const projectId = projects.activeProject
  ? projects.activeProject 
  : localStorage.getItem('activeProjectId');

  const updateTasksArray = async () => {
    try {
      const fetchedProject = await getProjectFromDB(projectId);
      const {tasks} = fetchedProject
      dispatch(settingTaskArrayFromDbToStore(projectId, tasks.taskList));
      
    } catch (error) {
      console.log(error);
    }
  }

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