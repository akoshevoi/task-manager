import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';

const AddTaskButton = ({name}) => {
  const [values, setValues] = useState({
    taskName: ''
  });
  const dispatch = useDispatch();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addingTask({name: values.taskName, status:name}));
    setValues({taskName: ''})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name='taskName'
        value={values.taskName}
        onChange={handleChange}
      />
      <button name={name}>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskButton;