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

export function changeScreenWidth(int) {
  return {
    type: 'SCREEN_WIDTH_CHANGE',
    screenWidth: int
  };
}

export function isMobileMode(bool) {
  return {
    type: 'IS_MOBILE_MODE',
    isMobileMode: bool
  };
}