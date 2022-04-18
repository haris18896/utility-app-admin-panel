import {
  FETCH_ADMIN_FAILED,
  FETCH_ADMIN_INITIATED,
  FETCH_ADMIN_SUCCESS,
  RESET_ADMIN_UPDATE_STATE,
  UPDATE_ADMIN_FAILED,
  UPDATE_ADMIN_INITIATED,
  UPDATE_ADMIN_SUCCESS
} from '../../actions/ActionTypes/admin'

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_INITIATED:
      return {
        ...state,
        fetchAdminInProcess: true
      }

    case FETCH_ADMIN_SUCCESS:
      return {
        ...state,
        fetchAdminInProcess: false,
        fetchAdminById: action.payload,
        error: null
      }

    case FETCH_ADMIN_FAILED:
      return {
        ...state,
        fetchAdminInProcess: false,
        fetchAdminById: null,
        error: action.payload
      }

    case UPDATE_ADMIN_INITIATED:
      return {
        ...state,
        updateAdminInProcess: true
      }

    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        updateAdminInProcess: false,
        success: true,
        updateAdmin: action.payload,
        error: null
      }

    case UPDATE_ADMIN_FAILED:
      return {
        ...state,
        updateAdminInProcess: false,
        success: false,
        updateAdmin: null,
        error: action.payload
      }

    case RESET_ADMIN_UPDATE_STATE:
      return {
        ...state,
        updateAdminInProcess: false,
        success: false,
        updateAdmin: null,
        error: null
      }

    default:
      return state
  }
}
