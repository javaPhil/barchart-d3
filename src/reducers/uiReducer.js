import constants from '../helpers/constants'
import * as uiActions from '../actions/uiActions'

export default (state = constants.DEFAULT_UI_STORE, action) => {
  switch (action.type) {
    case uiActions.SET_SIDENAV_OPEN: {
      return Object.assign({}, state, {
        drawerOpen: action.payload
      })
    }
    default:
      return state
  }
}
