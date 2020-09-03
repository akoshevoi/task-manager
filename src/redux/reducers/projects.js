import {ADD_PROJECT, ADD_TASK, CHANGE_STATUS_TASK, ADD_SUB_TASK,} from '../types/types';

const initialState = [];
  
export const projects = (state = initialState, {type, payload}) => {
  const currentState = [...state];
  switch(type) {
    case ADD_PROJECT:
      return [
        ...state,
        {
          name: payload,
          tasks: {
            taskList: []
          }
        }
        
      ]
    case ADD_TASK:
      /*
      const findingProject = currentState.find(item => item.name === payload.project);
      const isHasTasks = findingProject.hasOwnProperty('tasks');
      if (isHasTasks) {
        findingProject.tasks.taskList.push(payload.task)
      } else {
        findingProject.tasks = {
          taskList: [
            {...payload.task}
          ]
        }
      }
      break;
      */
/*
      currentState.map(item => {
        if (item.hasOwnProperty('tasks')) {
          item.tasks.taskList.push(payload.task);
        } else {
          item.tasks = {
            taskList: [
              {...payload.task}
            ]
          }
        }
      })
      */
 
      currentState.map(item => {
        if (item.name === payload.project) {
          item.tasks.taskList = [
            ...item.tasks.taskList,
            payload.task
          ]
        }
      })
      return currentState;
      case CHANGE_STATUS_TASK:
        for (let project of currentState) {
          if (project.name === payload.project) {
            for (let task of project.tasks.taskList) {
              if (task.name === payload.task.name) {
                task.status = payload.status;
              }    
            }
          }
        }
        return currentState;
      case ADD_SUB_TASK:
        for (let project of currentState) {
          if (project.name === payload.project) {
            for (let task of project.tasks.taskList) {
              if (task.name === payload.task.name) {
                task.subTasks = [
                  ...task.subTasks,
                  payload.subTask
                ]
              }    
            }
          }
        }
    default:
      return state;
  }
}