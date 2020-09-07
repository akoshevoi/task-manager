import {combineReducers} from 'redux';
import {modal} from './modal';
import {projects} from './projects'
import {user} from './user';

export const rootReducer = combineReducers({
  projects, 
  modal,
  user
});