import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import Column from '../../components/Column';
import withAuth from '../../HOC';
import {generate} from 'shortid';
import {
  addingTask, 
  settingProjectId,
  changingStatusTask,
  settingTaskArrayFromDbToStore,
  addingDescriptionToTask,
  addingSubTask,
  changingStatusSubTask
} from '../../redux/actions/projects';
import {showingModal} from '../../redux/actions/modal';
import {
  getProjectsFromDataBase,
  getProjectFromDataBase,
} from '../../api/projects'; 
import {searchElementInArray} from '../../utils/helpers';
import * as ROUTES from '../../constants/routes';
import TaskDetail from '../../components/TaskDetail';

const TaskBoard = () => {
  const user = useSelector(state => state.user);
  const projects = useSelector(state => state.projects);
  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const dispatchActionAddTask = (projectId, taskName, taskStatus) => {
    dispatch(addingTask(projectId, taskName, taskStatus))
  }

  const dispatchActionChangeStatusTask = (projectId, taskName, updatedTaskStatus) => {
    dispatch(changingStatusTask(projectId, taskName, updatedTaskStatus));
  };

  const dispatchActionAddDescriptionToTask = (projectId, taskName, description) => {
    dispatch(addingDescriptionToTask(projectId, taskName, description));
  }

  const dispatchActionAddSubTaskToTask = (task, subTask) => {
    dispatch(addingSubTask(task, subTask));
  }

  const dispatchActionChangeStatusSubTask = (task, subtask, status) => {
    dispatch(changingStatusSubTask(task, subtask, status));
  }

  const currentProject = searchElementInArray(
    projects.projectList, projects.activeProject, 'projectId'
  )

  const dispatchAction = (...args) => {
    dispatch(addingTask(...args))
  } 

  const projectId = projects.activeProject
  ? projects.activeProject 
  : localStorage.getItem('activeProjectId');


  const openModal = (task) => {
    dispatch(showingModal(true, task));
  }

  const handleClose = () => {
    dispatch(showingModal(false, currentTask));
  }

  const dispatchActionNew = action => {
    dispatch(action);
  }

   useEffect(() => {
    if (history.action === "POP"){
      const checkСorrespondenceUrlAndProjectName = async () => {
        try {
          const projectsArray = await getProjectsFromDataBase(user.uid);
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
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!projects.activeProject) {
       const getProjectId = async () => {
        try {
          const projectsArray = await getProjectsFromDataBase(user.uid);
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

  const updateTasksArray = async () => {
    try {
      const fetchedProject = await getProjectFromDataBase(projectId);
      const {tasks} = fetchedProject
      dispatch(settingTaskArrayFromDbToStore(projectId, tasks.taskList));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='board'>
      <h2 className='board__title'>{params.projectName}</h2>
      <div className="board__content">      
        {columnNames.map(name => {
          let uid = generate();
          return (
            <Column 
              key={uid} 
              dispatchActionAddTask={dispatchActionAddTask}
              statusTask={name}
              projectName={params.projectName} 
              dispatchAction={dispatchAction}
              currentProject={currentProject}
              currentTask={currentTask}
              isShow={isShow}
              projectId={projectId}
              dispatchActionChangeStatusTask={dispatchActionChangeStatusTask}
              openModal={openModal}
              handleClose={handleClose}
              dispatchActionNew={dispatchActionNew}
              user={user} 
              projects={projects}
              params={params} 
              history={history}
              dispatch={dispatch} 
              updateTasksArray={updateTasksArray}
            />
          )
        })}
        <TaskDetail 
          currentTask={currentTask} 
          currentProject={currentProject}
          isShow={isShow} 
          handleClose={handleClose}
          dispatchActionNew={dispatchActionNew}
          user={user} 
          projects={projects}
          projectId={projectId}
          params={params} 
          history={history}
          dispatch={dispatch}
          updateTasksArray={updateTasksArray}
          dispatchActionAddDescriptionToTask={dispatchActionAddDescriptionToTask}
          dispatchActionAddSubTaskToTask={dispatchActionAddSubTaskToTask}
          dispatchActionChangeStatusSubTask={dispatchActionChangeStatusSubTask}
        />
      </div>
    </div>
  );
};

export default withAuth(TaskBoard);