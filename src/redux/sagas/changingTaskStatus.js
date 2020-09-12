import {call, put, select} from 'redux-saga/effects';
import {settingProjectsToStore} from '../actions/projects';
import {updateTaskArrayInDataBase} from '../../api/projects';
import {getProjects} from '../selectors/selectors';

async function settingTaskArrayToDB(projectId, newTaskArray) {
  try {
    await updateTaskArrayInDataBase(projectId, newTaskArray);
  } catch (error) {
    console.log(error);
  }
}

export function* changeStatusTask({payload}) {
  const projects = yield select(getProjects);
  const currentProject = projects.projectList.find(project => {
    return project.projectId === payload.projectId
  });

  const newTaskList = currentProject.tasks.taskList.map(task => {
    if (task.name === payload.taskName) {
      return {...task, status: payload.updatedTaskStatus}
    }
    return task;
  });
  
  yield call(settingTaskArrayToDB, payload.projectId, newTaskList);

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
}