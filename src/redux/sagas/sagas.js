import {takeEvery, call, put, select} from 'redux-saga/effects';
import {
  FETCH_PROJECTS_ARRAY_FROM_DB, 
  ADD_PROJECT,
  ADD_TASK,
  CHANGE_STATUS_TASK,
  ADD_DESCRIPTION_TO_TASK,
  ADD_SUB_TASK,
  CHANGE_STATUS_SUB_TASK
} from '../types/types';
import {settingProjectsArrayToStore, settingProjectsToStore} from '../actions/projects';
import {
  getProjectsFromDB, 
  addProjectToDB, 
  addTaskToDB, 
  changeStatusTaskInDB,
  addDescriptionToDB,
  addSubTaskToDB
} from '../../api/projects';
import {getProjects} from '../selectors/selectors';

/*
 * Async functions 
*/

async function fetchProjectsArrayFromDB(userId) {
  try {
    const projects = await getProjectsFromDB(userId);
    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function addingProjectToDB(userId, projectName) {
  try {
    const addedProject = await addProjectToDB(userId, projectName);
    return addedProject;
  } catch (error) {
    console.log(error)
  }
}

async function gettingProjectsFromDB (userId) {
  try {
    const projects = await getProjectsFromDB(userId);
    return projects;
  } catch (error) {
    console.log(error)
  }
}

async function settingTaskToDB(projectId, task) {
  try {
    await addTaskToDB(projectId, task);
  } catch (error) {
    console.log(error);
  }
}

async function settingTaskArrayToDB(projectId, newTaskArray) {
  try {
    await changeStatusTaskInDB(projectId, newTaskArray);
  } catch (error) {
    console.log(error);
  }
}

/*
 * SagaWorkers 
*/

function* fetchProjectsArray({payload}) {
  const userId = payload.userId;
  const projects = yield call(fetchProjectsArrayFromDB, userId);
  yield put(settingProjectsArrayToStore(projects));
}

function* addProject({payload}) {
  yield call(addingProjectToDB, payload.userId, payload.projectName);
  const newProjectArray = yield call (gettingProjectsFromDB, payload.userId);
  yield put(settingProjectsToStore(newProjectArray));
}

function* addTask({payload}) {
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

function* changeStatusTask({payload}) {
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

function* addDescriptionToTask({payload}) {
  const projects = yield select(getProjects);

  const currentProject = projects.projectList.find(project => {
    return project.projectId === payload.projectId
  });

  const newTaskList = currentProject.tasks.taskList.map(task => {
    if (task.name === payload.taskName) {
      return {...task, description: payload.description}
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

function* addSubTaskToTask({payload}) {
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

function* changeStatusSubTask({payload}) {
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

/*
 * SagaWatcher 
*/

export function* sagaWatcher() {
  yield takeEvery(FETCH_PROJECTS_ARRAY_FROM_DB, fetchProjectsArray);
  yield takeEvery(ADD_PROJECT, addProject);
  yield takeEvery(ADD_TASK, addTask);
  yield takeEvery(CHANGE_STATUS_TASK, changeStatusTask);
  yield takeEvery(ADD_DESCRIPTION_TO_TASK, addDescriptionToTask);
  yield takeEvery(ADD_SUB_TASK, addSubTaskToTask);
  yield takeEvery(CHANGE_STATUS_SUB_TASK, changeStatusSubTask);
}