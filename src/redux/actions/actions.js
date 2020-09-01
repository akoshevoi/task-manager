import {
  ADD_TASK, 
  CHANGE_STATUS_TASK, 
  ADD_SUB_TASK, 
  MODAL_SHOW
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

export const addingSubTask = (subTask, task) => ({
  type: ADD_SUB_TASK,
  subTask,
  task
});

export const showingModal = (boolean, id, taskId) => ({
  type: MODAL_SHOW,
  boolean,
  id,
  taskId
})
