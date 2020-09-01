import {MODAL_SHOW} from '../types/types';

export const modalIsOpen = (state = false, action) => {
  /*
  switch(action.type) {
    case MODAL_SHOW:
      return action.payload;
    default:
      return state;
  }
  */
  if(action.type === MODAL_SHOW && action.id === action.taskId) {
    return action.boolean;
  } else {
    return state;
  }
}