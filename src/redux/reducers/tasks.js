import {
  SET_TASK_TO_STORE,
  SET_TASKS_ARRAY_FROM_DB_TO_STORE
} from '../types/types';

const initialState = {
  taskList: []
}

export const tasks = (state = initialState, {type, payload}) => {
  switch(type) {
    case SET_TASK_TO_STORE:
      return {
        ...state,
        taskList: payload.taskList
      };
    case SET_TASKS_ARRAY_FROM_DB_TO_STORE:
      return {
        ...state,
        taskList: payload.taskList
      };
    default:
      return state;
  }
}