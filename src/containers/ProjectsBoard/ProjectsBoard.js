import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {generate} from 'shortid';
import {addingProject} from '../../redux/actions/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../../layouts/Header';
import Paper from '@material-ui/core/Paper';
import * as ROUTES from '../../constants/routes';
import {addProjectsToDB, getProjectsFromDB} from '../../api/projects'; 
import withAuth from '../../HOC';

const ProjectsBoard = () => {
  const [project, setProject] = useState('');
  const [projectsFromDB, setProjectsFromDB] = useState([]);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const checkProjectNameOnRepeating = () => {
    const repeatingProjectsName = projectsFromDB.find(
      projectItem => projectItem.name === project
    );
    return repeatingProjectsName 
    ? false
    : true;
  }

  const handleChange = event => {
    const value = event.target.value;
    setProject(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (project.length > 0) {
      dispatch(addingProject(project));
    };

    const conditionAddingProject = checkProjectNameOnRepeating();

    if (conditionAddingProject) {
      setProjectsFromDB([
        ...projectsFromDB,
        {
          name: project,
          tasks: {
            taskList: []
          }
        }
      ]);
    }
    
    addProjectsToDB(user.uid, project);
    setProject('');
  }

  const goToTaskBoard = projectName => () => history.push(`${ROUTES.TASK_BOARD}/${projectName}`);
  
  useEffect(() => {
    async function fetch() {
      const fetchedProjects = await getProjectsFromDB(user.uid);
      setProjectsFromDB(fetchedProjects);
    }
    fetch();
  }, [user]);

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
        projectsFromDB.length > 0 &&
        <h3 className='projects-board__title'>Projects</h3>
      }
      <div className='projects-board__content'>
        {
          projectsFromDB.map(project => {
            let uid = generate();
            return (
              <div key={uid} className='project-card' onClick={goToTaskBoard(project.name)}>   
                <Paper>
                  <div className='project-card__inner'>
                    <h4 className='project-card__name'>{project.name}</h4>
                  </div>
                </Paper>
              </div>
            )
          })
        } 
      </div>
    </div>
  );
};

export default withAuth(ProjectsBoard);