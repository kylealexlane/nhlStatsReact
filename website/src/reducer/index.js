import { combineReducers } from 'redux';
import { players, playersHasErrored, playersIsLoading } from '../reducers/players';


const rootReducer = combineReducers({
  players,
  playersHasErrored,
  playersIsLoading
});

export default rootReducer;


