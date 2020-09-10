import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddProjectForm = ({value, handleChange, handleSubmit}) => {
  return (
    <form className='projects-board__form' onSubmit={handleSubmit}>
      <div className='projects-board__form-group'>
        <TextField 
          className='projects-board__input' 
          value={value} 
          onChange={handleChange}
        />
      </div>
      <div className='projects-board__form-group'>
        <Button 
          className='projects-board__btn'
          variant='contained' 
          color='primary' 
          type='submit' 
        >
          Add project
        </Button>
      </div>
    </form>
  );
};

export default AddProjectForm;