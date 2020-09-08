import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {firebaseApp} from '../../firebaseConfig';
import {addProjectsArrayToDB, addDescriptionToDB} from '../../api/projects';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddDescriptionForm = ({projectName, currentTask, dispatchAction, action}) => {
  const [description, setDescription] = useState('');

  const projectsArray = useSelector(state => state.projects);
  //const userEmail = useSelector(state => state.user.email);
  const user = useSelector(state => state.user);

  const handleChange = event => {
    const value = event.target.value;
    setDescription(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    if (description.length > 0) {
      //dispatchAction(action(projectName, currentTask, description));
      addDescriptionToDB(user.uid, projectName, currentTask.name, description);
    }
    //addProjectsArrayToDB(firebaseApp.firestore(), user.email,  projectsArray);
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