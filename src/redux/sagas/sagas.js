import {takeEvery, call, put} from 'redux-saga/effects';
import {FETCH_PROJECTS_ARRAY_FROM_DB} from '../types/types';
import {settingProjectsArrayToStore} from '../actions/projects';
import {getProjectsFromDB} from '../../api/projects';

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

export function* sagaWatcher() {
  yield takeEvery(FETCH_PROJECTS_ARRAY_FROM_DB, sagaWorkerFetchProjectsArray);
}