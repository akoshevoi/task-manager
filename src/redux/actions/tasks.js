import {
  ADD_TASK_TO_DATA_BASE,
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK,
  CHANGE_STATUS_SUB_TASK,
  ADD_DESCRIPTION_TO_TASK,
  SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  SET_TASK_TO_STORE,
  FETCH_TASKS_FROM_DATA_BASE
} from '../types/types';

export const fetchingTasksFromDataBase = projectId => ({
  type: FETCH_TASKS_FROM_DATA_BASE,
  payload: { projectId }
})

export const settingTaskArrayFromDataBaseToStore = taskList => ({
  type: SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  payload: { taskList }
})

export const settingTaskToStore = taskList => ({
  type: SET_TASK_TO_STORE,
  payload: { taskList }
})

export const addingTaskToDataBase = (userId, projectId, projectName, taskName, taskStatus) => ({
  type: ADD_TASK_TO_DATA_BASE,
  payload: { userId, projectId, projectName, taskName, taskStatus }
})

export const changingStatusTask = (taskId, updatedTaskStatus) => ({
  type: CHANGE_STATUS_TASK,
  payload: { taskId, updatedTaskStatus }
})

export const addingDescriptionToTask = (taskId, description) => ({
  type: ADD_DESCRIPTION_TO_TASK,
  payload: { taskId, description }
})

export const addingSubTask = (task, subTask) => ({
  type: ADD_SUB_TASK,
  payload: {task, subTask}
})

export const changingStatusSubTask = (task, subTaskName, subTaskStatus) => ({
  type: CHANGE_STATUS_SUB_TASK,
  payload: { task, subTaskName, subTaskStatus }
})
