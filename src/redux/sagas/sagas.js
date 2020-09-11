import {takeEvery, call, put} from 'redux-saga/effects';
import {FETCH_PROJECTS_ARRAY_FROM_DB, ADD_PROJECT} from '../types/types';
import {settingProjectsArrayToStore, settingProjectsToStore} from '../actions/projects';
import {getProjectsFromDB, addProjectToDB} from '../../api/projects';

async function fetchProjectsArray(userId) {
  try {
    const projects = await getProjectsFromDB(userId);
    return projects;
  } catch (error) {
    console.log(error);
  }
}

function* sagaWorkerFetchProjectsArray({payload}) {
  const userId = payload.userId;
  const projects = yield call(fetchProjectsArray, userId);
  yield put(settingProjectsArrayToStore(projects));
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

function* addProject({payload}) {
  yield call(addingProjectToDB, payload.userId, payload.projectName);
  const newProjectArray = yield call (gettingProjectsFromDB, payload.userId);
  yield put(settingProjectsToStore(newProjectArray));
}

export function* sagaWatcher() {
  yield takeEvery(FETCH_PROJECTS_ARRAY_FROM_DB, sagaWorkerFetchProjectsArray);
  yield takeEvery(ADD_PROJECT, addProject);
}