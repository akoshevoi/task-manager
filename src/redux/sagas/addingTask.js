import {call, put, select} from 'redux-saga/effects';
import {settingProjectsToStore} from '../actions/projects';
import {addTaskToDataBase} from '../../api/projects';
import {getProjects} from '../selectors/selectors';

async function settingTaskToDB(projectId, task) {
  try {
    await addTaskToDataBase(projectId, task);
  } catch (error) {
    console.log(error);
  }
}

export function* addTask({payload}) {
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
  yield call(settingTaskToDB, payload.projectId, newTask);
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
}