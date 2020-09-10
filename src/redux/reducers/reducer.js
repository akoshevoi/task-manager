import {SET_PROJECT} from '../types/types';

const initialState = {
  data: {

  }
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PROJECT:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}