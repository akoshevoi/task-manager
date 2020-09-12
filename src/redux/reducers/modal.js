import {MODAL_SHOW} from '../types/types';

const initialState = {
  isShow: false,
  task: {
    description: '',
    subTasks: []
  }
}

export const modal = (state = initialState, {type, payload}) => {
  switch(type) {
    case MODAL_SHOW:
      return {
        ...state,
        isShow: payload.isShowModal,
        task: payload.task,
      }
    default:
      return state;
  }
}