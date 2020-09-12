import {call, put} from 'redux-saga/effects';
import {settingProjectsToStore} from '../actions/projects';
import {loadingData} from '../actions/loading';
import {addProjectToDataBase, getProjectsFromDataBase} from '../../api/projects';

async function addingProjectToDataBase(userId, projectName) {
  try {
    const addedProject = await addProjectToDataBase(userId, projectName);
    return addedProject;
  } catch (error) {
    console.log(error)
  }
}

async function gettingProjectsFromDB (userId) {
  try {
    const projects = await getProjectsFromDataBase(userId);
    return projects;
  } catch (error) {
    console.log(error)
  }
}

export function* addProject({payload}) {
  yield put(loadingData(true));
  yield call(addingProjectToDataBase, payload.userId, payload.projectName);
  yield put(loadingData(false));
  const newProjectArray = yield call (gettingProjectsFromDB, payload.userId);
  yield put(settingProjectsToStore(newProjectArray));
}