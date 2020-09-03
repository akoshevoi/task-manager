import {MODAL_SHOW} from '../types/types';

const initialState = {
  isShow: false,
  task: {
    description: '',
    subTasks: []
  }
}

export const modal = (state = initialState, action) => {
  switch(action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        isShow: action.payload,
        task: action.target,
      }
    default:
      return state;
  }
}