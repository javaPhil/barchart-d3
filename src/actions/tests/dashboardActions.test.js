import * as actions from '../dashboardActions'
import constants from '../../helpers/constants'

describe('Dashboard actions', () => {
  it('should set the paused url parameter to false', () => {
    const value = true
    const name = constants.URL_PARAM_PAUSED
    const expectedAction = {
      type: actions.SET_URL_PARAM,
      payload: {
        name, value
      }
    }
    expect(actions.setURLParam(name, value)).toEqual(expectedAction)
  })

  it('should set pig data', () => {
    const pigData = { 'ZOMG PIGS': [
      { id: 1,
        name: 'Oinkers'
      },
      {
        id: 2,
        name: 'Frankfurter'
      }
    ] }

    const expectedAction = {
      type: actions.SET_PIG_DATA,
      payload: pigData
    }
    expect(actions.setPigData(pigData)).toEqual(expectedAction)
  })
})
