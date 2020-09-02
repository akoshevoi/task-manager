import {
  ADD_TASK, 
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK, 
  CHANGE_STATUS_SUB_TASK
} from '../types/types';

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
        return task.name === action.task.name
      });
      const findTask = initialTasksArray[idx];
      const initialSubTasks = findTask.subTasks;
      findTask.subTasks = [...initialSubTasks, action.subTask]
      return [...initialTasksArray];
    case CHANGE_STATUS_SUB_TASK:
      const startingTasksArray = [...state];
      const nameMainTask = action.task.name;
      const searchingTask = startingTasksArray.find(item => {
        return item.name === nameMainTask
        ? item.subTasks
        : null
      });
      const initialSubTasksArray = searchingTask.subTasks;
      const findingSubTask = initialSubTasksArray.find(subTask => {
        return subTask.name === action.nameSubtask;
      });
      findingSubTask.done = action.status;
      return startingTasksArray;
    default: 
      return state;
  }
}

