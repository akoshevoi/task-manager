import {call, put} from 'redux-saga/effects';
import {settingProjectsArrayToStore} from '../actions/projects';
import {getProjectsFromDataBase} from '../../api/projects';

async function fetchProjectsArrayFromDB(userId) {
  try {
    const projects = await getProjectsFromDataBase(userId);
    return projects;
  } catch (error) {
    console.log(error);
  }
}

export function* fetchProjects({payload}) {
  const userId = payload.userId;
  const projects = yield call(fetchProjectsArrayFromDB, userId);
  yield put(settingProjectsArrayToStore(projects));
}
