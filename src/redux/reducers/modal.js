import {MODAL_SHOW} from '../types/types';

export const modalIsOpen = (state = false, action) => {
  switch(action.type) {
    case MODAL_SHOW:
      return action.payload;
    default:
      return state;
  }
}