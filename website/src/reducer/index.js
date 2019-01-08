import { combineReducers } from 'redux';
import { players, playersHasErrored, playersIsLoading } from '../reducers/players';
import { player, playerHasErrored, playerIsLoading, playerBio, playerBioHasErrored, playerBioIsLoading } from '../reducers/player';
import { teams, teamsHasErrored, teamsIsLoading, teamInfo, teamInfoHasErrored, teamInfoIsLoading } from '../reducers/teams';
import { goalies, goaliesHasErrored, goaliesIsLoading } from '../reducers/goalies';
import { goalie, goalieHasErrored, goalieIsLoading, goalieBio, goalieBioHasErrored, goalieBioIsLoading } from '../reducers/goalie';
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
  teamInfo,
  teamInfoHasErrored,
  teamInfoIsLoading,
  goalie,
  goalieHasErrored,
  goalieIsLoading,
  goalieBio,
  goalieBioHasErrored,
  goalieBioIsLoading
});

export default rootReducer;


