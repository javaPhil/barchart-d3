import * as actions from '../../actions/uiActions'
// import constants from '../../helpers/constants'
import uiReducer from '../uiReducer'

describe('UI reducer', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual(
      {
        drawerOpen: false
      }
    )
  })

  it('should handle SET_SIDENAV_OPEN', () => {
    expect(
      uiReducer([], {
        type: actions.SET_SIDENAV_OPEN,
        payload: false
      })
    ).toEqual(
      {
        drawerOpen: false
      }
    )
  })
})
