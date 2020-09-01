import {ADD_TASK, CHANGE_STATUS_TASK, ADD_SUB_TASK} from '../types/types';

export const tasks = (state = [], action) => {
  switch(action.type) {
    case ADD_TASK:
      return [
        ...state,
        {...action.payload, subTasks: []}
      ];
    case CHANGE_STATUS_TASK: 
      const currentTasksArray = [...state];
      const index = currentTasksArray.findIndex(task => task.name === action.task.name);
      currentTasksArray[index].status = action.status;
      return currentTasksArray;
    case ADD_SUB_TASK:
      const initialTasksArray = [...state];
      const idx = initialTasksArray.findIndex(task => task.name === action.task.name);
      const findTask = initialTasksArray[idx];
      const initialSubTasks = findTask.subTasks;
      /*
      findTask.subTasks = initialSubTasks
      ? [...initialSubTasks, action.subTask]
      : [action.subTask];
      */
      findTask.subTasks = [...initialSubTasks, action.subTask]
      return [...initialTasksArray];

    default: 
      return state;
  }
}

