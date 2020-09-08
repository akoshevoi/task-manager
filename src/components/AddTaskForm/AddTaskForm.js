import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {firebaseApp} from '../../firebaseConfig';
import {addProjectsArrayToDB} from '../../api/projects';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {foo} from '../../api/projects';


const AddTaskForm = ({statusTask, projectName, dispatchAction}) => {
  const [task, setTask] = useState('');

  const user = useSelector(state => state.user);
  const userEmail = useSelector(state => state.user.email);
  const projectsArray = useSelector(state => state.projects);

  const handleChange = event => {
    const value = event.target.value;
    setTask(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    /*
    if (task.length > 0) {
      dispatchAction(projectName, {
        name: task, 
        status: statusTask, 
        description: '', 
        subTasks: []
      });
    
     
    }
    */
    //addProjectsArrayToDB(firebaseApp.firestore(), userEmail,  projectsArray);
    async function fetch() {
      const res = await foo(user.uid, projectName, task);
      return res;
    }
    console.log(fetch());
    console.log(projectName);
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