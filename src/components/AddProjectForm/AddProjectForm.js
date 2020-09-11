import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {checkRepeatingProjectName} from '../../utils/helpers';

const AddProjectForm = ({user, projects, addProject}) => {
  const [projectName, setProjectName] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setProjectName(value);
  }

  const handleSubmit = async event => {
    if (!projectName.length){
      return;
    }
    event.preventDefault();
    const conditionSubmitForm = checkRepeatingProjectName(projects, projectName);
    if (!conditionSubmitForm) {
      addProject(projectName, user.uid);
    }
    setProjectName('');
  }

  return (
    <form className='projects-board__form' onSubmit={handleSubmit}>
      <div className='projects-board__form-group'>
        <TextField 
          className='projects-board__input' 
          value={projectName} 
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