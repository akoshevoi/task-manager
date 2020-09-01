import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
//import {addingTask} from '../../redux/actions/actions';

const AddTaskForm = ({action, statusTask, arg}) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    setTask(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(action({name: task, [arg ? 'done' : 'status']: statusTask}, arg));
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name='taskName'
        value={task}
        onChange={handleChange}
      />
      <button 
      /*
      name={
        statusTask 
        ? typeof statusTask === 'boolean' 
        : 'addSubTask'
      }
      */
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;