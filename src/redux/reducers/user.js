import {USER_AUTHENTICATED} from '../types/types';

const initialState = {};

export const user = (state = initialState, {type, payload}) => {
  switch(type) {
    case USER_AUTHENTICATED:
      return payload;
    default:
      return state;
  }
};