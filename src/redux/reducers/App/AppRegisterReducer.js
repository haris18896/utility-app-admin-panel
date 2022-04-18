import {
  REGISTER_APP_FAILED,
  REGISTER_APP_INITIATED,
  REGISTER_APP_SUCCESS,
  RESET_APP_STATES
} from '../../actions/ActionTypes/App'

export const AppRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_APP_INITIATED:
      return { ...state, inProcess: true }

    case REGISTER_APP_FAILED:
      return { ...state, inProcess: false, error: action.payload }

    case REGISTER_APP_SUCCESS:
      return { ...state, inProcess: false, success: action.payload.success, msg: action.payload.msg, error: null }

    case RESET_APP_STATES:
      return {}

    default:
      return state
  }
}

