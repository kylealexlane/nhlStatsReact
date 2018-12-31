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
        console.log(response);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(teamsIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((teams) => dispatch(teamsFetchDataSuccess(teams)))
      .catch(() => dispatch(teamsHasErrored(true)));
  };
}