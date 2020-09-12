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

export function* addSubTask({payload}) {
  const newSubTaskList = payload.task.subTasks;
  newSubTaskList.splice(newSubTaskList.length, 0, payload.subTask);

  const projects = yield select(getProjects);

  const newTask = payload.task;

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