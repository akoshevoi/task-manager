import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addTaskToDB} from '../../api/projects';

const AddTaskForm = ({
  statusTask,
  projectName, 
  dispatchAction, 
  tasksFromDB, 
  setTasksFromDB
}) => {
  
  const [taskName, setTaskName] = useState('');
  const user = useSelector(state => state.user);

  const checkTaskNameOnRepeating = () => {
    const repeatingTaskName = tasksFromDB.find(
      taskItem => taskItem.name === taskName
    );
    return repeatingTaskName 
    ? false
    : true;
  }

  const handleChange = event => {
    const value = event.target.value;
    setTaskName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
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
    async function fetch() {
      const res = await addTaskToDB(user.uid, projectName, taskName, statusTask);
      return res;
    }
    fetch();
    setTaskName('');
  };
/*
  useEffect(() => {
    async function fetch() {
      const fetchedProjects = await getTasksfromDB(user.uid, projectName);
      setTasksFromDB(fetchedProjects);
    }
    fetch();
  }, [user, projectName, setTasksFromDB]);
*/
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