import {ADD_TASK} from '../types/types';

export const addingTask = task => ({
  type: ADD_TASK,
  payload: task
})