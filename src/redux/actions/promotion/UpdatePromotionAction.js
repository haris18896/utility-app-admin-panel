import useJwt from '@src/auth/jwt/useJwt'
import {
  RESET_PROMOTION_STATES,
  UPDATE_PROMOTION_FAILED,
  UPDATE_PROMOTION_INITIATED,
  UPDATE_PROMOTION_SUCCESS
} from '../ActionTypes/promotion'

export const resetUpdateStates = () => ({ type: RESET_PROMOTION_STATES })
export const updatePromotionInitiated = () => ({ type: UPDATE_PROMOTION_INITIATED })
export const updatePromotionSucceeded = data => ({ type: UPDATE_PROMOTION_SUCCESS, payload: data })
export const updatePromotionFailed = error => ({ type: UPDATE_PROMOTION_FAILED, payload: error })

export const handleUpdatePromotion = (_id, data) => {
  return async dispatch => {
    try {
      dispatch(updatePromotionInitiated())
      const response = await useJwt.updatePromotion(_id, data)
      if (response) {
        dispatch(updatePromotionSucceeded(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updatePromotionFailed(err.response.data))
      }
    }
  }
}
