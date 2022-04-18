import {
  ADD_PROMOTION_FAILED,
  ADD_PROMOTION_INITIATED,
  ADD_PROMOTION_SUCCESS,
  RESET_PROMOTION_STATES
} from '../../actions/ActionTypes/promotion'

export const AddPromotionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PROMOTION_INITIATED:
      return { ...state, inProcess: true }

    case ADD_PROMOTION_FAILED:
      return { ...state, success: false, inProcess: false, error: action.payload, addPromotionData: false, screenIds: false }

    case ADD_PROMOTION_SUCCESS:
      return {
        ...state,
        inProcess: false,
        success: true,
        addPromotionData: action.payload,
        screenIds: action.payload.screenIds,
        error: null
      }

    case RESET_PROMOTION_STATES:
      return {}

    default:
      return state
  }
}
