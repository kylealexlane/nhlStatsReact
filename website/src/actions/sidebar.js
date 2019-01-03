export function changeSidebarStatus(bool) {
  return {
    type: 'SIDEBAR_COLLAPSED',
    hasCollapsed: bool
  };
}

export function changeSidebarGoneStatus(bool) {
  return {
    type: 'SIDEBAR_GONE',
    isGone: bool
  };
}