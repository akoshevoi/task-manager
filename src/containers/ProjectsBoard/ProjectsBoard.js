import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  settingProjectId
} from '../../redux/actions/projects';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../../layouts/Header';
import Paper from '@material-ui/core/Paper';
import * as ROUTES from '../../constants/routes';
import {addProjectsToDB} from '../../api/projects'; 
import withAuth from '../../HOC';
import {checkRepeatingProjectName} from '../../utils/helpers';

const ProjectsBoard = () => {
  const [projectName, setProjectName] = useState('');
  const user = useSelector(state => state.user);
  const projects = useSelector(state => state.projects.projectList);
  const dispatch = useDispatch();
  let history = useHistory();

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
      await addProjectsToDB(user.uid, projectName);
    }

    setProjectName('');
  }

  const goToTaskBoard = project => () => {
    history.push(`${ROUTES.TASK_BOARD}/${project.name}`);
    dispatch(settingProjectId(project.projectId));
  }

  return (
    <div className='projects-board'>
      <Header />
      <div className='projects-board__form-outer'>
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
        <button onClick>Saga</button>
      </div>
      <div className='projects-board__content'>
        {projects.map(project => (
          <div 
            key={project.projectId} 
            className='project-card' 
            onClick={goToTaskBoard(project)}
          >   
            <Paper>
              <div className='project-card__inner'>
                <h4 className='project-card__name'>{project.name}</h4>
              </div>
            </Paper>
          </div>
          ))}
      </div>
    </div>
  );
};

export default withAuth(ProjectsBoard);