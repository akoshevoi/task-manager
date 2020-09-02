import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addingSubTask} from '../../redux/actions/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddSubTaskForm = ({currentTask, calculateProgressBarLength}) => {
  const [subTask, setSubTask] = useState('');
  
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    setSubTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (subTask.length > 0) {
      dispatch(addingSubTask(currentTask, {name: subTask, done: false}));
      calculateProgressBarLength();
    }
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