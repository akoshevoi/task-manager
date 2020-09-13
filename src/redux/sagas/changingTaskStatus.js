import {call, put, select} from 'redux-saga/effects';
import {updateTaskInDataBase} from '../../api/tasks';
import {settingTaskToStore} from '../actions/tasks';
import {loadingData} from '../actions/loading';
import {getTasks} from '../selectors/selectors';

async function updatingTaskFromDataBase(taskId, fieldName, newProperty) {
  try {
    const updatedTask = await updateTaskInDataBase(taskId, fieldName, newProperty);
    return updatedTask;
  } catch (error) {
    console.log(error);
  }
}

export function* changeStatusTask({payload}) {
  yield put(loadingData(true));
  yield call(updatingTaskFromDataBase, payload.taskId, 'status', payload.updatedTaskStatus);
  yield put(loadingData(false));
  const tasks = yield select(getTasks);
  const newTaskList = tasks.taskList.map(taskItem => {
    if (taskItem.taskId === payload.taskId) {
      return {...taskItem, status: payload.updatedTaskStatus}
    }
    return taskItem;
  });
  yield put(settingTaskToStore(newTaskList));
}