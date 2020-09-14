import {SIGN_UP_USER, USER_AUTHENTICATED} from '../types/types';

export const signUpUser = (uid, name, email) => ({
  type: SIGN_UP_USER,
  payload: { uid, name, email }
})

export const authenticationUser = user => ({
  type: USER_AUTHENTICATED,
  payload: { user }
})