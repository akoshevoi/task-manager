import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddTaskForm = ({action, statusTask}) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    setTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (task.length > 0) {
      dispatch(action({name: task, status: statusTask}));
    }
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
      {/* <input 
        type='text'
        name='taskName'
        value={task}
        onChange={handleChange}
      /> */}
      <Button variant='contained' color='primary' type='submit'>
        Add Task
      </Button>
      {/* <button>Add Task</button> */}
    </form>
  );
};

export default AddTaskForm;