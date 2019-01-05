import { combineReducers } from 'redux';
import { players, playersHasErrored, playersIsLoading } from '../reducers/players';
import { player, playerHasErrored, playerIsLoading, playerBio, playerBioHasErrored, playerBioIsLoading } from '../reducers/player';
import { teams, teamsHasErrored, teamsIsLoading } from '../reducers/teams';
import { goalies, goaliesHasErrored, goaliesIsLoading } from '../reducers/goalies';
import { sidebarCollapsed, sidebarGone } from '../reducers/sidebar'


const rootReducer = combineReducers({
  players,
  playersHasErrored,
  playersIsLoading,
  sidebarCollapsed,
  sidebarGone,
  goalies,
  goaliesHasErrored,
  goaliesIsLoading,
  teams,
  teamsHasErrored,
  teamsIsLoading,
  player,
  playerHasErrored,
  playerIsLoading,
  playerBio,
  playerBioHasErrored,
  playerBioIsLoading,
});

export default rootReducer;


