import {call, put} from 'redux-saga/effects';
import {settingTaskArrayFromDataBaseToStore} from '../actions/tasks';
import {loadingData} from '../actions/loading';
import {getTasksFromDataBase} from '../../api/tasks';

async function fetchTaskArrayFromDB(projectId) {
  try {
    const tasks = await getTasksFromDataBase(projectId);
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

export function* fetchTasks({payload}) {
  yield put(loadingData(true));
  const tasks = yield call(fetchTaskArrayFromDB, payload.projectId);
  yield put(loadingData(false));
  yield put(settingTaskArrayFromDataBaseToStore(tasks));
}
