import {ADD_TASK, CHANGE_STATUS_TASK, ADD_SUB_TASK, MODAL_SHOW} from '../types/types';

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

export const showingModal = boolean => ({
  type: MODAL_SHOW,
  payload: boolean
})
