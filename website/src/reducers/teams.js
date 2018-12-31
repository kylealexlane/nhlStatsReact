export function teamsHasErrored(state = false, action) {
  switch (action.type) {
    case 'TEAMS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function teamsIsLoading(state = false, action) {
  switch (action.type) {
    case 'TEAMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function teams(state = [], action) {
  switch (action.type) {
    case 'TEAMS_FETCH_DATA_SUCCESS':
      return action.teams;

    default:
      return state;
  }
}