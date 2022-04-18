import {
  RESET_PROMOTION_STATES,
  UPDATE_PROMOTION_FAILED,
  UPDATE_PROMOTION_INITIATED,
  UPDATE_PROMOTION_SUCCESS
} from '../../actions/ActionTypes/promotion'

export const promotionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROMOTION_INITIATED:
      return { ...state, inProcess: true }

    case UPDATE_PROMOTION_SUCCESS:
      return { ...state, inProcess: false, updatePromotion: action.payload, error: null }

    case UPDATE_PROMOTION_FAILED:
      return { ...state, inProcess: false, updatePromotion: null, error: action.payload }

    case RESET_PROMOTION_STATES:
      return {}

    default:
      return state
  }
}
