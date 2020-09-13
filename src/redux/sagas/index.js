import {takeEvery} from 'redux-saga/effects';
import {
  FETCH_PROJECTS_ARRAY_FROM_DB, 
  ADD_PROJECT,
  FETCH_TASKS_FROM_DATA_BASE,
  ADD_TASK_TO_DATA_BASE,
  CHANGE_STATUS_TASK,
  ADD_DESCRIPTION_TO_TASK,
  ADD_SUB_TASK,
  CHANGE_STATUS_SUB_TASK
} from '../types/types';

import {addProject} from './addingProject';
import {addTask} from './addingTask';
import {changeStatusTask} from './changingTaskStatus';
import {addDescriptionToTask} from './addingDescriptionTask';
import {addSubTask} from './addingSubTask';
import {changeSubTaskStatus} from './changingSubTaskStatus';
import {fetchProjects} from './fetchingProjects';
import {fetchTasks} from './fetchingTasks';

export function* sagaWatcher() {
  yield takeEvery(FETCH_PROJECTS_ARRAY_FROM_DB, fetchProjects);
  yield takeEvery(ADD_PROJECT, addProject);
  yield takeEvery(FETCH_TASKS_FROM_DATA_BASE, fetchTasks);
  yield takeEvery(ADD_TASK_TO_DATA_BASE, addTask);
  yield takeEvery(CHANGE_STATUS_TASK, changeStatusTask);
  yield takeEvery(ADD_DESCRIPTION_TO_TASK, addDescriptionToTask);
  yield takeEvery(ADD_SUB_TASK, addSubTask);
  yield takeEvery(CHANGE_STATUS_SUB_TASK, changeSubTaskStatus);
}