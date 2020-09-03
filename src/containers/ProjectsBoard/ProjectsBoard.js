import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../../components/Header/Header';
import {useDispatch} from 'react-redux';
import {addingProject} from '../../redux/actions/actions';
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {useSelector} from 'react-redux';
import {generate} from 'shortid';
import Paper from '@material-ui/core/Paper';

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
      <form onSubmit={handleSubmit}>
        <TextField 
          className='projects-board__input' 
          value={project} 
          onChange={handleChange}
        />
        <Button 
          variant='contained' 
          color='primary' 
          type='submit' 
        >
          Add project
        </Button>
      </form>
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
  );
};

export default ProjectsBoard;