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


export function* changeSubTaskStatus({payload}) {
  const newSubTaskList = payload.task.subTasks.map(subTask => {
    if (subTask.name === payload.subTaskName) {
      return {...subTask, done: payload.subTaskStatus}
    }
    return subTask;
  })

  const newTask = {...payload.task, subTasks: newSubTaskList};

  const projects = yield select(getProjects);

  const currentProject = projects.projectList.find(project => project.projectId === projects.activeProject);

  const newTaskList = currentProject.tasks.taskList.map(task => {
    if (task.name === payload.task.name) {
      return newTask
    }
    return task;
  });

  yield call(settingTaskArrayToDB, projects.activeProject, newTaskList);

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