import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addingTask, 
  settingProjectId, 
  settingProjectArrayFromDbToStore
} from '../../redux/actions/actions';
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

  const updateProjectsArray = async () => {
    try {
      const fetchedProjects = await getProjectsFromDB(user.uid); 
      dispatch(settingProjectArrayFromDbToStore(fetchedProjects));
    } catch (error) {
      console.log(error);
    }
  }

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


    
    
    
/*
  const projectId = projects.activeProject
    ? projects.activeProject 
    : localStorage.getItem('activeProjectId');

  console.log('store_id: ', projects.activeProject);
  console.log('local_storage_id: ', localStorage.getItem('activeProjectId'));
  console.log(projectId);
  
  const tasks = searchElementInArray(projects.projectList, projectId, 'projectId');
  console.log(tasks);
  */
  

  /*
  useEffect(() => {
    async function fetchTaskArray() {
      const fetchedTasks = await getTaskArrayFromDB(user.uid, params.projectName);
      setTasksFromDB(fetchedTasks);
    }
    fetchTaskArray();
  }, [user, params]);
  */

  useEffect(() => {
    updateProjectsArray();
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

       {/* {tasksFromDB.map(task => {
        let uid = generate();  
        return (
          task.status === statusTask
          ? <TaskName 
              key={uid} 
              task={task} 
              statusTask={statusTask} 
              projectName={params.projectName} 
            />
          : null
        )
      })} */}

      <TaskDetail 
        currentTask={currentTask} 
        isShow={isShow} 
        projectName={params.projectName} 
      />
    </div>
  )
};

export default Column;