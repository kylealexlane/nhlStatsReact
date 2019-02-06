export function showButterLogo(state = false, action) {
  switch (action.type) {
    case 'SHOW_BUTTER_LOGO':
      return action.show;

    default:
      return state;
  }
}
