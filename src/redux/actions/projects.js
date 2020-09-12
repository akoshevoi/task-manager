import {
  ADD_PROJECT, 
  ADD_TASK, 
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK,
  CHANGE_STATUS_SUB_TASK,
  ADD_DESCRIPTION_TO_TASK,
  SET_PROJECT_ID,
  SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  FETCH_PROJECTS_ARRAY_FROM_DB,
  SET_PROJECTS_ARRAY_TO_STORE,
  SET_PROJECTS_TO_STORE
} from '../types/types';

export const settingProjectId = projectId => ({
  type: SET_PROJECT_ID,
  payload: { projectId }
})

export const settingTaskArrayFromDbToStore = (projectId, taskList) => ({
  type: SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  payload: { projectId, taskList }
})

export const fetchingProjectsArrayFromDB = userId => ({
  type: FETCH_PROJECTS_ARRAY_FROM_DB,
  payload: { userId }
})

export const settingProjectsArrayToStore = projectArray => ({
  type: SET_PROJECTS_ARRAY_TO_STORE,
  payload: { projectArray }
})


//==========
export const addingProject = (projectName, userId) => ({
  type: ADD_PROJECT,
  payload: { projectName, userId }
})

export const settingProjectsToStore = project => ({
  type: SET_PROJECTS_TO_STORE,
  payload: { project }
})

export const addingTask = (projectId, taskName, taskStatus) => ({
  type: ADD_TASK,
  payload: { projectId, taskName, taskStatus }
})

export const changingStatusTask = (projectId, taskName, updatedTaskStatus) => ({
  type: CHANGE_STATUS_TASK,
  payload: { projectId, taskName, updatedTaskStatus }
})

export const addingSubTask = (task, subTask) => ({
  type: ADD_SUB_TASK,
  payload: {task, subTask}
})

export const changingStatusSubTask = (task, subTaskName, subTaskStatus) => ({
  type: CHANGE_STATUS_SUB_TASK,
  payload: { task, subTaskName, subTaskStatus }
})

export const addingDescriptionToTask = (projectId, taskName, description) => ({
  type: ADD_DESCRIPTION_TO_TASK,
  payload: { projectId, taskName, description }
})
