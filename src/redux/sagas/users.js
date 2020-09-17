import {take, call, put, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {authenticationUser} from '../actions/user';
import {loadingData} from '../actions/loading';
import {saveUserById} from '../../api/users';
import {db} from '../../firebaseConfig';

async function addingUserToDataBase(uid, name, email) {
  try {
    await saveUserById(uid, {uid,name,email});
  } catch (error) {
    console.log(error)
  }
}

function createEventChannel(uid) {
  const listener = eventChannel((emit) => {
    const unsubscribe = db.collection('users').doc(uid).onSnapshot(async() => {
      const snapShot = await db.collection('users').doc(uid).get();
      const user = snapShot.data();
      emit(user);
    })
    return () => unsubscribe();
  });
  return listener;
}

function* updatedItemSaga(uid) {
  const updateChannel = createEventChannel(uid);
  while (true) {
    const item = yield take(updateChannel);
    console.log('sagas: ', item);
    yield put(authenticationUser(item));
  }
}

export function* addUser({payload}) {
  yield fork(updatedItemSaga, payload.uid);
  yield put(loadingData(true));
  yield call(addingUserToDataBase, payload.uid, payload.name, payload.email);
  yield put(loadingData(false));
  yield put(authenticationUser(payload.uid, payload.name, payload.email));
}