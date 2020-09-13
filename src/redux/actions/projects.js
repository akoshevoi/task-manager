import {
  ADD_PROJECT, 
  SET_PROJECT_ID,
  FETCH_PROJECTS_ARRAY_FROM_DB,
  SET_PROJECTS_ARRAY_TO_STORE,
  SET_PROJECTS_TO_STORE,
  SET_PROJECT_ID_WHEN_REFRESH_PAGE
} from '../types/types';

export const settingProjectId = projectId => ({
  type: SET_PROJECT_ID,
  payload: { projectId }
})

export const settingProjectIdWhenRefreshPage = (userId, projectName) => ({
  type: SET_PROJECT_ID_WHEN_REFRESH_PAGE,
  payload: { userId, projectName }
})

export const fetchingProjectsArrayFromDB = userId => ({
  type: FETCH_PROJECTS_ARRAY_FROM_DB,
  payload: { userId }
})

export const settingProjectsArrayToStore = projectArray => ({
  type: SET_PROJECTS_ARRAY_TO_STORE,
  payload: { projectArray }
})

export const addingProject = (userId, projectName) => ({
  type: ADD_PROJECT,
  payload: { userId, projectName }
})

export const settingProjectsToStore = project => ({
  type: SET_PROJECTS_TO_STORE,
  payload: { project }
})
