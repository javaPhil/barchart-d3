// UI store is a little overkill for this example project but it gives a place to expand upon later if necessary

export const SET_SIDENAV_OPEN = 'SET_SIDENAV_OPEN'
export function setSideNavOpen (bool) {
  return {
    type: SET_SIDENAV_OPEN,
    payload: bool
  }
}
