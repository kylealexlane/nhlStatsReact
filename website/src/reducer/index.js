import { combineReducers } from 'redux';
import { players, playersHasErrored, playersIsLoading } from '../reducers/players';
import { goalies, goaliesHasErrored, goaliesIsLoading } from '../reducers/goalies';
import { sidebarCollapsed } from '../reducers/sidebar'


const rootReducer = combineReducers({
  players,
  playersHasErrored,
  playersIsLoading,
  sidebarCollapsed,
  goalies,
  goaliesHasErrored,
  goaliesIsLoading
});

export default rootReducer;


