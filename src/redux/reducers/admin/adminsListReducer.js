import {
  DELETE_ADMIN_FAILED,
  DELETE_ADMIN_INITIATED,
  DELETE_ADMIN_SUCCESS,
  FETCH_ADMINS_FAILED,
  FETCH_ADMINS_INITIATED,
  FETCH_ADMINS_SUCCESS,
  PAGE_CHANGE,
  RESET_ADMINS_LIST,
  SELECT_CHANGE
} from '../../actions/ActionTypes/admin'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}

export const adminsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS_INITIATED:
      return {
        ...state,
        loading: true
      }

    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.adminsCount,
        error: null
      }

    case FETCH_ADMINS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        adminsListData: false
      }

    case SELECT_CHANGE:
      return {
        ...state,
        limit: action.payload,
        page: 1
      }

    case PAGE_CHANGE:
      return {
        ...state,
        loading: true,
        page: action.payload
      }

    case DELETE_ADMIN_INITIATED:
      return {
        ...state,
        deleteInProcess: true,
        isDeleted: false
      }

    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: true,
        error: null
      }

    case DELETE_ADMIN_FAILED:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false,
        error: action.payload
      }

    case RESET_ADMINS_LIST:
      return initialState

    default:
      return state
  }
}
