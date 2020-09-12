import {IS_LOADING} from '../types/types';

export const loadingData = isLoading => ({
  type: IS_LOADING,
  payload: { isLoading }
})