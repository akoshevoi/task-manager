import {USER_AUTHENTICATED} from '../types/types';

export const authenticationUser = user => ({
  type: USER_AUTHENTICATED,
  payload: user
})