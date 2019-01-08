export function playerHasErrored(state = false, action) {
  switch (action.type) {
    case 'PLAYER_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function playerIsLoading(state = false, action) {
  switch (action.type) {
    case 'PLAYER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function player(state = [], action) {
  switch (action.type) {
    case 'PLAYER_FETCH_DATA_SUCCESS':
      return action.player;

    default:
      return state;
  }
}

export function playerBioHasErrored(state = false, action) {
  switch (action.type) {
    case 'PLAYER_BIO_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function playerBioIsLoading(state = false, action) {
  switch (action.type) {
    case 'PLAYER_BIO_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function playerBio(state = [], action) {
  switch (action.type) {
    case 'PLAYER_BIO_FETCH_DATA_SUCCESS':
      return action.playerBio;

    default:
      return state;
  }
}