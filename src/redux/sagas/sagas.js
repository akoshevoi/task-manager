import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_PROJECTS, SET_PROJECT, GET_PROJECT} from '../types/types';
import {gettingProject, settingProject} from '../actions/projects';
import {getProjectsFromDB} from '../../api/projects';

async function foo() {
  try {
    const project = await getProjectsFromDB(projectId);
    return project;
  } catch (error) {
    console.log(error);
  }
}

function* sagaWorker() {
  const data = yield call(foo);

  yield put(settingProject(data));
}

export function* sagaWatcher() {
  yield takeEvery(GET_PROJECT, sagaWorker);
}