export function goaliesHasErrored(state = false, action) {
  switch (action.type) {
    case 'GOALIES_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function goaliesIsLoading(state = false, action) {
  switch (action.type) {
    case 'GOALIES_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function goalies(state = [], action) {
  switch (action.type) {
    case 'GOALIES_FETCH_DATA_SUCCESS':
      return action.goalies;

    default:
      return state;
  }
}