export function changeSidebarStatus(bool) {
  return {
    type: 'SIDEBAR_COLLAPSED',
    hasCollapsed: bool
  };
}