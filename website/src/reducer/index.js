import { combineReducers } from 'redux';
import { players, playersHasErrored, playersIsLoading } from '../reducers/players';
import { sidebarCollapsed } from '../reducers/sidebar'


const rootReducer = combineReducers({
  players,
  playersHasErrored,
  playersIsLoading,
  sidebarCollapsed
});

export default rootReducer;


