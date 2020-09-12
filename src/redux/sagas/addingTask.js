import {call, put, select} from 'redux-saga/effects';
import {settingProjectsToStore} from '../actions/projects';
import {loadingData} from '../actions/loading';
//import {addTaskToDataBase} from '../../api/projects';
import {addTaskToDataBase} from '../../api/tasks';
import {getProjects} from '../selectors/selectors';

async function addingTaskToDataBase(userId, projectId, projectName, taskName, taskStatus) {
  try {
    const addedTask = await addTaskToDataBase(userId, projectId, projectName, taskName, taskStatus);
    return addedTask;
  } catch (error) {
    console.log(error)
  }
}

export function* addTask({payload}) {
  yield console.log(payload);
  yield put(loadingData(true));
  yield call(
    addingTaskToDataBase, 
    payload.userId, 
    payload.projectId, 
    payload.projectName, 
    payload.taskName, 
    payload.taskStatus 
  );
  yield put(loadingData(false));
   
  /*
  const projects = yield select(getProjects);
  const currentProject = projects.projectList.find(project => {
    return project.projectId === payload.projectId
  });
  const newTask = {
    name: payload.taskName,
    status: payload.taskStatus,
    description: '',
    subTasks: []
  };
  yield put(loadingData(true));
  yield call(settingTaskToDB, payload.projectId, newTask);
  yield put(loadingData(false));
  const newTaskList = currentProject.tasks.taskList;
  newTaskList.splice(newTaskList.length, 0, newTask);

  const latestProject = {
    ...currentProject, 
    tasks: {...currentProject.tasks, taskList: newTaskList}
  };
  
  const latestProjectsArray = projects.projectList.map(project => {
    if (project.projectId === latestProject.projectId) {
      return latestProject;
    }
    return project;
  })
  
  yield put(settingProjectsToStore(latestProjectsArray));
  */
}