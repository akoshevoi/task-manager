import {
  ADD_PROJECT, 
  ADD_TASK, 
  ADD_SUB_TASK, 
  CHANGE_STATUS_TASK,
  CHANGE_STATUS_SUB_TASK,
  ADD_DESCRIPTION_TO_TASK,
  SET_PROJECTS_ARRAY_FROM_DB_TO_STORE,
  SET_PROJECT_ID,
  SET_TASKS_ARRAY_FROM_DB_TO_STORE

  GET_PROJECT,
  SET_PROJECT,
} from '../types/types';

export const settingProjectArrayFromDbToStore = projectArray => ({
  type: SET_PROJECTS_ARRAY_FROM_DB_TO_STORE,
  payload: { projectArray }
})

export const settingProjectId = projectId => ({
  type: SET_PROJECT_ID,
  payload: { projectId }
})

export const settingTaskArrayFromDbToStore = (projectId, taskList) => ({
  type: SET_TASKS_ARRAY_FROM_DB_TO_STORE,
  payload: {projectId, taskList}
})

/*/
const updateTasksArray = async () => {
  try {
    const fetchedProject = await getProjectFromDB(projectId);
    const {tasks} = fetchedProject;
    dispatch(settingTaskArrayFromDbToStore(projectId, tasks.taskList));
    console.log('FETCH LATEST', {fetchedProject})
  } catch (error) {
    console.log(error);
  }
}*/


export const gettingProject = projectId => ({
  type: GET_PROJECT,
  payload: { project }
})

export const settingProject = project => ({
  type: SET_PROJECT,
  payload: { project }
})

//==========
export const addingProject = project => ({
  type: ADD_PROJECT,
  payload: { project }
})

export const addingTask = (project, task) => ({
  type: ADD_TASK,
  payload: {project, task}
})

export const changingStatusTask = (projectId, taskName, status) => ({
  type: CHANGE_STATUS_TASK,
  payload: {projectId, taskName, status}
})

export const addingSubTask = (project, task, subTask) => ({
  type: ADD_SUB_TASK,
  payload: {project, task, subTask}
})

export const changingStatusSubTask = (project, task, nameSubtask, status) => ({
  type: CHANGE_STATUS_SUB_TASK,
  payload: {project, task, nameSubtask, status}
})

export const addingDescriptionToTask = (project, task, description) => ({
  type: ADD_DESCRIPTION_TO_TASK,
  payload: {project, task, description}
})
