import {take, call, put, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {settingProjectsToStore} from '../actions/projects';
import {loadingData} from '../actions/loading';
import {saveUserById} from '../../api/projects';
import {db} from '../../firebaseConfig';

async function addingUserToDataBase(uid, name, email) {
  try {
    await saveUserById(uid, name, email);
  } catch (error) {
    console.log(error)
  }
}

function createEventChannel() {
  const listener = eventChannel((emit) => {
    const unsubscribe = db.collection('users').onSnapshot(async() => {
      const snapShot = await db.collection('users').get();
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

export function* addUser({payload}) {
  yield fork(updatedItemSaga);
  yield put(loadingData(true));
  yield call(addingUserToDataBase, payload.uid, payload.name, payload.email);
  yield put(loadingData(false));
}