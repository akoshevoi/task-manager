import {
  ADD_TASK, 
  MODAL_SHOW,
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK,
  CHANGE_STATUS_SUB_TASK
} from '../types/types';

export const addingTask = task => ({
  type: ADD_TASK,
  payload: task
});

export const changingStatusTask = (task, status) => ({
  type: CHANGE_STATUS_TASK,
  task,
  status
});

export const addingSubTask = (task, subTask) => ({
  type: ADD_SUB_TASK,
  task,
  subTask
});

export const showingModal = (boolean, task) => ({
  type: MODAL_SHOW,
  payload: boolean,
  target: task
});

export const changingStatusSubTask = (task, nameSubtask, status) => ({
  type: CHANGE_STATUS_SUB_TASK,
  task,
  nameSubtask,
  status
});
