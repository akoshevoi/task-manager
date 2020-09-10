import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {addDescriptionToDB} from '../../api/projects';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddDescriptionForm = ({projectName, currentTask, dispatchAction, action}) => {
  const [description, setDescription] = useState('');
  const projects = useSelector(state => state.projects);

  const handleChange = event => {
    const value = event.target.value;
    setDescription(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    if (description.length > 0) {
      addDescriptionToDB(projects.activeProject, currentTask.name, description);
    }
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