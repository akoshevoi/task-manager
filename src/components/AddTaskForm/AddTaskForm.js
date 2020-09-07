import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {firebaseApp} from '../../firebaseConfig';
import {getDocument1} from '../../api/users';
import {useSelector} from 'react-redux';

const AddTaskForm = ({statusTask, projectName, dispatchAction}) => {
  const userID = useSelector(state => state.user.uid);
  const userEmail = useSelector(state => state.user.email);
  const projectsArray = useSelector(state => state.projects);
  const searchingProject = useSelector(state => {
    return state.projects.find(item => {
      return item.name === projectName
    })
  });
  const searchingProjectIndex = useSelector(state => {
    return state.projects.findIndex(item => {
      return item.name === projectName
    })
  });
  const [task, setTask] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (task.length > 0) {
      dispatchAction(projectName, {
        name: task, 
        status: statusTask, 
        description: '', 
        subTasks: []
      });
    }

    
    getDocument1(firebaseApp.firestore(), userEmail,  projectsArray);
    
    

    setTask('');
  };

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