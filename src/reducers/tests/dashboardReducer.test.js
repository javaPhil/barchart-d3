import * as actions from '../../actions/dashboardActions'
import constants from '../../helpers/constants'
import dashboardReducer from '../dashboardReducer'

describe('UI reducer', () => {
  it('should return the initial state', () => {
    expect(dashboardReducer(undefined, {})).toEqual(
      {
        loading: true,
        error: false,
        data: {},
        urlParams: {
          paused: true,
          year: '2000'
        }
      }
    )
  })

  it('should handle SET_URL_PARAM', () => {
    expect(
      dashboardReducer([], {
        type: actions.SET_URL_PARAM,
        payload: {
          name: constants.URL_PARAM_PAUSED,
          value: true
        }
      })
    ).toEqual(
      {
        'urlParams': { 'paused': true }
      }
    )
  })

  it('should handle SET_PIG_DATA', () => {
    expect(
      dashboardReducer([], {
        type: actions.SET_PIG_DATA,
        payload: { 'ZOMG PIGS': [
          { id: 1,
            name: 'Oinkers'
          },
          {
            id: 2,
            name: 'Frankfurter'
          }
        ] }
      })
    ).toEqual(
      {
        'data': {
          'ZOMG PIGS': [
            { 'id': 1, 'name': 'Oinkers' },
            { 'id': 2, 'name': 'Frankfurter' }
          ]
        }
      }
    )
  })
})
