import {
  SET_PROJECTS_ARRAY_FROM_DB_TO_STORE,
  SET_PROJECT_ID
} from '../types/types';

const initialState = {
  projectList: [],
};
  
export const projects = (state = initialState, {type, payload}) => {
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
    default:
      return state;
  }
}