import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import Column from '../../components/Column';
import withAuth from '../../HOC';
import {generate} from 'shortid';
import {settingProjectId, settingProjectIdWhenRefreshPage} from '../../redux/actions/projects';
import {
  addingTaskToDataBase, 
  changingStatusTask,
  addingDescriptionToTask,
  addingSubTask,
  changingStatusSubTask,
  fetchingTasksFromDataBase
} from '../../redux/actions/tasks';
import {showingModal} from '../../redux/actions/modal';
import {getProjectsFromDataBase} from '../../api/projects'; 
import {searchElementInArray} from '../../utils/helpers';
import * as ROUTES from '../../constants/routes';
import TaskDetail from '../../components/TaskDetail';

const TaskBoard = () => {
  const user = useSelector(state => state.user);
  const projects = useSelector(state => state.projects);
  const tasks = useSelector(state => state.tasks);
  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
    
  const dispatchActionAddTask = (userId, projectId, projectName, taskName, taskStatus) => {
    dispatch(addingTaskToDataBase(userId, projectId, projectName, taskName, taskStatus))
  }

  const dispatchActionChangeStatusTask = (taskId, updatedTaskStatus) => {
    dispatch(changingStatusTask(taskId, updatedTaskStatus));
  };

  const dispatchActionAddDescriptionToTask = (taskId, description) => {
    dispatch(addingDescriptionToTask(taskId, description));
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

  const projectId = projects.activeProject
  ? projects.activeProject 
  : localStorage.getItem('activeProjectId');


  const openModal = (task) => {
    dispatch(showingModal(true, task));
  }

  const handleClose = () => {
    dispatch(showingModal(false, currentTask));
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
          dispatch(settingProjectIdWhenRefreshPage(user.uid, params.projectName))
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
          localStorage.setItem('activeProjectId', project.projectId);
          dispatch(fetchingTasksFromDataBase(project.projectId));
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
              dispatchActionAddTask={dispatchActionAddTask}
              statusTask={name}
              projectName={params.projectName} 
              currentProject={currentProject}
              currentTask={currentTask}
              isShow={isShow}
              projectId={projectId}
              dispatchActionChangeStatusTask={dispatchActionChangeStatusTask}
              openModal={openModal}
              handleClose={handleClose}
              user={user} 
              projects={projects}
              tasks={tasks}
              params={params} 
              history={history}
              dispatch={dispatch} 
            />
          )
        })}
        <TaskDetail 
          currentTask={currentTask} 
          currentProject={currentProject}
          isShow={isShow} 
          handleClose={handleClose}
          user={user} 
          projects={projects}
          projectId={projectId}
          params={params} 
          history={history}
          dispatch={dispatch}
          tasks={tasks}
          dispatchActionAddDescriptionToTask={dispatchActionAddDescriptionToTask}
          dispatchActionAddSubTaskToTask={dispatchActionAddSubTaskToTask}
          dispatchActionChangeStatusSubTask={dispatchActionChangeStatusSubTask}
        />
      </div>
    </div>
  );
};

export default withAuth(TaskBoard);