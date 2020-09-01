import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';

const AddTaskButton = ({name}) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    setTask(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addingTask({name: task, status:name}));
    setTask('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name='taskName'
        value={task}
        onChange={handleChange}
      />
      <button name={name}>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskButton;