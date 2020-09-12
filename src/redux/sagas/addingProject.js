import {call, put} from 'redux-saga/effects';
import {settingProjectsToStore} from '../actions/projects';
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
  yield call(addingProjectToDataBase, payload.userId, payload.projectName);
  const newProjectArray = yield call (gettingProjectsFromDB, payload.userId);
  yield put(settingProjectsToStore(newProjectArray));
}