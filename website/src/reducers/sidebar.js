export function sidebarCollapsed(state = false, action) {
  switch (action.type) {
    case 'SIDEBAR_COLLAPSED':
      return action.hasCollapsed;

    default:
      return state;
  }
}