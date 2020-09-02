import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addingSubTask} from '../../redux/actions/actions';

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
    <form onSubmit={handleSubmit}>
    <input 
      type='text'
      name='subTaskName'
      value={subTask}
      onChange={handleChange} 
    />
    <button>Add subTask</button>
  </form> 
  );
};

export default AddSubTaskForm;