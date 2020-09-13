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

export function* changeSubTaskStatus({payload}) {
  const tasks = yield select(getTasks);
  /*
  const newTasks = tasks.taskList.find(taskItem => {
    if (taskItem.taskId === payload.task.taskId) {

      const newSubTasksList = taskItem.subTasks.subTasksList.map(subTaskItem => {
        if (subTaskItem.name === payload.subTaskName) {
          return {...subTaskItem, done: payload.subTaskStatus};
        }
        return subTaskItem;
      });

      return {
        ...taskItem, 
        subTasks: {
          ...taskItem.subTasks, 
          subTasksList: newSubTasksList
        }
      }
      
    }
    return;
  });
*/

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

  const newTaskArray = tasks.taskList.map(taskItem => {
    if (taskItem.taskId === payload.task.taskId) {
      return {...taskItem, subTasks: {...taskItem.subTasks, subTasksList: newSubTasksList}}
    }
    return taskItem;
  });

  yield put(settingTaskToStore(newTaskArray));
  
}