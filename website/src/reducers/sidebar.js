export function sidebarCollapsed(state = false, action) {
  switch (action.type) {
    case 'SIDEBAR_COLLAPSED':
      return action.hasCollapsed;

    default:
      return state;
  }
}

export function sidebarGone(state = false, action) {
  switch (action.type) {
    case 'SIDEBAR_GONE':
      return action.isGone;

    default:
      return state;
  }
}

export function screenWidth(state = 0, action) {
  switch (action.type) {
    case 'SCREEN_WIDTH_CHANGE':
      return action.screenWidth;

    default:
      return state;
  }
}

export function isMobileMode(state = false, action) {
  switch (action.type) {
    case 'IS_MOBILE_MODE':
      return action.isMobileMode;

    default:
      return state;
  }
}