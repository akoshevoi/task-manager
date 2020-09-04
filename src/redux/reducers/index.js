import {combineReducers} from 'redux';
import {modal} from './modal';
import {projects} from './projects'

export const rootReducer = combineReducers({
  projects, 
  modal
});