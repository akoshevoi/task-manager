import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import Column from '../../containers/Column';
import withAuth from '../../HOC';
import {generate} from 'shortid';
import {
  addingTask, 
  settingProjectId
} from '../../redux/actions/projects';
import {getProjectsFromDB} from '../../api/projects'; 
import {searchElementInArray} from '../../utils/helpers';
import * as ROUTES from '../../constants/routes';

const TaskBoard = () => {
  const user = useSelector(state => state.user);
  const projects = useSelector(state => state.projects);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  const currentProject = searchElementInArray(
    projects.projectList, projects.activeProject, 'projectId'
  );

  const dispatchAction = (...args) => {
    dispatch(addingTask(...args))
  } 

   useEffect(() => {
    if (history.action === "POP"){
      const checkСorrespondenceUrlAndProjectName = async () => {
        try {
          const projectsArray = await getProjectsFromDB(user.uid);
          const conditionСorrespondence = !!searchElementInArray(
            projectsArray, params.projectName, 'name'
          );
          if (!conditionСorrespondence) {
            history.push(ROUTES.PROJECTS_BOARD)  
            return;
          }
          let projectId = localStorage.getItem('activeProjectId');
          dispatch(settingProjectId(projectId)); 
        } catch (error) {
          console.log(error);
        }
      }
      checkСorrespondenceUrlAndProjectName();
      
      //const project = await getProject(params.projectName)
      // if (!project){
      //history.push(ROUTES.PROJECTS_BOARD)  
      //return
     // }
     // setProjectIdToStore(project.id)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!projects.activeProject) {
       const getProjectId = async () => {
        try {
          const projectsArray = await getProjectsFromDB(user.uid);
          const project = searchElementInArray(projectsArray, params.projectName, 'name');
          localStorage.setItem('activeProjectId', project.projectId)
        } catch(error) {
          console.log(error);
        }
      }
      getProjectId();
    }
    // eslint-disable-next-line
  }, [])

  const columnNames = ['To Do', 'In Progress', 'Done'];
  return (
    <div className='board'>
      <h2 className='board__title'>{params.projectName}</h2>
      <div className="board__content">      
        {columnNames.map(name => {
            let uid = generate();
            return (
              <Column 
                key={uid} 
                statusTask={name}
                projectName={params.projectName} 
                dispatchAction={dispatchAction}
                currentProject={currentProject}
                currentTask={currentTask}
                isShow={isShow}
              />
            )
          })}
      </div>
    </div>
  );
};

export default withAuth(TaskBoard);