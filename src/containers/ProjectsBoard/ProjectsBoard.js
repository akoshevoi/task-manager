import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import AddProjectForm from '../../components/AddProjectForm';
import ProjectCard from '../../components/ProjectCard';
import {settingProjectId} from '../../redux/actions/projects';
import * as ROUTES from '../../constants/routes';
import withAuth from '../../HOC';
import {addingProject} from '../../redux/actions/projects';

const ProjectsBoard = () => {
  const user = useSelector(state => state.user)
  const projects = useSelector(state => state.projects.projectList);
  const dispatch = useDispatch();
  let history = useHistory();

  const addProject = (projectName, userId) => {
    dispatch(addingProject(projectName, userId));
  }

  const goToTaskBoard = project => () => {
    history.push(`${ROUTES.TASK_BOARD}/${project.name}`);
    dispatch(settingProjectId(project.projectId));
  }

  return (
    <div className='projects-board'>
      <div className='projects-board__form-outer'>
        <AddProjectForm 
          user={user}
          projects={projects}
          addProject={addProject}
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