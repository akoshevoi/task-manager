import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {firebaseApp} from '../../firebaseConfig';
import {addProjectsArrayToDB, getProjectsFromDB} from '../../api/projects';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getTasksfromDB, addTaskToDB} from '../../api/projects';


const AddTaskForm = ({
  statusTask,
  projectName, 
  dispatchAction, 
  tasksFromDB, 
  setTasksFromDB
}) => {
  
  const [task, setTask] = useState('');

  const user = useSelector(state => state.user);
  const userEmail = useSelector(state => state.user.email);
  const projectsArray = useSelector(state => state.projects);

  const checkTaskNameOnRepeating = () => {
    const repeatingTaskName = tasksFromDB.find(
      taskItem => taskItem.name === task
    );
    return repeatingTaskName 
    ? false
    : true;
  }

  const handleChange = event => {
    const value = event.target.value;
    setTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    /*
    if (task.length > 0) {
      dispatchAction(projectName, {
        name: task, 
        status: statusTask, 
        description: '', 
        subTasks: []
      });
    
     
    }
    */
    //addProjectsArrayToDB(firebaseApp.firestore(), userEmail,  projectsArray);
    const conditionAddingTask = checkTaskNameOnRepeating();

    if (task.length > 0 && conditionAddingTask) {
      setTasksFromDB([
        ...tasksFromDB,
        {
          name: task, 
          status: statusTask, 
          description: '', 
          subTasks: []
        }
      ])
    }
    async function fetch() {
      const res = await addTaskToDB(user.uid, projectName, task, statusTask);
      return res;
    }
    fetch();
    console.log(projectName);
    setTask('');
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
        value={task}
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