import {
  ADD_PROJECT, 
  ADD_TASK, 
  MODAL_SHOW,
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK,
  CHANGE_STATUS_SUB_TASK,
  ADD_DESCRIPTION_TO_TASK,
  USER_AUTHENTICATED
} from '../types/types';

export const addingProject = project => ({
  type: ADD_PROJECT,
  payload: project
});

export const addingTask = (project, task) => ({
  type: ADD_TASK,
  payload: {project, task}
  
});

export const changingStatusTask = (project, task, status) => ({
  type: CHANGE_STATUS_TASK,
  payload: {project, task, status}
});

export const addingSubTask = (project, task, subTask) => ({
  type: ADD_SUB_TASK,
  payload: {project, task, subTask}
});

export const showingModal = (boolean, task) => ({
  type: MODAL_SHOW,
  payload: boolean,
  target: task
});

export const changingStatusSubTask = (project, task, nameSubtask, status) => ({
  type: CHANGE_STATUS_SUB_TASK,
  payload: {project, task, nameSubtask, status}
});

export const addingDescriptionToTask = (project, task, description) => ({
  type: ADD_DESCRIPTION_TO_TASK,
  payload: {project, task, description}
});

export const authenticationUser = user => ({
  type: USER_AUTHENTICATED,
  payload: user
})