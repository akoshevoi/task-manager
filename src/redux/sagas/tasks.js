import {take, call, put, fork, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {settingTaskArrayFromDataBaseToStore, settingTaskToStore} from '../actions/tasks';
import {loadingData} from '../actions/loading';
import {
  getTasksFromDataBase,
  addTaskToDataBase, 
  updateTaskInDataBase
} from '../../api/tasks';
import {getTasks} from '../selectors/selectors';
import {db} from '../../firebaseConfig';

async function fetchTaskArrayFromDB(projectId) {
  try {
    const tasks = await getTasksFromDataBase(projectId);
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

async function addingTaskToDataBase(userId, projectId, projectName, taskName, taskStatus) {
  try {
    await addTaskToDataBase(userId, projectId, projectName, taskName, taskStatus);
  } catch (error) {
    console.log(error)
  }
}

async function updatingTaskFromDataBase(taskId, fieldName, newProperty) {
  try {
    const updatedTask = await updateTaskInDataBase(taskId, fieldName, newProperty);
    return updatedTask;
  } catch (error) {
    console.log(error);
  }
}

function createEventChannel() {
  const listener = eventChannel((emit) => {
    const unsubscribe = db.collection('tasks').onSnapshot(async() => {
      const snapShot = await db.collection('tasks').get();
      const docs = snapShot.docs;
      const itemList = docs.map(doc => doc.data());
      emit(itemList);
    })
    return () => unsubscribe();
  });
  return listener;
}

function* updatedItemSaga() {
  const updateChannel = createEventChannel();
  while (true) {
    const item = yield take(updateChannel);
    console.log('item: ', item);
    
    yield put(settingTaskToStore(item));
  }
}

export function* fetchTasks({payload}) {
  yield put(loadingData(true));
  const tasks = yield call(fetchTaskArrayFromDB, payload.projectId);
  yield put(loadingData(false));
  yield put(settingTaskArrayFromDataBaseToStore(tasks));
}

export function* addTask({payload}) {
  yield fork(updatedItemSaga);
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
}

export function* changeStatusTask({payload}) {
  yield fork(updatedItemSaga);
  yield put(loadingData(true));
  yield call(updatingTaskFromDataBase, payload.taskId, 'status', payload.updatedTaskStatus);
  yield put(loadingData(false));
}

export function* addDescriptionToTask({payload}) {
  yield fork(updatedItemSaga);
  yield put(loadingData(true));
  yield call(updatingTaskFromDataBase, payload.taskId, 'description', payload.description);
  yield put(loadingData(false));
}

export function* addSubTask({payload}) {
  yield fork(updatedItemSaga);
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
}

export function* changeSubTaskStatus({payload}) {
  yield fork(updatedItemSaga);
  const tasks = yield select(getTasks);
  const findingTask = tasks.taskList.find(taskItem => taskItem.taskId === payload.task.taskId);
  const newSubTasksList = findingTask.subTasks.subTasksList.map(subTaskItem => {
    if (subTaskItem.name === payload.subTaskName) {
      return {...subTaskItem, done: payload.subTaskStatus};
    }
    return subTaskItem;
  });
  yield put(loadingData(true));
  yield call(
    updatingTaskFromDataBase, 
    payload.task.taskId, 
    'subTasks.subTasksList', 
    newSubTasksList
  );
  yield put(loadingData(false));
}
