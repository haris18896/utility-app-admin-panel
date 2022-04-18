import {
  DELETE_PROMOTION_FAILED,
  DELETE_PROMOTION_INITIATED,
  DELETE_PROMOTION_SUCCESS,
  GET_PROMOTION_LIST_FAILED,
  GET_PROMOTION_LIST_INITIATED,
  GET_PROMOTION_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_PROMOTION_STATES,
  SELECT_CHANGE
} from '../../actions/ActionTypes/promotion'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}

export const promotionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROMOTION_LIST_INITIATED:
      return { ...state, promotionListInProcess: true }

    case GET_PROMOTION_LIST_SUCCESS:
      return {
        ...state,
        promotionListInProcess: false,
        promotionListData: action.payload,
        totalRecords: action.payload.promotionsCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case GET_PROMOTION_LIST_FAILED:
      return {
        ...state,
        promotionListInProcess: false,
        promotionListData: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case DELETE_PROMOTION_INITIATED:
      return {
        ...state,
        deleteInProcess: true,
        isDeleted: false
      }

    case DELETE_PROMOTION_SUCCESS:
      return { ...state, deleteInProcess: false, isDeleted: true }

    case DELETE_PROMOTION_FAILED:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, promotionListInProcess: true, page: action.payload }
    }

    case RESET_PROMOTION_STATES:
      return initialState

    default:
      return state
  }
}
