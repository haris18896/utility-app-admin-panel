import {
  FETCH_APP_FAILED,
  FETCH_APP_INITIATED,
  FETCH_APP_SUCCESS,
  RESET_APP_STATES,
  UPDATE_APP_FAILED,
  UPDATE_APP_INITIATED,
  UPDATE_APP_SUCCESS
} from '../../actions/ActionTypes/App'

export const AppUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_APP_INITIATED:
      return { ...state, inProcess: true }
    case FETCH_APP_SUCCESS:
      return { ...state, inProcess: false, appDate: action.payload, error: null }

    case FETCH_APP_FAILED:
      return { ...state, inProcess: false, error: action.payload, appDate: null }

    case UPDATE_APP_INITIATED:
      return { ...state, inProcess: true }

    case UPDATE_APP_SUCCESS:
      return { ...state, inProcess: false, success: action.payload.success, updateApp: action.payload.app, error: null }

    case UPDATE_APP_FAILED:
      return { ...state, inProcess: false, success: false, updateApp: null, error: action.payload }

    case RESET_APP_STATES:
      return {}

    default:
      return state
  }
}
