import * as actions from '../uiActions'

describe('UI actions', () => {
  it('should change drawerOpen to true', () => {
    const bool = true
    const expectedAction = {
      type: actions.SET_SIDENAV_OPEN,
      payload: bool
    }
    expect(actions.setSideNavOpen(true)).toEqual(expectedAction)
  })
})
