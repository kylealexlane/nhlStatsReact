export function playerHasErrored(bool) {
  return {
    type: 'PLAYER_HAS_ERRORED',
    hasErrored: bool
  };
}

export function playerIsLoading(bool) {
  return {
    type: 'PLAYER_IS_LOADING',
    isLoading: bool
  };
}

export function playerFetchDataSuccess(player) {
  return {
    type: 'PLAYER_FETCH_DATA_SUCCESS',
    player
  };
}

export function playerFetchData(url) {
  return (dispatch) => {
    dispatch(playerIsLoading(true));
    fetch(url)
      .then((response) => {
        console.log("player response", response);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(playerIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((player) => dispatch(playerFetchDataSuccess(player.player_stats)))
      .catch(() => dispatch(playerHasErrored(true)));
  };
}

export function playerBioHasErrored(bool) {
  return {
    type: 'PLAYER_BIO_HAS_ERRORED',
    hasErrored: bool
  };
}

export function playerBioIsLoading(bool) {
  return {
    type: 'PLAYER_BIO_IS_LOADING',
    isLoading: bool
  };
}

export function playerBioFetchDataSuccess(playerBio) {
  return {
    type: 'PLAYER_BIO_FETCH_DATA_SUCCESS',
    playerBio
  };
}

export function playerFetchBio(url) {
  return (dispatch) => {
    dispatch(playerBioIsLoading(true));
    fetch(url)
      .then((response) => {
        console.log("player bio response", response);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(playerBioIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((player) => dispatch(playerBioFetchDataSuccess(player.people[0])))
      .catch(() => dispatch(playerBioHasErrored(true)));
  };
}