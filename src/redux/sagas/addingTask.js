import {call, put, select} from 'redux-saga/effects';
import {settingTaskToStore} from '../actions/tasks';
import {loadingData} from '../actions/loading';
import {addTaskToDataBase} from '../../api/tasks';
import {getTasks} from '../selectors/selectors';

async function addingTaskToDataBase(userId, projectId, projectName, taskName, taskStatus) {
  try {
    const addedTask = await addTaskToDataBase(userId, projectId, projectName, taskName, taskStatus);
    return addedTask;
  } catch (error) {
    console.log(error)
  }
}

export function* addTask({payload}) {
  yield put(loadingData(true));
  const newTask = yield call(
    addingTaskToDataBase, 
    payload.userId, 
    payload.projectId, 
    payload.projectName, 
    payload.taskName, 
    payload.taskStatus 
  );
  yield put(loadingData(false));
  const tasks = yield select(getTasks);
  tasks.taskList.splice(tasks.taskList.length, 0, newTask);
  yield put(settingTaskToStore(tasks.taskList));
}