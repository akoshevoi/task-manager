import {
  SET_PROJECTS_ARRAY_TO_STORE,
  SET_PROJECT_ID,
  SET_PROJECTS_TO_STORE
} from '../types/types';

const initialState = {
  projectList: [],
};
  
export const projects = (state = initialState, {type, payload}) => {
  switch(type) {
    case SET_PROJECTS_ARRAY_TO_STORE: 
      return {
        ...state,
        activeProject: state.activeProject ? state.activeProject : '',
        projectList: payload.projectArray
      }
    case SET_PROJECTS_TO_STORE: 
      return {
        ...state,
        projectList: payload.project
      };
    case SET_PROJECT_ID:
      return {
        ...state,
        activeProject: payload.projectId
      }
    default:
      return state;
  }
}