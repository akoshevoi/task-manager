import {take, call, put, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {settingProjectsArrayToStore, settingProjectsToStore} from '../actions/projects';
import {fetchingTasksFromDataBase} from '../actions/tasks';
import {loadingData} from '../actions/loading';
import {addProjectToDataBase, getProjectsFromDataBase} from '../../api/projects';
import {db} from '../../firebaseConfig';
import {searchElementInArray} from '../../utils/helpers';

async function fetchProjectsArrayFromDB(userId) {
  try {
    const projects = await getProjectsFromDataBase(userId);
    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function addingProjectToDataBase(userId, projectName) {
  try {
    await addProjectToDataBase(userId, projectName);
  } catch (error) {
    console.log(error)
  }
}

function createEventChannel() {
  const listener = eventChannel((emit) => {
    const unsubscribe = db.collection('projects').onSnapshot(async() => {
      const snapShot = await db.collection('projects').get();
      const docs = snapShot.docs;
      const itemList = docs.map(doc => doc.data());
      emit(itemList)
    })
    return () => unsubscribe();
  });
  return listener;
}

function* updatedItemSaga() {
  const updateChannel = createEventChannel();
  while (true) {
    const item = yield take(updateChannel);
    yield put(settingProjectsToStore(item));
  }
}

export function* addProject({payload}) {
  yield fork(updatedItemSaga);
  yield put(loadingData(true));
  yield call(addingProjectToDataBase, payload.userId, payload.projectName);
  yield put(loadingData(false));
}

export function* fetchProjects({payload}) {
  yield put(loadingData(true));
  const projects = yield call(fetchProjectsArrayFromDB, payload.userId);
  yield put(loadingData(false));
  yield put(settingProjectsArrayToStore(projects));
}

export function* setProjectIdWhenRefreshPage({payload}) {
  yield put(loadingData(true));
  const projectsArray = yield call(fetchProjectsArrayFromDB, payload.userId);
  yield put(loadingData(false));
  const project = searchElementInArray(projectsArray, payload.projectName, 'name');
  yield localStorage.setItem('activeProjectId', project.projectId);
  yield put(fetchingTasksFromDataBase(project.projectId))
}
