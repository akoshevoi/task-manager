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
  ADD_DESCRIPTION_TO_TASK,
  SET_PROJECTS_ARRAY_FROM_DB_TO_STORE,
  SET_PROJECT_ID
} from '../types/types';

const initialState = {
  projectList: [],
};
  
export const projects = (state = initialState, {type, payload}) => {
  // const currentState = [...state];
  switch(type) {
    case SET_PROJECTS_ARRAY_FROM_DB_TO_STORE: 
      return {
        ...state,
        activeProject: '',
        projectList: payload.projectArray
      }
    case SET_PROJECT_ID:
      return {
        ...state,
        activeProject: payload
      }
    /*
    case ADD_PROJECT:
      return {
        ...state,
        activeProject: '',
        projectList: [ ...state.projectList, payload.project]
      };
      */
/*
    case ADD_TASK:{
      const projectList = addTaskToProject(state, payload);
     return {
       ...state,
       projectList,
      }
    }
    */
    /* case CHANGE_STATUS_TASK:
      return changingStatusTask(currentState, payload);
    case ADD_SUB_TASK:
      return addSubtaskToTask(currentState, payload);
    case CHANGE_STATUS_SUB_TASK:
      return changingStatusSubTask(currentState, payload);
    case ADD_DESCRIPTION_TO_TASK:
      return addDescriptionToTask(currentState, payload); */
    default:
      return state;
  }
}