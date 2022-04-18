import {
  INITIATE_REGISTRATION,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESET_REGISTRATION_STATE
} from '../../actions/ActionTypes/admin/index.js'

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIATE_REGISTRATION:
      return { ...state, inProcess: true }

    case REGISTRATION_FAILED:
      return { ...state, inProcess: false, error: action.payload }

    case REGISTRATION_SUCCESS:
      return { ...state, inProcess: false, success: action.payload.success, msg: action.payload.msg, error: null }

    case RESET_REGISTRATION_STATE:
      return {}

    default:
      return state
  }
}
