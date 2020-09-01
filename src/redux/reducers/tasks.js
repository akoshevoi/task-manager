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
      const index = currentTasksArray.findIndex(task => {
        return task.name === action.task.name
      });
      currentTasksArray[index].status = action.status;
      return currentTasksArray;
    case ADD_SUB_TASK:
      const initialTasksArray = [...state];
      const idx = initialTasksArray.findIndex(task => {
        console.log(task);
        console.log(action);
        return task.name === action.task.name
      });

      const findTask = initialTasksArray[idx];
      const initialSubTasks = findTask.subTasks;
      findTask.subTasks = [...initialSubTasks, action.subTask]
      return [...initialTasksArray];
    default: 
      return state;
  }
}

