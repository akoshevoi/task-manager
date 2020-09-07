import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {getDocument1} from '../../api/users';
import {firebaseApp} from '../../firebaseConfig';

const AddSubTaskForm = ({
  currentTask, 
  calculateProgressBarLength, 
  projectName, 
  dispatchAction,
  action
}) => {
  const projectsArray = useSelector(state => state.projects);
  const userEmail = useSelector(state => state.user.email);
  const [subTask, setSubTask] = useState('');
  
  const handleChange = event => {
    const value = event.target.value;
    setSubTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (subTask.length > 0) {
      dispatchAction(action(projectName, currentTask, {name: subTask, done: false}));
      calculateProgressBarLength();
    }
    getDocument1(firebaseApp.firestore(), userEmail,  projectsArray);
    setSubTask('');
  };
  
  return (
    <form onSubmit={handleSubmit} className='add-task-form__form'>
      <TextField 
        label='Add SubTask' 
        name='subTaskName'
        value={subTask}
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