import {MODAL_SHOW} from '../types/types';

export const showingModal = (boolean, task) => ({
  type: MODAL_SHOW,
  payload: boolean,
  target: task
})