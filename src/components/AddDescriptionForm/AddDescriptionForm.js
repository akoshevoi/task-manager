import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import {useDispatch} from 'react-redux';

const AddDescriptionForm = ({
  updatedTask,
  projects, 
  addDescriptionToDB,
  updateTasksArray,
  addDescriptionToTask,
  projectId
}) => {
  const [description, setDescription] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setDescription(value);
  }

  const handleSubmit = event => {
    if (!description.length) {
      return;
    }
    event.preventDefault();
    addDescriptionToTask(projectId, updatedTask.name, description);
    //await addDescriptionToDB(projects.activeProject, updatedTask.name, description);
    //updateTasksArray();
    setDescription('');
  };

  return (
    <form className='add-description-form' onSubmit={handleSubmit}>
      <TextField
        placeholder='Description'
        multiline
        rows={4}
        rowsMax={4}
        onChange={handleChange}
        value={description}
        className='add-description-form__textarea'
      />
      <div className='add-description-form__form-group'>
        <Button 
          variant='contained' 
          color='primary' 
          type='submit' 
          className='add-description-form__btn'
        >
          Add Description
        </Button>
      </div>
    </form>
  );
};

export default AddDescriptionForm;