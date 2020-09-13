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

export function* addSubTask({payload}) {
  const tasks = yield select(getTasks);
  const task = tasks.taskList.find(taskItem => {
    if (taskItem.taskId === payload.task.taskId) {
      return taskItem.subTasks.subTasksList.splice(
        taskItem.subTasks.subTasksList.length, 0, payload.subTask
      );
    }
    return;
  });
  yield put(loadingData(true));
  yield call(
    updatingTaskFromDataBase, 
    payload.task.taskId, 
    'subTasks.subTasksList', 
    task.subTasks.subTasksList
  );
  yield put(loadingData(false));
  yield put(settingTaskToStore(tasks.taskList));
}