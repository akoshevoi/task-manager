import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addingTask, 
  settingProjectId
} from '../../redux/actions/projects';
import {useParams, useHistory} from 'react-router-dom';
import AddTaskForm from '../../components/AddTaskForm';
import TaskName from '../TaskName';
import TaskDetail from '../TaskDetail';
import {getProjectsFromDB} from '../../api/projects'; 
import {searchElementInArray} from '../../utils/helpers';
import * as ROUTES from '../../constants/routes';

const Column = ({statusTask}) => {
  const [tasksFromDB, setTasksFromDB] = useState([]);
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
  
  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        statusTask={statusTask} 
        projectName={params.projectName} 
        dispatchAction={dispatchAction}
        setTasksFromDB={setTasksFromDB}
        tasksFromDB={tasksFromDB}
      />
        {
        currentProject && currentProject.tasks.taskList.map(task => { 
        return (
          task.status === statusTask
          ? <TaskName 
              key={task.name} 
              task={task} 
              statusTask={statusTask} 
              projectName={params.projectName} 
            />
          : null
        )
      })
    
      } 
      <TaskDetail 
        currentTask={currentTask} 
        isShow={isShow} 
        projectName={params.projectName} 
      />
    </div>
  )
};

export default Column;