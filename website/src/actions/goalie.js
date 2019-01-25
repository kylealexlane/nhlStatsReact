export function goalieHasErrored(bool) {
  return {
    type: 'GOALIE_HAS_ERRORED',
    hasErrored: bool
  };
}

export function goalieIsLoading(bool) {
  return {
    type: 'GOALIE_IS_LOADING',
    isLoading: bool
  };
}

export function goalieFetchDataSuccess(goalie) {
  return {
    type: 'GOALIE_FETCH_DATA_SUCCESS',
    goalie
  };
}

export function goalieFetchData(url) {
  return (dispatch) => {
    dispatch(goalieIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(goalieIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((goalie) => dispatch(goalieFetchDataSuccess(goalie.goalie_stats)))
      .catch(() => dispatch(goalieHasErrored(true)));
  };
}

export function goalieBioHasErrored(bool) {
  return {
    type: 'GOALIE_BIO_HAS_ERRORED',
    hasErrored: bool
  };
}

export function goalieBioIsLoading(bool) {
  return {
    type: 'GOALIE_BIO_IS_LOADING',
    isLoading: bool
  };
}

export function goalieBioFetchDataSuccess(goalieBio) {
  return {
    type: 'GOALIE_BIO_FETCH_DATA_SUCCESS',
    goalieBio
  };
}

export function goalieFetchBio(url) {
  return (dispatch) => {
    dispatch(goalieBioIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(goalieBioIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((goalie) => dispatch(goalieBioFetchDataSuccess(goalie.people[0])))
      .catch(() => dispatch(goalieBioHasErrored(true)));
  };
}