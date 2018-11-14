import { combineReducers } from 'redux'
import dashboardReducer from './dashboardReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  uiReducer,
  dashboardReducer
})
