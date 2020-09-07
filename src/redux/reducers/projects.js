import {
  addTaskToProject, 
  changingStatusTask, 
  addSubtaskToTask, 
  changingStatusSubTask,
  addDescriptionToTask,
  checkRepeatingProjectName
} from '../../utils/helpers';

import {
  ADD_PROJECT, 
  ADD_TASK, 
  CHANGE_STATUS_TASK, 
  ADD_SUB_TASK, 
  CHANGE_STATUS_SUB_TASK,
  ADD_DESCRIPTION_TO_TASK
} from '../types/types';

const initialState = [];
  
export const projects = (state = initialState, {type, payload}) => {
  const currentState = [...state];
  switch(type) {
    case ADD_PROJECT:
      const isValid = checkRepeatingProjectName(currentState, payload);
      if(isValid) {
        return [
          ...state,
          {
            name: payload,
            tasks: {
              taskList: []
            }
          }
        ]
      } else {
        return [
          ...state
        ]
      }
    case ADD_TASK:
     return addTaskToProject(currentState, payload);
    case CHANGE_STATUS_TASK:
      return changingStatusTask(currentState, payload);
    case ADD_SUB_TASK:
      return addSubtaskToTask(currentState, payload);
    case CHANGE_STATUS_SUB_TASK:
      return changingStatusSubTask(currentState, payload);
    case ADD_DESCRIPTION_TO_TASK:
      return addDescriptionToTask(currentState, payload);
    default:
      return state;
  }
}