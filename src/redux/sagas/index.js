import {takeEvery} from 'redux-saga/effects';
import {
  FETCH_PROJECTS_ARRAY_FROM_DB, 
  ADD_PROJECT,
  ADD_TASK,
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

export function* sagaWatcher() {
  yield takeEvery(FETCH_PROJECTS_ARRAY_FROM_DB, fetchProjects);
  yield takeEvery(ADD_PROJECT, addProject);
  yield takeEvery(ADD_TASK, addTask);
  yield takeEvery(CHANGE_STATUS_TASK, changeStatusTask);
  yield takeEvery(ADD_DESCRIPTION_TO_TASK, addDescriptionToTask);
  yield takeEvery(ADD_SUB_TASK, addSubTask);
  yield takeEvery(CHANGE_STATUS_SUB_TASK, changeSubTaskStatus);
}