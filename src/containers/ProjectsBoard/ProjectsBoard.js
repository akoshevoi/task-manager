import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import AddProjectForm from '../../components/AddProjectForm';
import ProjectCard from '../../components/ProjectCard';
import {addProjectsToDB} from '../../api/projects'; 
import {
  fetchingProjectsArrayFromDB, 
  settingProjectId
} from '../../redux/actions/projects';
import Header from '../../layouts/Header';
import * as ROUTES from '../../constants/routes';
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
      dispatch(fetchingProjectsArrayFromDB(user.uid));
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
        <AddProjectForm 
          value={projectName}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className='projects-board__content'>
        {projects.map(project => (
          <ProjectCard 
            key={project.projectId} 
            handleClick={goToTaskBoard(project)}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(ProjectsBoard);