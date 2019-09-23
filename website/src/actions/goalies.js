export function goaliesHasErrored(bool) {
  return {
    type: 'GOALIES',
    hasErrored: bool
  };
}

export function goaliesIsLoading(bool) {
  return {
    type: 'GOALIES_IS_LOADING',
    isLoading: bool
  };
}

export function goaliesFetchDataSuccess(goalies) {
  return {
    type: 'GOALIES_FETCH_DATA_SUCCESS',
    goalies
  };
}

export function goaliesFetchData(url) {
  return (dispatch) => {
    dispatch(goaliesIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((goalies) => {
        dispatch(goaliesFetchDataSuccess(goalies.goalie_stats));
        dispatch(goaliesIsLoading(false));
      })
      .catch(() => {
        dispatch(goaliesHasErrored(true));
        dispatch(goaliesIsLoading(false));
      });
  };
}