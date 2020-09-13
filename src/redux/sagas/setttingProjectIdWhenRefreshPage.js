import {call, put} from 'redux-saga/effects';
import {loadingData} from '../actions/loading';
import {getProjectsFromDataBase} from '../../api/projects';
import {searchElementInArray} from '../../utils/helpers';
import {fetchingTasksFromDataBase} from '../../redux/actions/tasks';

async function fetchProjectsArrayFromDB(userId) {
  try {
    const projects = await getProjectsFromDataBase(userId);
    return projects;
  } catch (error) {
    console.log(error);
  }
}

export function* setProjectIdWhenRefreshPage({payload}) {
  yield put(loadingData(true));
  const projectsArray = yield call(fetchProjectsArrayFromDB, payload.userId);
  yield put(loadingData(false));
  const project = searchElementInArray(projectsArray, payload.projectName, 'name');
  yield localStorage.setItem('activeProjectId', project.projectId);
  yield put(fetchingTasksFromDataBase(project.projectId))
}
