export function teamsHasErrored(bool) {
  return {
    type: 'TEAMS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function teamsIsLoading(bool) {
  return {
    type: 'TEAMS_IS_LOADING',
    isLoading: bool
  };
}

export function teamsFetchDataSuccess(teams) {
  return {
    type: 'TEAMS_FETCH_DATA_SUCCESS',
    teams
  };
}

export function teamsFetchData(url) {
  return (dispatch) => {
    dispatch(teamsIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((teams) => {
        dispatch(teamsFetchDataSuccess(teams));
        dispatch(teamsIsLoading(false));
      })
      .catch(() => {
        dispatch(teamsHasErrored(true));
        dispatch(teamsIsLoading(false));
      });
  };
}

export function teamInfoHasErrored(bool) {
  return {
    type: 'TEAM_INFO_HAS_ERRORED',
    hasErrored: bool
  };
}

export function teamInfoIsLoading(bool) {
  return {
    type: 'TEAM_INFO_IS_LOADING',
    isLoading: bool
  };
}

export function teamInfoFetchDataSuccess(teamInfo) {
  return {
    type: 'TEAM_INFO_FETCH_DATA_SUCCESS',
    teamInfo
  };
}

export function teamInfoFetchData(url) {
  return (dispatch) => {
    dispatch(teamInfoIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(teamInfoIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((teamInfo) => dispatch(teamInfoFetchDataSuccess(teamInfo)))
      .catch(() => dispatch(teamInfoHasErrored(true)));
  };
}