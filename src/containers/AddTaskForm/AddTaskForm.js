import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddTaskForm = ({statusTask, projectName}) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    setTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (task.length > 0) {
      dispatch(addingTask(projectName, {name: task, status: statusTask, subTasks: []}));
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
      <Button variant='contained' color='primary' type='submit'>
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;