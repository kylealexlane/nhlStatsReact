export function playersHasErrored(bool) {
  return {
    type: 'PLAYERS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function playersIsLoading(bool) {
  return {
    type: 'PLAYERS_IS_LOADING',
    isLoading: bool
  };
}

export function playersFetchDataSuccess(players) {
  return {
    type: 'PLAYERS_FETCH_DATA_SUCCESS',
    players
  };
}

export function playersFetchData(url) {
  return (dispatch) => {
    dispatch(playersIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((players) => {
        dispatch(playersFetchDataSuccess(players.player_stats));
        dispatch(playersIsLoading(false));
      })
      .catch(() => {
        dispatch(playersHasErrored(true));
        dispatch(playersIsLoading(false));
      });
  };
}