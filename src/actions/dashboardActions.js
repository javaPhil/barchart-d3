import addParamToUrlQuery from '../helpers/addParamToUrlQuery'

export const SET_URL_PARAM = 'SET_URL_PARAM'
export function setURLParam (name, value) {
  addParamToUrlQuery(name, value)
  return {
    type: SET_URL_PARAM,
    payload: {
      name, value
    }
  }
}

export const SET_PIG_DATA = 'SET_PIG_DATA'
export function setPigData (data) {
  return {
    type: SET_PIG_DATA,
    payload: data
  }
}
