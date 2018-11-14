import constants from '../helpers/constants'
import * as dashboardActions from '../actions/dashboardActions'

export default (state = constants.DEFAULT_DASHBOARD_STORE, action) => {
  switch (action.type) {
    case dashboardActions.SET_URL_PARAM: {
      switch (action.payload.name) {
        case 'paused':
          return Object.assign({}, state, {
            urlParams: {
              ...state.urlParams,
              paused: action.payload.value
            }
          })
        case 'year':
          return Object.assign({}, state, {
            urlParams: {
              ...state.urlParams,
              year: action.payload.value
            }
          })
        default:
          return state
      }
    }
    case dashboardActions.SET_PIG_DATA:
      return Object.assign({}, state, { data: action.payload })
    default:
      return state
  }
}
