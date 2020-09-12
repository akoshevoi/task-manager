import {combineReducers} from 'redux';
import {modal} from './modal';
import {projects} from './projects'
import {user} from './user';
import {isLoading} from './loading';

export const rootReducer = combineReducers({
  projects, 
  modal,
  user,
  isLoading
});