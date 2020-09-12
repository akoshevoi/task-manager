import {IS_LOADING} from '../types/types';

export const isLoading = (state = false, {type, payload}) => {
  switch(type) {
    case IS_LOADING:
      return payload.isLoading
    default:
      return state;
  }
}