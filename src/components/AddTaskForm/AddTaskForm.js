import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addTaskToDB, getTaskFromDB} from '../../api/projects';
import {checkRepeatingProjectName} from '../../utils/helpers';

const AddTaskForm = ({
  statusTask,
  projectName, 
  dispatchAction, 
  tasksFromDB, 
  setTasksFromDB
}) => {
  
  const [taskName, setTaskName] = useState('');
  const projects = useSelector(state => state.projects);

  const handleChange = event => {
    const value = event.target.value;
    setTaskName(value);
  };

  const handleSubmit = async event => {
    if (!taskName.length) {
      return;
    }

    event.preventDefault();
    /*
    const conditionAddingTask = checkTaskNameOnRepeating();
    if (taskName.length > 0 && conditionAddingTask) {
      setTasksFromDB([
        ...tasksFromDB,
        {
          name: taskName, 
          status: statusTask, 
          description: '', 
          subTasks: []
        }
      ])
    }
    */

    const projectId = projects.activeProject
    ? projects.activeProject 
    : localStorage.getItem('activeProjectId');
    /*
    const foo = async () => {
      try {
        const task = getTaskFromDB(projectId);
      } catch (error) {
        console.log(error);
      }
    }
    */
    const task = await getTaskFromDB(projectId);
    const conditionSubmitForm = checkRepeatingProjectName(task.tasks.taskList, taskName);
    if (!conditionSubmitForm) {   
      await addTaskToDB(projectId, taskName, statusTask);
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