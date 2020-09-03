import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {generate} from 'shortid';
import {addingProject} from '../../redux/actions/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../../layouts/Header';
import Paper from '@material-ui/core/Paper';
import * as ROUTES from '../../constants/routes';

const ProjectsBoard = () => {
  const projects = useSelector(state => {
    let projectsNameArray = [];
    for (let i = 0; i < state.projects.length; i++) {
      projectsNameArray.push(state.projects[i].name);
    }
    return projectsNameArray;
  });

  let history = useHistory();
  const [project, setProject] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    setProject(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (project.length > 0) {
      dispatch(addingProject(project));
    }
    setProject('');
  }

  const goToTaskBoard = projectName => () => history.push(`${ROUTES.TASK_BOARD}/${projectName}`);

  return (
    <div className='projects-board'>
      <Header />
      <div className='projects-board__form-outer'>
        <form className='projects-board__form' onSubmit={handleSubmit}>
          <div className='projects-board__form-group'>
            <TextField 
              className='projects-board__input' 
              value={project} 
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
      </div>
      {
        projects.length > 0 &&
        <h3 className='projects-board__title'>Projects</h3>
      }
      <div className='projects-board__content'>
        {projects.map(project => {
          let uid = generate();
          return (
            <div key={uid} className='project-card' onClick={goToTaskBoard(project)}>   
              <Paper>
                <div className='project-card__inner'>
                  <h4 className='project-card__name'>{project}</h4>
                </div>
              </Paper>
            </div>
          )
        })} 
      </div>
    </div>
  );
};

export default ProjectsBoard;