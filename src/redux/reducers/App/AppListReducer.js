import {
  DELETE_APP_FAILED,
  DELETE_APP_INITIATED,
  DELETE_APP_SUCCESS,
  GET_APP_LIST_FAILED,
  GET_APP_LIST_INITIATED,
  GET_APP_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_APP_STATES,
  SELECT_CHANGE
} from '../../actions/ActionTypes/App'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}
export const appListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APP_LIST_INITIATED:
      return {
        ...state,
        appListInProcess: true
      }

    case GET_APP_LIST_SUCCESS:
      return {
        ...state,
        appListInProcess: false,
        appListData: action.payload,
        totalRecords: action.payload.appsCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case GET_APP_LIST_FAILED:
      return {
        ...state,
        appListInProcess: false,
        appListData: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, appListInProcess: true, page: action.payload }
    }

    case DELETE_APP_INITIATED: {
      return { ...state, deleteInProcess: true, isDeleted: false }
    }
    case DELETE_APP_SUCCESS: {
      return { ...state, deleteInProcess: false, isDeleted: true }
    }

    case DELETE_APP_FAILED:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false
      }

    case RESET_APP_STATES:
      return initialState

    default:
      return state
  }
}
