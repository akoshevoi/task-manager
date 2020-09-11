import {
  ADD_PROJECT,
  SET_PROJECTS_ARRAY_TO_STORE,
  SET_PROJECT_ID,
  SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  CHANGE_STATUS_TASK,
  ADD_DESCRIPTION_TO_TASK,
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
        activeProject: payload.project
      }
    case SET_TASKS_ARRAY_FROM_DB_TO_STORE:
      const latestProjectList = state.projectList.map(item => {
        if (item.projectId === payload.projectId) {
          return {...item, tasks: {...item.tasks, taskList: payload.taskList}}
        }
        return item
      })
    return {
      ...state,
      projectList: latestProjectList
    };
    case CHANGE_STATUS_TASK:
      const newProjectList = state.projectList.map(project => {
        if (project.projectId === payload.projectId) {
          const newTaskList = project.tasks.taskList.map(task => {
            if (task.name === payload.taskName) {
              return {...task, status: payload.status}
            }
            return task;
          })
          return {...project, tasks: {...project.tasks, taskList: newTaskList}}
        }
        return project;
      })
      return {
        ...state,
        projectList: newProjectList
      }
    case ADD_DESCRIPTION_TO_TASK:
      const updatedProjectList = state.projectList.map(project => {
        if (project.projectId === payload.projectId) {
          const newTaskList = project.tasks.taskList.map(task => {
            if (task.name === payload.taskName) {
              return {...task, description: payload.description}
            }
            return task
          })
          return {...project, tasks: {...project.tasks, taskList: newTaskList}}
        }
        return project;
      })
      return {
        ...state,
        projectList: updatedProjectList
      }
    default:
      return state;
  }
}