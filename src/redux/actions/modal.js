import {MODAL_SHOW} from '../types/types';

export const showingModal = (isShowModal, task) => ({
  type: MODAL_SHOW,
  payload: { isShowModal, task }
})