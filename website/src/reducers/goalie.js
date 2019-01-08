export function goalieHasErrored(state = false, action) {
  switch (action.type) {
    case 'GOALIE_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function goalieIsLoading(state = false, action) {
  switch (action.type) {
    case 'GOALIE_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function goalie(state = [], action) {
  switch (action.type) {
    case 'GOALIE_FETCH_DATA_SUCCESS':
      return action.goalie;

    default:
      return state;
  }
}

export function goalieBioHasErrored(state = false, action) {
  switch (action.type) {
    case 'GOALIE_BIO_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function goalieBioIsLoading(state = false, action) {
  switch (action.type) {
    case 'GOALIE_BIO_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function goalieBio(state = [], action) {
  switch (action.type) {
    case 'GOALIE_BIO_FETCH_DATA_SUCCESS':
      return action.goalieBio;

    default:
      return state;
  }
}